import LoadingOverlay from 'react-loading-overlay';
import { Alert, Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row, Spinner,Container } from 'reactstrap';
import containerService from '../../services/ContainerService'
import { useEffect, useRef, useState } from 'react';
import { emptyContainersColumns, othersFullTransshipmentColumns, hlcFullDirectColumns, hlcFullTransshipmentColumns, months, years, getTotalOfSumArray, shippingLineWithFreePool } from '../../utils/fixtures';
import { Redirect } from 'react-router';
import './StorageGeneratorView.css'
import TableContent from '../../components/tableContent/TableContent';
import WeclomeComponent from '../../components/welcomeComponent/WelcomeComponent';




const StorageGeneratorView = props => {

    const [active, setActive] = useState(false)
    const [error, setError] = useState(false)
    const [containersExist, setContainersExist] = useState()
    const [isSendingRequest, setIsSendingRequest] = useState(true)
    const [isSendingSecondRequest, setIsSendingSecondRequest] = useState(true)
    const [shippingLine, setShippingLine] = useState('Select')
    const [shippingLines, setShippingLines] = useState([])
    const [transshipmentContainers, setTransshipmentContainers] = useState([])
    const [fullTransshipmentContainers, setFullTransshipmentContainers] = useState([])
    const [fullReeferTransshipmentContainers, setFullReeferTransshipmentContainers] = useState([])
    const [fullDirectContainers, setFullDirectContainers] = useState([])
    const [emptyDirectContainers, setEmptyDirectContainers] = useState([])
    const [fullReeferDirectContainers, setFullReeferDirectContainers] = useState([])
    const [emptyContainers, setEmptyContainers] = useState([])
    const month = localStorage.getItem("month")
    const year = localStorage.getItem("year")

    const getData = (sl, m, y) => {
        setIsSendingSecondRequest(true)
        containerService.getContainerDetails(sl, m, y)
            .then(data => {
                setTransshipmentContainers(data.filter(container => container.invoiceCategory === 'Transshipment'))
                setFullTransshipmentContainers(data.filter(container => container.fullOrEmpty === 'Full' && container.invoiceCategory === 'Transshipment' && !container.reef))
                setFullReeferTransshipmentContainers(data.filter(container => container.fullOrEmpty === 'Full' && container.invoiceCategory === 'Transshipment' && container.reef))

                setFullReeferDirectContainers(data.filter(container => container.fullOrEmpty === 'Full' && container.invoiceCategory !== 'Transshipment' && container.reef))
                setFullDirectContainers(data.filter(container => container.fullOrEmpty === 'Full' && container.invoiceCategory !== 'Transshipment' && !container.reef))
                if (!shippingLineWithFreePool(sl)) {
                    setEmptyDirectContainers(data.filter(container => container.invoiceCategory !== 'Transshipment' && container.fullOrEmpty === 'Empty'))
                }
                if (shippingLineWithFreePool(sl)) {
                    containerService.getEmptyContainerDetails(sl, m, y)
                        .then(data => {
                            setEmptyContainers(data)
                            setIsSendingSecondRequest(false)
                        })
                }
                setIsSendingSecondRequest(false)
            })
    }

    const handleShippingLineChange = event => {
        console.log(event.target.value)
        if(event.target.value!="select"){
          getData(event.target.value, month, year)

          setShippingLine(event.target.value)  
        }
        
    }


    const handleClick = () => {
        setActive(true)
        containerService.generateExcelFile(shippingLine, month, year)
            .then(() => setActive(false))
            .catch(() => setError(true))
    }
    const getTransshipmentColumns = shippingLine => {
        return shippingLine === 'HLC' ? hlcFullTransshipmentColumns() : othersFullTransshipmentColumns()

    }

    const usePrevious = value => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const prevProps = usePrevious(props);

    useEffect(() => {
        if (prevProps !== props) {
            containerService.loadShippingLineNames()
                .then(shippingLines => setShippingLines(shippingLines))
        }

    })

    useEffect(() => {
        if (prevProps !== props) {
            containerService.containersExist()
                .then(response => setContainersExist(response))
                .catch(error => console.log(error))
                .then(() => setIsSendingRequest(false))
        }
    })

    useEffect(() => {
        if (prevProps !== props) {
            if(shippingLine!=="select")
            getData(shippingLine, month, year)
        }
    })


    if (isSendingRequest) return (<p>Loading ...</p>)
    return containersExist ?
    <>
     <Container className="content" fluid="true"> 
        <WeclomeComponent title="Welcome to Tanger Alliance container storage calculator" />
        <Row>
            <Col lg={3} md={2}></Col>
            <Col lg={6} md={8}>
                <LoadingOverlay
                    active={active}
                    spinner
                    text='Please wait...'
                >
                    {error && <Alert color="danger">An error occured</Alert>}
                    <Card>
                        <CardHeader tag="h5">Please choose your storage seetings</CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs={10} sm={6} md={4}>
                                    <FormGroup>
                                        <Label>Shipping Line</Label>
                                        <Input type="select" onChange={handleShippingLineChange}>
                                        <option value='select'>Select</option>
                                            {shippingLines.map((shippingLine =>
                                                <option value={shippingLine}>{shippingLine}</option>))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col xs={10} sm={6} md={4}>
                                    <FormGroup>
                                        <Label>Month</Label>
                                        <Input type="select" value={month} disabled>
                                            {months.map((month, index) =>
                                                <option value={index + 1}>{month}</option>)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col xs={10} sm={6} md={4}>
                                    <FormGroup>
                                        <Label>Year</Label>
                                        <Input type="select" value={year} disabled>
                                            {years().map(year =>
                                                <option value={year}>{year}</option>)}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div id="wrapper">
                                <Button id="load-button" color="primary" onClick={handleClick} >Generate Excel File</Button>
                            </div>
                        </CardBody>
                    </Card>
                </LoadingOverlay>
            </Col>
            <Col lg={3} md={2}></Col>
        </Row>
        {isSendingSecondRequest ? <div className='spinner'>
            <Spinner style={{ width: '7.5rem', height: '7.5rem' }} />
        </div> :
            <>
                {shippingLineWithFreePool(shippingLine) ?
                    <>
                        <TableContent
                            columns={getTransshipmentColumns(shippingLine)}
                            data={fullTransshipmentContainers}
                            label={'Full Transshipment'}
                            function={getTotalOfSumArray(fullTransshipmentContainers, 'totalStorageOfMonth')} />

                        <TableContent
                            columns={getTransshipmentColumns(shippingLine)}
                            data={fullReeferTransshipmentContainers}
                            label={'Full Reefer Transshipment'}
                            function={getTotalOfSumArray(fullReeferTransshipmentContainers, 'totalStorageOfMonth')} />
                    </>
                    :

                    <TableContent
                        columns={getTransshipmentColumns(shippingLine)}
                        data={transshipmentContainers}
                        label={'Transshipment'}
                        function={getTotalOfSumArray(transshipmentContainers, 'totalStorageOfMonth')} />

                }
                <TableContent
                    columns={hlcFullDirectColumns()}
                    data={fullDirectContainers}
                    label={'Full Direct'}
                    function={getTotalOfSumArray(fullDirectContainers, 'totalStorageOfMonth')} />
                {!shippingLineWithFreePool(shippingLine) &&
                    <TableContent
                        columns={hlcFullDirectColumns()}
                        data={emptyDirectContainers}
                        label={'Empty Direct'}
                        function={getTotalOfSumArray(emptyDirectContainers, 'totalStorageOfMonth')} />
                }

                <TableContent
                    columns={hlcFullDirectColumns()}
                    data={fullReeferDirectContainers}
                    label={'Full Reefer Direct'}
                    function={getTotalOfSumArray(fullReeferDirectContainers, 'totalStorageOfMonth')} />
                {shippingLineWithFreePool(shippingLine) &&
                    <TableContent
                    columns={emptyContainersColumns()}
                    data={emptyContainers}
                    label={'Empty Containers'}
                    function={getTotalOfSumArray(emptyContainers, 'price')} />
                    }
            </>
        }
    </Container>  </> : <Redirect to='/home/home' />
   
}

export default StorageGeneratorView
import { Col, Container, Row, Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import WelcomeComponent from '../../components/welcomeComponent/WelcomeComponent'
import ps from '../../images/ps.jpg'
import cs from '../../images/cs.jpg'



const WeclomeView = () => {
    return (<>
        <Container className="content" fluid='true'>
        <WelcomeComponent title="Welcome to Tanger Alliance container storage and particular services calculator" />
            <Row style={{marginTop:'3%'}}>
                <Col  lg ={1} md={1}></Col>
                <Col lg={4} md={4}>
                    <Link to="/home/home">
                        <Card>
                            <CardImg top width="100%" height="300px" src={cs} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">Containers Storage </CardTitle>
                                <CardText>Calculation of containers storage</CardText>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col lg={2} md={2}></Col>
                <Col lg={4} md={4}>
                    <Link to="/home/shome">
                        <Card>
                            <CardImg top width="100%" height="300px" src={ps} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">Containers particular services</CardTitle>
                                <CardText>Calculation of containers particular services</CardText>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
                <Col md={1}></Col>
            </Row>

        </Container>
    </>)
}

export default WeclomeView
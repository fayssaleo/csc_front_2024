import {Col,Row} from 'reactstrap';
import TableContainer from '../../components/table/TableContainer'

const TableContent = props => {
    return(
        <Row className="table-wraper">
        <Col lg={1} md={1} ></Col>
        <Col lg={10} md={10}>
            <h2> {props.label} : {props.function}</h2>
            <TableContainer columns={props.columns} data={props.data} />
        </Col>
        <Col lg={1} md={1}></Col>
    </Row>
    )
}

export default TableContent
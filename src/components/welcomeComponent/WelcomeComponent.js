import { Row } from "reactstrap";
import logo from '../../images/logo.png'
import './WelcomeComponent.css'

const WeclomeComponent = ({ title }) => {
    return (
        <>
            <Row className="inline">
                <img src={logo} alt="test" width="30%" />
            </Row>
            <Row className="inline logo">
                <h2 id="welcome-title">{title}</h2>
            </Row>
        </>
    )
}

export default WeclomeComponent;
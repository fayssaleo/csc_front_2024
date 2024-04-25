import { useEffect, useState, useRef } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import "./StorageHomeView.css";
import LoadingOverlay from "react-loading-overlay";
import containerService from "../../services/ContainerService";
import AlertModal from "../../components/alertModal/AlertModal";
import MessageModal from "../../components/messageModal/MessageModal";
import { Link } from "react-router-dom";
import { months, years } from "../../utils/fixtures";
import WeclomeComponent from "../../components/welcomeComponent/WelcomeComponent";

function StorageHomeView(props) {
  const [active, setActive] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAlertSpinner, setShowAlertSpinner] = useState(false);
  const [error, setError] = useState(false);
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2020");
  const [transshipment, setTransshipment] = useState(true);
  const [exportContainer, setExportContainer] = useState(true);
  const [importContainer, setImportContainer] = useState(true);
  const [depotContainer, setDepotContainer] = useState(true);
  const [fullContainer, setFullContainer] = useState(true);
  const [emptyContainer, setEmptyContainer] = useState(true);
  const [cancelDeleting, setCancelDeleting] = useState(false);

  const fileInput = useRef();

  const handleAgree = () => {
    setShowAlertSpinner(true);
    containerService.deleteContainers().then(() => {
      setShowAlertModal(false);
      setShowAlertSpinner(false);
      setShowMessageModal(true);
    });
  };

  const handleClick = () => {
    setCancelDeleting(true);
    setActive(true);
    containerService
      .loadContainersFromDb(
        month,
        year,
        transshipment,
        exportContainer,
        importContainer,
        depotContainer,
        fullContainer,
        emptyContainer
      )
      .then(() => {
        setActive(false);
        localStorage.setItem("month", month);
        localStorage.setItem("year", year);
        props.history.push("/home/generator");
      })
      .catch(() => {
        setActive(false);
        setError(true);
      });
  };
  const selectFile = () => {
    fileInput.current.click();
  };
  const handleClick2 = (file) => {
    setCancelDeleting(true);
    console.log(file);
    setActive(true);
    containerService
      .loadContainers(
        file.target,
        transshipment,
        exportContainer,
        importContainer,
        depotContainer,
        fullContainer,
        emptyContainer
      )
      .then(() => {
        setActive(false);
        localStorage.setItem("month", month);
        localStorage.setItem("year", year);
        props.history.push("/home/generator");
      })
      .catch(() => {
        setActive(false);
        setError(true);
      });
  };
  const handleEmptyClick = (emptyValue) => {
    if (fullContainer) {
      return emptyValue;
    } else {
      if (emptyValue) {
        return emptyValue;
      } else {
        setFullContainer(true);
        return true;
      }
    }
  };
  const handleFullClick = (fullValue) => {
    if (emptyContainer) {
      return fullValue;
    } else {
      if (fullValue) {
        return fullValue;
      } else {
        setEmptyContainer(true);
        return true;
      }
    }
  };
  useEffect(() => {
    containerService
      .containersExist()
      .then((response) => setShowAlertModal(response));
  });

  return (
    <>
      <Container className="content" fluid="true">
        <WeclomeComponent title="Welcome to Tanger Alliance storage calculator" />
        <Row>
          <Col md={3} sm={2} xs={1}></Col>
          <Col md={6} sm={8} xs={10}>
            <LoadingOverlay active={active} spinner text="Please wait...">
              {error && <Alert color="danger">An error occured</Alert>}
              <Card>
                <CardHeader tag="h5">Choose the month you need</CardHeader>
                <CardBody>
                  <Row>
                    <Col xs={10} sm={6} md={6}>
                      <FormGroup>
                        <Label>Month</Label>
                        <Input
                          type="select"
                          onChange={(event) => setMonth(event.target.value)}
                        >
                          {months.map((month, index) => (
                            <option value={index + 1}>{month}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col xs={10} sm={6} md={6}>
                      <FormGroup>
                        <Label>Year</Label>
                        <Input
                          type="select"
                          onChange={(event) => setYear(event.target.value)}
                        >
                          {years().map((year) => (
                            <option value={year}>{year}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader tag="h5">Choose the invoice categories</CardHeader>
                <CardBody>
                  <Row>
                    <Col className="mb-3" cols={6}>
                      <span
                        className={
                          fullContainer
                            ? "activeButton2 HoverClass"
                            : "disableButton2 HoverClass"
                        }
                        onClick={(e) =>
                          setFullContainer(handleFullClick(!fullContainer))
                        }
                      >
                        Full
                      </span>
                    </Col>
                    <Col className="mb-3" cols={6}>
                      <span
                        className={
                          emptyContainer
                            ? "activeButton2 HoverClass"
                            : "disableButton2 HoverClass"
                        }
                        onClick={(e) =>
                          setEmptyContainer(handleEmptyClick(!emptyContainer))
                        }
                      >
                        Empty
                      </span>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader tag="h5">Choose the invoice categories</CardHeader>
                <CardBody>
                  <Row>
                    <Col className="mb-3" cols={3}>
                      <span
                        className={
                          transshipment
                            ? "activeButton HoverClass"
                            : "disableButton HoverClass"
                        }
                        onClick={(e) => setTransshipment(!transshipment)}
                      >
                        Transshipment
                      </span>
                    </Col>
                    <Col className="mb-3" cols={3}>
                      <span
                        className={
                          exportContainer
                            ? "activeButton HoverClass"
                            : "disableButton HoverClass"
                        }
                        onClick={(e) => setExportContainer(!exportContainer)}
                      >
                        Export
                      </span>
                    </Col>
                    <Col className="mb-3" cols={3}>
                      <span
                        className={
                          importContainer
                            ? "activeButton HoverClass"
                            : "disableButton HoverClass"
                        }
                        onClick={(e) => setImportContainer(!importContainer)}
                      >
                        Import
                      </span>
                    </Col>
                    <Col className="mb-3" cols={3}>
                      <span
                        className={
                          depotContainer
                            ? "activeButton HoverClass"
                            : "disableButton HoverClass"
                        }
                        onClick={(e) => setDepotContainer(!depotContainer)}
                      >
                        Depot
                      </span>
                    </Col>
                  </Row>
                  <div id="wrapper">
                    <Button
                      id="load-button"
                      color="primary"
                      onClick={handleClick}
                    >
                      Load Containers
                    </Button>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={fileInput}
                      onChange={(event) => {
                        handleClick2(event);
                      }}
                    />
                    <Button
                      id="load-button2"
                      color="primary"
                      onClick={selectFile}
                    >
                      Import Containers
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </LoadingOverlay>
          </Col>
          <Col md={3} sm={2} xs={1}></Col>
        </Row>
      </Container>
      <AlertModal
        active={showAlertSpinner}
        show={showAlertModal}
        title="Warning !"
        message="Some containers data already exists in database. Do you want to clear it ?"
        handleAgree={handleAgree}
        handleDisagree={() => props.history.push("/home/generator")}
      />
      <MessageModal
        show={showMessageModal}
        body="Database cleared successfully"
        footer={
          <Link to="#" onClick={() => setShowMessageModal(false)}>
            Close
          </Link>
        }
      />
    </>
  );
}

export default StorageHomeView;

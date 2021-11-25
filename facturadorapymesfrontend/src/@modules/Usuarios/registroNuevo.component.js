import React from "react";
import clean from "../../@images/cleanForms.png";
import logo from "../../@images/logoProyecto.png";
import {
  Button,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Col,
} from "reactstrap";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
export default class RegistroNuevoUsuario extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="registros">
          <div
            id="formUsuario"
            className="row justify-content-center pt-6 mb-6 m-5"
          >
            <AvForm id="registros">
              <Row>
                <Col md="3">
                  <img src={logo} height="85" width="250" alt="Logo ITS" />
                </Col>
                <Col md="8"></Col>
                <Col md="1">
                  <Button
                    type="reset"
                    id="btnCleanForm"
                    style={{
                      marginTop:"25px",
                      outline: "0 none",
                      border: "0",
                      backgroundColor: "rgba(167, 167, 187, 0.534)",
                      marginRight: "20px",
                      borderRadius: "50%",
                    }}
                    onClick={() => {
                      this.cleanForm();
                    }}
                  >
                    <img height="30" width="22" src={clean} alt="clean"></img>
                  </Button>
                </Col>
              </Row>
              <Row>
                <h3
                  style={{
                    fontSize: "28px",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                    color: "#09065A",
                  }}
                >
                  Registro de nuevos usuarios
                </h3>
                <br />
              </Row>
            </AvForm>
          </div>
        </div>
      </div>
    );
  }
}

import React from "react";
import clean from "../../@images/cleanForms.png";
import logo from "../../@images/logoProyecto.png";
import registrarPyme from "../../@images/registrarPyme.png";
import "../../@styles/styles.components.css";
import service from "./registro.service";
import {
  Button,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  Label,
  Row, 
  Col,
} from "reactstrap";
import { AvForm,AvGroup,AvInput,AvFeedback } from "availity-reactstrap-validation";

export default class RegistroPyme extends React.Component {
  constructor() {
    super();
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {
      form: {
        razonSocial: "",
        slogan: "",
        nit: "",
        telefono: "",
        email: "",
        direccion: "",
        logo: null,
        ciudad: null,
      },
      ciudades: [],
    };
  }

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  validarEmail = () => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      !regEmail.test(this.state.form.correo) &&
      this.state.form.correo !== ""
    ) {
      return false;
    }
  };

  handleFileInput = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.files[0],
      },
    });
  };

  componentDidMount = async () => {
    this.consultarCiudades();
  };

  consultarCiudades = async () => {
    let respuesta = null;
    respuesta = await service.consultarCiudades();
    this.setState({
      ciudades: respuesta.data,
    });
  };

  cleanForm = () => {
    this.setState()
  };

  handleInvalidSubmit(event, errors, values) {
    this.setState({ errors, values });
  }

  handleValidSubmit(event, values) {
    ////
  }

  render() {
    let ciudades;
    if (this.state.ciudades === null) {
      ciudades = [];
    } else {
      ciudades = this.state.ciudades;
    }
    let ciudadestags = ciudades.map((ciudad) => (
      <option key={ciudad.id} value={ciudad.id}>
        {ciudad.nombre}
      </option>
    ));

    return (
      <div className="container">
        <div className="pymeReg">
          <div className="col-md-12 formularioR">
            <div align="left" style={{ marginTop: "10px", marginLeft: "10px" }}>
              <img src={logo} height="85" width="260" alt="Logo ITS" />
            </div>
            <h2
              style={{
                fontSize: "36px",
                fontFamily: "Segoe UI",
                textAlign: "center",
                color: "#09065A",
              }}
            >
              ¡Registra tu pyme!
            </h2>
            <br />
            <div
              id="formPyme"
              className="row justify-content-center pt-8 mb-8 m-3"
            >
              <div className="col-12" align="right">
                <button
                  style={{
                    outline: "0 none",
                    border: "0",
                    backgroundColor: "rgba(221, 220, 220, 0.795)",
                    marginRight: "20px",
                  }}
                  onClick={() => {
                    this.cleanForm();
                  }}
                >
                  <img height="41" width="40" src={clean} alt="clean"></img>
                </button>
              </div>
              <AvForm
                id="crearPymes"
                onInvalidSubmit={this.handleInvalidSubmit}
                onValidSubmit={this.handleValidSubmit}
              >
                <Row>
                  <Col md="4">
                  <AvGroup> 
                    <Label className="label-registro" htmlFor="razonSocial">
                      Razón social
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📄</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="razonSocial"
                        name="razonSocial"
                        onChange={this.handleChange}
                        validate={{
                          required: {value: true},
                          pattern: {
                            value: '^[A-Za-z0-9 -/*+]+$',
                            errorMessage:
                              "No puedes digitar caracteres invalidos",
                          },
                          minLength: {value: 3},
                          maxLength: {value: 100},
                        }}
                      />
                      <AvFeedback>La razón social es requerida</AvFeedback>
                    </InputGroup>
                  </AvGroup>
                  </Col>
                  <Col md="5">
                  <AvGroup>
                    <Label className="label-registro">Slogan</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🛒</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="slogan"
                        name="slogan"
                        onChange={this.handleChange}
                        validate={{
                          required: {
                            value: true
                          },
                          pattern: {
                            value: '^[A-Za-z0-9 -/*+]+$'
                          },
                          minLength: {
                            value: 10
                          },
                          maxLength: {
                            value: 250
                          },
                        }}
                      />
                      <AvFeedback>El slogan es requerido</AvFeedback>
                    </InputGroup>
                  </AvGroup>
                  </Col>
                  <Col md="3">
                  <AvGroup>
                    <Label className="label-registro">Identificación</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🖋️</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="nit"
                        name="nit"
                        onChange={this.handleChange}
                        validate={{
                          required: {
                            value: true
                          },
                          pattern: {
                            value: '^[A-Za-z0-9-/*+]+$'
                          },
                          minLength: {
                            value: 9
                          },
                          maxLength: {
                            value: 15
                          },
                        }}
                      />
                      <AvFeedback>La identificación es requerida</AvFeedback>
                    </InputGroup>
                    </AvGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                  <AvGroup>
                    <Label className="label-registro" htmlFor="razonSocial">Teléfono</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📞</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        onChange={this.handleChange}
                        validate={{
                          required: {
                            value: true
                          },
                          pattern: {
                            value: '^[0-9]+$'
                          },
                          minLength: {
                            value: 7
                          },
                          maxLength: {
                            value: 10
                          },
                        }}
                      />
                      <AvFeedback>El teléfono es requerido</AvFeedback>
                    </InputGroup>
                  </AvGroup>
                  </Col>
                  <Col md="4">
                  <AvGroup>
                    <Label className="label-registro">E-mail</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📧</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="email"
                        className="form-control"
                        placeholder="ejemplo@dominio.com"
                        id="email"
                        name="email"
                        onChange={this.handleChange}
                        validate={{
                          required: {
                            value: true
                          },
                          pattern: {
                            value: '^[A-Za-z0-9-/*+_@.]+$'
                          },
                          minLength: {
                            value: 12
                          },
                          maxLength: {
                            value: 100
                          },
                        }}
                      />
                      <AvFeedback>El e-mail es requerido</AvFeedback>
                    </InputGroup>
                    </AvGroup>
                  </Col>
                  <Col md="4">
                  <AvGroup>
                    <Label className="label-registro">Dirección</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📍</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="direccion"
                        name="direccion"
                        onChange={this.handleChange}
                        validate={{
                          required: {
                            value: true
                          },
                          pattern: {
                            value: '^[A-Za-z0-9#. ]+$'
                          },
                          minLength: {
                            value: 10
                          },
                          maxLength: {
                            value: 80
                          },
                        }}
                      />
                      <AvFeedback>La dirección es requerida</AvFeedback>
                    </InputGroup>
                    </AvGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="5">
                  <AvGroup>
                    <Label className="label-registro" htmlFor="razonSocial">
                      Logo
                    </Label>
                    <AvInput
                      type="file"
                      className="form-control"
                      accept="image/*"
                      id="logo"
                      name="logo"
                      onChange={this.handleFileInput}
                      validate={{
                        required: {
                          value: true
                        }}}
                    />
                    <AvFeedback>El logo es requerido</AvFeedback>
                  </AvGroup>
                  </Col>
                  <Col md="4">
                  <AvGroup>
                    <Label className="label-registro" htmlFor="razonSocial">Ciudad</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🗺️</InputGroupText>
                      </InputGroupAddon>
                      <select
                        className="form-select"
                        id="ciudad"
                        name="ciudad"
                        onChange={this.handleChange}
                      >
                        <option selected="true" disabled="disabled">Selecciona una ciudad</option>
                        {ciudadestags}
                      </select>
                    </InputGroup>
                  </AvGroup>
                  </Col>
                </Row>
                <div
                  align="right"
                  style={{ marginTop: "50px", marginLeft: "10px" }}
                >
                  <Button
                    size="lg"
                    outline
                  >
                    ¡Registrar! &nbsp;
                    <img
                      height="40"
                      width="40"
                      src={registrarPyme}
                      alt="registrar"
                    ></img>
                  </Button>
                </div>
              </AvForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

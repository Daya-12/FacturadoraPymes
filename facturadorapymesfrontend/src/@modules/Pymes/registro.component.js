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
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";

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
    document.getElementById("crearPymes").reset();
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
              className="row justify-content-center pt-6 mb-6 m-2"
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
                <div className="form-group row">
                  <div className="form-group col-md-4">
                    <label className="label-registro" htmlFor="razonSocial">
                      Razón social
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📄</InputGroupText>
                      </InputGroupAddon>
                      <AvField
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="razonSocial"
                        name="razonSocial"
                        onChange={this.handleChange}
                        maxLength={100}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "La razón social es requerida",
                          },
                          pattern: {
                            value: '^[A-Za-z0-9 -/*+]+$',
                            errorMessage:
                              "No puedes digitar caracteres invalidos",
                          },
                          minLength: {
                            value: 3,
                            errorMessage: "Ingrese la razón social valida",
                          },
                          maxLength: {
                            value: 100,
                            errorMessage: "Ingrese la razón social valida",
                          },
                        }}
                      />
                    </InputGroup>
                  </div>

                  <div className="form-group col-md-5">
                    <label className="label-registro">Slogan</label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🛒</InputGroupText>
                      </InputGroupAddon>
                      <AvField
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="slogan"
                        name="slogan"
                        onChange={this.handleChange}
                        maxLength={250}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "El slogan es requerido",
                          },
                          pattern: {
                            value: '^[A-Za-z0-9 -/*+]+$',
                            errorMessage:
                              "No puedes digitar caracteres invalidos",
                          },
                          minLength: {
                            value: 10,
                            errorMessage: "Ingrese un slogan valido",
                          },
                          maxLength: {
                            value: 250,
                            errorMessage: "Ingrese un slogan valido",
                          },
                        }}
                      />
                    </InputGroup>
                  </div>

                  <div className="form-group col-md-3">
                    <label className="label-registro">Identificación</label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🖋️</InputGroupText>
                      </InputGroupAddon>
                      <AvField
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="nit"
                        name="nit"
                        onChange={this.handleChange}
                        maxLength={15}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "La identificación es requerida",
                          },
                          pattern: {
                            value: '^[A-Za-z0-9-/*+]+$',
                            errorMessage:
                              "Caracteres invalidos",
                          },
                          minLength: {
                            value: 9,
                            errorMessage: "Ingrese una identificación valida",
                          },
                          maxLength: {
                            value: 15,
                            errorMessage: "Ingrese una identificación valida",
                          },
                        }}
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="form-group col-md-4">
                    <label className="label-registro" htmlFor="razonSocial">
                      Teléfono
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📞</InputGroupText>
                      </InputGroupAddon>
                      <AvField
                        autoComplete="off"
                        type="number"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        onChange={this.handleChange}
                        maxLength={10}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "El teléfono es requerido",
                          },
                          pattern: {
                            value: '^[0-9]+$',
                            errorMessage:
                              "No puedes digitar caracteres invalidos",
                          },
                          minLength: {
                            value: 10,
                            errorMessage: "Ingrese un teléfono valido",
                          },
                          maxLength: {
                            value: 10,
                            errorMessage: "Ingrese un teléfono valido",
                          },
                        }}
                      />
                    </InputGroup>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="label-registro">E-mail</label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📧</InputGroupText>
                      </InputGroupAddon>
                      <AvField
                        autoComplete="off"
                        type="email"
                        className="form-control"
                        placeholder="ejemplo@dominio.com"
                        id="email"
                        name="email"
                        maxLength={12}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "El e-mail es requerido",
                          },
                          pattern: {
                            value: '^[A-Za-z0-9-/*+_@.]+$',
                            errorMessage:
                              "No puedes digitar caracteres invalidos",
                          },
                          minLength: {
                            value: 12,
                            errorMessage: "Ingrese un e-mail valido",
                          },
                          maxLength: {
                            value: 100,
                            errorMessage: "Ingrese un e-mail valido",
                          },
                        }}
                      />
                    </InputGroup>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="label-registro">Dirección</label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📍</InputGroupText>
                      </InputGroupAddon>
                      <AvField
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="direccion"
                        name="direccion"
                        maxLength={80}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "La dirección es requerida",
                          },
                          pattern: {
                            value: '^[A-Za-z0-9#. ]+$',
                            errorMessage:
                              "No puedes digitar caracteres invalidos",
                          },
                          minLength: {
                            value: 10,
                            errorMessage: "Ingrese una dirección valida",
                          },
                          maxLength: {
                            value: 80,
                            errorMessage: "Ingrese una dirección valida",
                          },
                        }}
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="form-group col-md-5">
                    <label className="label-registro" htmlFor="razonSocial">
                      Logo
                    </label>
                    <AvField
                      type="file"
                      className="form-control"
                      accept="image/*"
                      id="logo"
                      name="logo"
                      onChange={this.handleFileInput}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: "El logo es requerido",
                        }}}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="label-registro" htmlFor="razonSocial">
                      Ciudad
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🗺️</InputGroupText>
                      </InputGroupAddon>
                      <AvField
                        type="select"
                        className="form-select"
                        id="ciudad"
                        name="ciudad"
                        onChange={this.handleChange}
                        helpMessage="Selecciona una ciudad"
                      >
                        <option selected="true" disabled="disabled">Selecciona la ciudad</option>
                        {ciudadestags}
                      </AvField>
                    </InputGroup>
                  </div>
                </div>
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

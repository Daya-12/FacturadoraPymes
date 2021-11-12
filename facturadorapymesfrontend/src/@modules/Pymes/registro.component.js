import React from "react";
import clean from "../../@images/cleanForms.png";
import logo from "../../@images/logoProyecto.png";
import registrarPyme from "../../@images/registrarPyme.png";
import registrarPyme2 from "../../@images/registrarPyme2.png";
import "../../@styles/styles.components.css";
import service from "./registro.service";
import Swal from "sweetalert2";
import ConsultaRelacion from "../Categoria/consultaRelacion.component";
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

export default class RegistroPyme extends React.Component {
  constructor() {
    super();
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {
      categorias: null,
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
      button: false,
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

    this.validarCampos();
  };

  validarEmail = () => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(this.state.form.email) && this.state.form.email !== "") {
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
    this.validarCampos();
  };

  validarCampos = () => {
    if (
      this.state.form.razonSocial === "" ||
      this.state.form.slogan === "" ||
      this.state.form.nit === "" ||
      this.state.form.telefono === "" ||
      this.state.form.email === "" ||
      this.validarEmail() === false ||
      this.state.form.direccion === "" ||
      this.state.form.logo === undefined ||
      this.state.form.logo === null ||
      this.state.form.ciudad === null
    ) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  componentDidMount = async () => {
    this.consultarCiudades();
  };

  enlazarCategorias = async (categorias) => {
    if (categorias != null && this.state.categorias == null) {
      this.setState({
        categorias: categorias,
      });
      if (this.state.categorias != null) {
        document.getElementById("confirmarRegistro").style.display = "block";
      }
    }
  };

  consultarCiudades = async () => {
    let respuesta = null;
    respuesta = await service.consultarCiudades();
    this.setState({
      ciudades: respuesta.data,
    });
  };

  cleanForm = () => {
    this.setState({
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
    });
  };

  handleInvalidSubmit(event, errors, values) {
    this.setState({ errors, values });
  }

  handleValidSubmit(event, values) {}

  onBlurRazonSocial = async () => {
    if (this.state.form.razonSocial !== "") {
      let respuesta = null;
      respuesta = await service.validarRazonSocial(this.state.form.razonSocial);
      if (respuesta !== null) {
        if (respuesta.data === true) {
          Swal.fire({
            text: "Esta razón social ya se encuentra registrada",
            icon: "error",
            timer: "4000",
          });

          this.setState({
            form: {
              razonSocial: "",
            },
          });
        }
      }
    }
  };

  onBlurIdentificacion = async () => {
    if (this.state.form.nit !== "") {
      let respuesta = null;
      respuesta = await service.validarIdentificacion(this.state.form.nit);
      if (respuesta !== null) {
        if (respuesta.data === true) {
          Swal.fire({
            text: "Esta identificación ya se encuentra registrada",
            icon: "error",
            timer: "4000",
          });

          this.setState({
            form: {
              nit: "",
            },
          });
        }
      }
    }
  };

  activarEnlace = () => {
    Swal.fire({
      title: "Confirmar datos de la pyme",
      text: "¿Deseas confirmar los datos de la pyme a registrar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D4C90",
      cancelButtonColor: "#973232",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, proceder",
    }).then((result) => {
      if (result.value) {
        document.getElementById("razonSocial").readOnly = true;
        document.getElementById("slogan").readOnly = true;
        document.getElementById("nit").readOnly = true;
        document.getElementById("telefono").readOnly = true;
        document.getElementById("email").readOnly = true;
        document.getElementById("direccion").readOnly = true;
        document.getElementById("logo").disabled = true;
        document.getElementById("ciudad").disabled = true;
        document.getElementById("botonValidar").disabled = true;
        document.getElementById("btnCleanForm").disabled = true;
        document.getElementById("enlazarCategorias").style.display = "block";
      }
    });
  };

  registrarPyme = async () => {
    console.log("Hola llegué!");
    console.log(this.state.categorias);
    console.log(this.state.form.logo);
    let respuesta = null;
    const model = mapStateToModel(this.state.form, this.state.categorias);
    respuesta = await service.registrarPyme(this.state.form.logo);
    console.log(respuesta);

  };
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
          <div className="pymeReg2">
            <div align="left" style={{ marginTop: "15px", marginLeft: "10px" }}>
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
              <AvForm
                id="crearPymes"
                onInvalidSubmit={this.handleInvalidSubmit}
                onValidSubmit={this.handleValidSubmit}
              >
                <Row>
                  <Col md="11"></Col>
                  <Col md="1">
                    <Button
                      type="reset"
                      id="btnCleanForm"
                      style={{
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
                      <img height="37" width="30" src={clean} alt="clean"></img>
                    </Button>
                  </Col>
                </Row>
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
                          value={this.state.form.razonSocial || ""}
                          onChange={this.handleChange}
                          onBlur={this.onBlurRazonSocial}
                          validate={{
                            required: { value: true },
                            pattern: {
                              value: "^[A-Za-z0-9 -/*+]+$",
                              errorMessage:
                                "No puedes digitar caracteres invalidos",
                            },
                            minLength: { value: 3 },
                            maxLength: { value: 100 },
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
                          value={this.state.form.slogan}
                          onChange={this.handleChange}
                          validate={{
                            required: {
                              value: true,
                            },
                            pattern: {
                              value: "^[A-Za-z0-9 -/*+]+$",
                            },
                            minLength: {
                              value: 10,
                            },
                            maxLength: {
                              value: 250,
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
                          value={this.state.form.nit}
                          onChange={this.handleChange}
                          onBlur={this.onBlurIdentificacion || ""}
                          validate={{
                            required: {
                              value: true,
                            },
                            pattern: {
                              value: "^[A-Za-z0-9-/*+]+$",
                            },
                            minLength: {
                              value: 9,
                            },
                            maxLength: {
                              value: 15,
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
                      <Label className="label-registro" htmlFor="razonSocial">
                        Teléfono
                      </Label>
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
                          value={this.state.form.telefono}
                          onChange={this.handleChange}
                          validate={{
                            required: {
                              value: true,
                            },
                            pattern: {
                              value: "^[0-9]+$",
                            },
                            minLength: {
                              value: 7,
                            },
                            maxLength: {
                              value: 10,
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
                          value={this.state.form.email}
                          onChange={this.handleChange}
                          validate={{
                            required: {
                              value: true,
                            },
                            pattern: {
                              value: "^[A-Za-z0-9-/*+_@.]+$",
                            },
                            minLength: {
                              value: 12,
                            },
                            maxLength: {
                              value: 100,
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
                          value={this.state.form.direccion}
                          onChange={this.handleChange}
                          validate={{
                            required: {
                              value: true,
                            },
                            pattern: {
                              value: "^[A-Za-z0-9#. ]+$",
                            },
                            minLength: {
                              value: 10,
                            },
                            maxLength: {
                              value: 80,
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
                            value: true,
                          },
                        }}
                      />
                      <AvFeedback>El logo es requerido</AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col md="4">
                    <AvGroup>
                      <Label className="label-registro" htmlFor="razonSocial">
                        Ciudad
                      </Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>🗺️</InputGroupText>
                        </InputGroupAddon>
                        <select
                          defaultValue={"DEFAULT"}
                          className="form-select"
                          id="ciudad"
                          name="ciudad"
                          value={this.state.form.ciudad || null}
                          onChange={this.handleChange}
                        >
                          <option value="DEFAULT" disabled>
                            Selecciona una ciudad
                          </option>
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
                    id="botonValidar"
                    size="lg"
                    outline
                    color="primary"
                    //disabled={this.state.button === false}
                    onClick={() => this.activarEnlace()}
                  >
                    ¡Continuar! &nbsp;
                    <img
                      height="40"
                      width="40"
                      src={registrarPyme}
                      alt="registrar"
                    ></img>
                  </Button>
                </div>
                <section id="enlazarCategorias" style={{ display: "none" }}>
                  <ConsultaRelacion
                    enviarCategorias={this.enlazarCategorias}
                  ></ConsultaRelacion>
                </section>
                <section id="confirmarRegistro" style={{ display: "none" }}>
                  <Row>
                    <Col md="2"></Col>
                    <Col md="8" align="center">
                      <Button
                        outline
                        color="primary"
                        size="lg"
                        onClick={() => {
                          this.registrarPyme();
                        }}
                      >
                        ¡Registrar mi pyme!&nbsp;&nbsp;
                        <img
                          height="48"
                          width="45"
                          src={registrarPyme2}
                          alt="registrar"
                        ></img>
                      </Button>
                    </Col>
                    <Col md="2"></Col>
                  </Row>
                </section>
              </AvForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToModel = function (formObject, listCategorias) {
  return {
      id: 0,
      razonSocial:formObject.razonSocial,
      slogan:formObject.slogan,
      nit:formObject.nit,
      urlLogo:"",
      correoElectronico:formObject.email,
      direccion:formObject.direccion,
      ciudad: {
          id: formObject.ciudad
      },
      telefono: formObject.telefono,
      activo:true,
      categorias: listCategorias
  };
}
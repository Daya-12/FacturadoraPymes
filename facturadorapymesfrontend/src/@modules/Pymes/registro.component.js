import React from "react";
import logo from "../../@images/logoProyecto.png";
import registrarPyme from "../../@images/registrarPyme.png";
import registrarPyme2 from "../../@images/registrarPyme2.png";
import "../../@styles/styles.components.css";
import service from "./registro.service";
import Swal from "sweetalert2";
import ConsultaRelacion from "../Categoria/consultaRelacion.component";
import RegistroUsuario from "../Usuarios/registro.component";
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
      usuario: null,
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
      }
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
      (this.state.form.razonSocial !== undefined &&
        this.state.form.razonSocial.length < 3) ||
      (this.state.form.razonSocial !== undefined &&
        this.state.form.razonSocial.length > 30) ||
      this.state.form.slogan === "" ||
      (this.state.form.slogan !== undefined &&
        this.state.form.slogan.length < 10) ||
      (this.state.form.slogan !== undefined &&
        this.state.form.slogan.length > 150) ||
      this.state.form.nit === "" ||
      (this.state.form.nit !== undefined && this.state.form.nit.length < 9) ||
      (this.state.form.nit !== undefined && this.state.form.nit.length > 15) ||
      this.state.form.telefono === "" ||
      (this.state.form.telefono !== undefined &&
        this.state.form.telefono.length < 7) ||
      (this.state.form.telefono !== undefined &&
        this.state.form.telefono.length > 10) ||
      this.state.form.email === "" ||
      this.validarEmail() === false ||
      (this.state.form.email !== undefined &&
        this.state.form.email.length < 12) ||
      (this.state.form.email !== undefined &&
        this.state.form.email.length > 50) ||
      this.state.form.direccion === "" ||
      (this.state.form.direccion !== undefined &&
        this.state.form.direccion.length < 10) ||
      (this.state.form.direccion !== undefined &&
        this.state.form.direccion.length > 50) ||
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
        document.getElementById("registrarUsuario").style.display = "block";
      }
    }
  };

  registroUsuario = async (usuario) => {
    if (usuario != null && this.state.usuario == null) {
      this.setState({
        usuario: usuario,
      });
      if (this.state.usuario != null) {
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
              slogan: this.state.form.slogan,
              nit: this.state.form.nit,
              telefono: this.state.form.telefono,
              email: this.state.form.email,
              direccion: this.state.form.direccion,
              logo: this.state.form.logo,
              ciudad: this.state.form.ciudad,
            },
          });
          this.validarCampos();
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

  onBlurEmail = async () => {
    if (this.state.form.email !== "" && this.validarEmail() !== false) {
      let respuesta = null;
      respuesta = await service.validarEmail(this.state.form.email);
      if (respuesta !== null) {
        if (respuesta.data === true) {
          Swal.fire({
            text: "Este e-mail ya se encuentra registrado",
            icon: "error",
            timer: "4000",
          });

          this.setState({
            form: {
              razonSocial: this.state.form.razonSocial,
              slogan: this.state.form.slogan,
              nit: this.state.form.nit,
              telefono: this.state.form.telefono,
              email: "",
              direccion: this.state.form.direccion,
              logo: this.state.form.logo,
              ciudad: this.state.form.ciudad,
            },
          });
          this.validarCampos();
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
        document.getElementById("enlazarCategorias").style.display = "block";
      }
    });
  };

  registrarLogo = async () => {
    let respuesta = null;
    let formData = new FormData();
    formData.append("nombreEmpresa", this.state.form.razonSocial);
    formData.append("imagen", this.state.form.logo);
    respuesta = await service.registrarPymeLogo(formData);
    if (respuesta !== null && respuesta.data === true) {
      return respuesta.data;
    }
  };

  registrarPyme = async () => {
    let registrarImagen = await this.registrarLogo();
    if (registrarImagen === true) {
      let respuesta = null;
      const model = mapStateToModel(
        this.state.form,
        this.state.categorias,
        this.state.usuario
      );
      respuesta = await service.registrarPyme(model);
      if (respuesta !== null) {
        Swal.fire({
          text:
            "¡La empresa " +
            this.state.form.razonSocial +
            " ha sido registrada exitosamente con " +
            this.state.categorias.length +
            " categoria(s) seleccionada(s)!",
          icon: "success",
          timer: "6000",
        });
        document.getElementById("confirmarRegistro").style.display = "none";
        document.getElementById("registrarUsuario").style.display = "none";
        document.getElementById("enlazarCategorias").style.display = "none";
        this.props.history.push("/Login");
      } else {
        Swal.fire({
          text:
            "Uppss! La empresa " +
            this.state.form.razonSocial +
            " no puedo ser registrada",
          icon: "error",
          timer: "4000",
        });
      }
    }
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
          <div
            id="formPyme"
            className="mx-auto"
            style={{ width: "95%", marginTop: "6%" }}
          >
            <AvForm
              id="crearPymes"
              onInvalidSubmit={this.handleInvalidSubmit}
              onValidSubmit={this.handleValidSubmit}
            >
              <Row>
                <Col md="3">
                  <img src={logo} height="85" width="270" alt="Logo ITS" />
                </Col>
                <Col md="9"></Col>
              </Row>
              <Row>
                <h2
                  style={{
                    fontSize: "34px",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                    color: "#09065A",
                  }}
                >
                  ¡Registra tu pyme!
                </h2>
                <br />
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
                            value: "^[A-Za-z0-9 -/*+üáéíóú#ñ]+$",
                            errorMessage:
                              "No puedes digitar caracteres invalidos",
                          },
                          minLength: { value: 3 },
                          maxLength: { value: 30 },
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
                            value: "^[A-Za-z0-9 -/*+üáéíóú#ñ]+$",
                          },
                          minLength: {
                            value: 10,
                          },
                          maxLength: {
                            value: 150,
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
                        value={this.state.form.nit || ""}
                        onChange={this.handleChange}
                        onBlur={this.onBlurIdentificacion}
                        validate={{
                          required: {
                            value: true,
                          },
                          pattern: {
                            value: "^[A-Za-z0-9-/*+ ]+$",
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
                    <Label className="label-registro" htmlFor="telefono">
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
                        value={this.state.form.email || ""}
                        onChange={this.handleChange}
                        onBlur={this.onBlurEmail}
                        validate={{
                          required: {
                            value: true,
                          },
                          pattern: {
                            value: "^[A-Za-z0-9-/*+_@.ñ]+$",
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
                        <InputGroupText>📌</InputGroupText>
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
                            value: "^[A-Za-z0-9#.ªº ]+$",
                          },
                          minLength: {
                            value: 10,
                          },
                          maxLength: {
                            value: 50,
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
                    <Label className="label-registro" htmlFor="logo">
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
                    <Label className="label-registro" htmlFor="ciudad">
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
              <div align="right" style={{ marginTop: "1%", marginLeft: "3%" }}>
                <Button
                  id="botonValidar"
                  size="lg"
                  outline
                  color="primary"
                  disabled={this.state.button === false}
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
              <section id="registrarUsuario" style={{ display: "none" }}>
                <RegistroUsuario
                  registrarUsuario={this.registroUsuario}
                ></RegistroUsuario>
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
    );
  }
}

const mapStateToModel = function (formObject, listCategorias, usuario) {
  return {
    id: 0,
    razonSocial: formObject.razonSocial,
    slogan: formObject.slogan,
    nit: formObject.nit,
    urlLogo: "",
    correoElectronico: formObject.email,
    direccion: formObject.direccion,
    ciudad: {
      id: formObject.ciudad,
    },
    telefono: formObject.telefono,
    activo: true,
    categorias: listCategorias,
    usuario: {
      id: 0,
      nombre: usuario.nombre,
      correo: usuario.correo,
      pass: usuario.pass,
      telefono: usuario.telefono,
      nivel: 0,
      activo: true,
    },
  };
};

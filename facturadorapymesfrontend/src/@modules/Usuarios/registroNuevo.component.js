import React from "react";
import clean from "../../@images/cleanForms.png";
import logo from "../../@images/logoProyecto.png";
import service from "./registro.service";
import registrarUser from "../../@images/registrarUsuario.png";
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
import Swal from "sweetalert2";
export default class RegistroNuevoUsuario extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        nombre: "",
        correo: "",
        pass: "",
        telefono: "",
        nivel: null,
      },
      button: false,
      empresa: {
        id :"",
        razonSocial: ""
      }
    };
  }
  componentDidMount = async () => {
    this.consultarEmpresa();
  };

  consultarEmpresa = async () => {
    let informacionLocalStorage=JSON.parse(localStorage.getItem("user"));
    this.setState({
      empresa: {
        id: informacionLocalStorage.empresa.id,
        razonSocial: informacionLocalStorage.empresa.razonSocial
      },
    });
  };

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
    if (
      !regEmail.test(this.state.form.correo) &&
      this.state.form.correo !== ""
    ) {
      return false;
    }
  };

  validarCampos = () => {
    if (
      this.state.form.nombre === "" ||
      (this.state.form.nombre !== undefined &&
        this.state.form.nombre.length < 10) ||
      (this.state.form.nombre !== undefined &&
        this.state.form.nombre.length > 100) ||
      this.state.form.correo === "" ||
      this.validarEmail() === false ||
      (this.state.form.correo !== undefined &&
        this.state.form.correo.length < 12) ||
      (this.state.form.correo !== undefined &&
        this.state.form.correo.length > 50) ||
      this.state.form.pass === "" ||
      (this.state.form.pass !== undefined && this.state.form.pass.length < 8) ||
      (this.state.form.pass !== undefined &&
        this.state.form.pass.length > 30) ||
      this.state.form.telefono === "" ||
      (this.state.form.telefono !== undefined &&
        this.state.form.telefono.length < 7) ||
      (this.state.form.telefono !== undefined &&
        this.state.form.telefono.length > 10) ||
        this.state.form.nivel === null
    ) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  cleanForm = () => {
    this.setState({
      form: {
        nombre: "",
        correo: "",
        pass: "",
        telefono: "",
        nivel: null,
      },
    });
  };

  onBlurEmail = async () => {
    if (this.state.form.correo !== "") {
      let respuesta = null;
      respuesta = await service.validarEmail(this.state.form.correo);
      if (respuesta !== null) {
        if (respuesta.data === true) {
          Swal.fire({
            text: "Ya existe un usuario con el correo ingresado",
            icon: "error",
            timer: "4000",
          });

          this.setState({
            form: {
              correo: "",
            },
          });
        }
      }
    }
  };

  registrar = async () => {
      let nivelNombre= this.state.form.nivel;
      let nivel;
      this.state.form.nivel !== null && this.state.form.nivel === "Administrador" ? nivel=0 : nivel=1;
      this.setState({
        form: {
          nivel: nivel,
        },
      });

      if(this.state.form.nivel === 0 || this.state.form.nivel === 1){
      let respuesta = null;
      const model = mapStateToModel(this.state.form, this.state.empresa);
      respuesta = await service.registrar(model);
      if(respuesta !== null){
        Swal.fire({
          text: "¡La empresa " + this.state.form.nombre + " ha sido registrada exitosamente con permisos de usuario" + nivelNombre + "!",
          icon: "success",
          timer: "6000"
      })
      this.props.history.replace("/MenuAdministrador/" + this.state.empresa.id, {
        idEmpresa: this.state.empresa.id,
      })
      }else{
        Swal.fire({
          text: "Uppss! El usuario " + this.state.form.nombre + " no puedo ser registrado",
          icon: "error",
          timer: "4000"
      })
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="registros">
          <div
            id="formUsuario"
            className="row justify-content-center pt-6 mb-6 m-5 mt-5"
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
                      marginTop: "25px",
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
              <br/>
              <Row>
              <Col md="4">
                  <AvGroup>
                    <Label className="label-registro" htmlFor="razonSocial">
                      Empresa
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🏢</InputGroupText>
                      </InputGroupAddon>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="pass"
                        name="pass"
                        value={this.state.empresa.razonSocial || ""}
                        readOnly
                      />
                    </InputGroup>
                  </AvGroup>
                </Col>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registro">
                      Nombre(s) y apellido(s)
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>👥</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={this.state.form.nombre}
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
                            value: 100,
                          },
                        }}
                      />
                      <AvFeedback>El nombre es requerido</AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registro">Teléfono</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📱</InputGroupText>
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
                <br/>
                </Row>
                <Row>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registro">E-mail</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📥</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="email"
                        className="form-control"
                        id="correo"
                        name="correo"
                        value={this.state.form.correo}
                        onChange={this.handleChange}
                        onBlur={this.onBlurEmail}
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
                            value: 50,
                          },
                        }}
                      />
                      <AvFeedback>
                        El e-mail del usuario es requerido
                      </AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registro">Contraseña</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🔑</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="password"
                        className="form-control"
                        id="pass"
                        name="pass"
                        value={this.state.form.pass}
                        onChange={this.handleChange}
                        validate={{
                          required: {
                            value: true,
                          },
                          pattern: {
                            value: "^[A-Za-z0-9-/*+_@.?¿<>]+$",
                          },
                          minLength: {
                            value: 8,
                          },
                          maxLength: {
                            value: 30,
                          },
                        }}
                      />
                      <AvFeedback>La contraseña es requerida</AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registro" htmlFor="razonSocial">
                      Permisos
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>✔️</InputGroupText>
                      </InputGroupAddon>
                      <select
                        defaultValue={"DEFAULT"}
                        className="form-select"
                        id="nivel"
                        name="nivel"
                        value={this.state.form.nivel || null}
                        onChange={this.handleChange}
                      >
                        <option value="DEFAULT" disabled>
                          Selecciona el tipo de permisos
                        </option>
                        <option>Administrador</option>
                        <option>Básico</option>
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
                    disabled={this.state.button === false}
                    onClick={() => this.registrar()}
                  >
                    Registrar &nbsp;
                    <img
                      height="45"
                      width="45"
                      src={registrarUser}
                      alt="registrar"
                    ></img>
                  </Button>
                </div>
            </AvForm>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToModel = function (formObject, empresa) {
  return {
      id: 0,
      nombre:formObject.nombre,
      correo:formObject.correo,
      pass:formObject.pass,
      telefono: formObject.telefono,
      nivel: formObject,nivel,
      empresa: {
          id: empresa.id
      },
      activo:true
  };
}
import React from "react";
import "../../@styles/styles.components.css";
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
import service from "./registro.service";

export default class RegistroUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.registrarUsuario = props.registrarUsuario;
    this.state = {
      form: {
        nombre: "",
        correo: "",
        pass: "",
        telefono: ""
      },
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
      (this.state.form.nombre !== undefined && this.state.form.nombre.length < 10) ||
      (this.state.form.nombre !== undefined && this.state.form.nombre.length > 100) ||

      this.state.form.correo === "" ||
      this.validarEmail() === false ||
      (this.state.form.correo !== undefined && this.state.form.correo.length < 12) ||
      (this.state.form.correo !== undefined && this.state.form.correo.length > 50) ||

      this.state.form.pass === "" ||
      (this.state.form.pass !== undefined && this.state.form.pass.length < 8) ||
      (this.state.form.pass !== undefined && this.state.form.pass.length > 30) ||

      this.state.form.telefono === "" ||
      (this.state.form.telefono !== undefined && this.state.form.telefono.length < 7) ||
      (this.state.form.telefono !== undefined && this.state.form.telefono.length > 10)
    ) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  confirmarUsuario() {
    Swal.fire({
      title: "Confirmar usuario",
      text: "¿Realmente deseas confirmar los datos del usuario a registrar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D4C90",
      cancelButtonColor: "#973232",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, proceder",
    }).then((result) => {
      if (result.value) {
        document.getElementById("nombre").readOnly = true;
        document.getElementById("correo").readOnly = true;
        document.getElementById("pass").readOnly = true;
        document.getElementById("telefono").readOnly = true;
        document.getElementById("botonUsuario").disabled = true;
        this.usuario();
      }
    });
  }

  usuario() {
    this.registrarUsuario(this.state.form);
  }

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


  render() {
    return (
      <div>
          <br/>
        <h4>Registra el primer usuario administrador de tu pyme</h4>
        <br />
        <div id="formUser" className="row justify-content-center pt-8 mb-8 m-3">
          <AvForm id="crearUsers">
            <Row>
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
                  <Label className="label-registro">E-mail usuario</Label>
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
                    <AvFeedback>El e-mail del usuario es requerido</AvFeedback>
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
            </Row>
            <Row>
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
                <Col md="8"></Col>
            </Row>
          </AvForm>
          <div align="right">
                <Button id="botonUsuario" disabled={this.state.button === false} outline color="primary" size="sm" onClick={() => this.confirmarUsuario()}>¡Continuar!</Button>
        </div>
        </div>
      </div>
    );
  }
}

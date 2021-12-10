import React from "react";
import logo from "../../@images/logoProyecto.png";
import actualizar from "../../@images/actualizar.png";
import eliminar from "../../@images/eliminar.png";
import service from "./usuario.service";
import {
  Table,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter,
  Label,
  Row,
  Col,
} from "reactstrap";
import {
  AvForm,
  AvInput,
  AvFeedback,
  AvGroup,
} from "availity-reactstrap-validation";
import Swal from "sweetalert2";
export default class ActualizarEliminarUsuarios extends React.Component {
  constructor() {
    super();
    this.state = {
      usuarios: null,
      modalActualizar: false,
      button: false,
      form: {
        id: "",
        nombre: "",
        correo: "",
        pass: "",
        telefono: "",
        nivel: null,
        tipoModal: "",
      },
      button: false,
      empresa: {
        id: "",
        razonSocial: "",
      },
    };
  }

  componentDidMount = async () => {
    this.consultarEmpresa();
  };

  seleccionarUserActualizar = async (user) => {
    await this.setState({
      tipoModal: "actualizar",
      form: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        telefono: user.telefono,
        nivel: user.nivel,
      },
    });
  };

  seleccionarUserEliminar = async (user) => {
    await this.setState({
      form: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        telefono: user.telefono,
        nivel: user.nivel,
      },
    });
    this.confirmacionEliminar();
  };

  confirmacionEliminar = () => {
    Swal.fire({
      title: "Dar de baja a usuarios",
      text:
        "¿Estas seguro de dar de baja al usuario " +this.state.form.nombre +"?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D4C90",
      cancelButtonColor: "#973232",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, proceder",
    }).then((result) => {
      if (result.value) {
        this.deleteUser();
      }
    });
  };

  deleteUser = async () => {
    let respuesta = null;
    respuesta = await service.eliminar(this.state.form.id);
    if (respuesta) {
      Swal.fire({
        text: "El usuario ha sido eliminado con éxito",
        icon: "success",
        timer: "4000",
      });
      this.componentDidMount();
    }
    else{
      Swal.fire({
        text: "Uppss! El usuario " + this.state.form.nombre + " no pudo ser dado de baja",
        icon: "error",
        timer: "4000"
    })
    }
  };

  consultarEmpresa = async () => {
    let informacionLocalStorage = JSON.parse(localStorage.getItem("user"));
    await this.setState({
      empresa: {
        id: informacionLocalStorage.empresa.id,
        razonSocial: informacionLocalStorage.empresa.razonSocial,
      },
    });
    this.consultarUsuarios();
  };

  consultarUsuarios = async () => {
    let respuesta = null;
    let users = [];
    respuesta = await service.consultarUsuarios(this.state.empresa.id);
    if (respuesta !== null) {
      users = respuesta.data;
      let userActivo = JSON.parse(localStorage.getItem("user"));
      let indiceUser = users.findIndex(
        (userAct) => userAct.id === userActivo.id
      );
      users.splice(indiceUser, 1);
      this.setState({
        usuarios: users,
      });
    }
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
      this.state.form.correo === "" ||
      this.validarEmail() === false ||
      (this.state.form.correo !== undefined &&
        this.state.form.correo.length < 12) ||
      (this.state.form.correo !== undefined &&
        this.state.form.correo.length > 50) ||
      this.state.form.telefono === "" ||
      (this.state.form.telefono !== undefined &&
        this.state.form.telefono.length < 7) ||
      (this.state.form.telefono !== undefined &&
        this.state.form.telefono.length > 10)
    ) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  abrirModalEditar = () => {
    this.setState({ modalActualizar: !this.state.modalActualizar });
  };

  cerrarModalEditar = () => {
    this.setState({ modalActualizar: false });
  };

  ocultarModalEditar = () => {
    Swal.fire({
      className: "swal",
      title: "Actualizacion de usuario",
      text:
        "¿Deseas cancelar la actualización de datos para " +
        this.state.form.nombre +
        "?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D4C90",
      cancelButtonColor: "#973232",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, proceder",
    }).then((result) => {
      if (result.value) {
        this.setState({ modalActualizar: false });
      }
    });
  };

  onBlurEmail = async () => {
    if (this.state.form.correo !== "" && this.validarEmail() != false) {
      let respuesta = null;
      respuesta = await service.validarEmailDistinto(
        this.state.form.correo,
        this.state.form.id
      );
      if (respuesta !== null) {
        if (respuesta.data === true) {
          Swal.fire({
            text: "Ya existe un usuario con el correo ingresado",
            icon: "error",
            timer: "4000",
          });

          this.setState({
            form: {
              id: this.state.form.id,
              correo: "",
              telefono: this.state.form.telefono,
              nivel: this.state.form.nivel,
            },
          });
          this.validarCampos();
        }
      }
    }
  };

  update = async () => {
    let nivelUser;
    this.state.form.nivel !== null && this.state.form.nivel === "Administrador"
      ? (nivelUser = 0)
      : (nivelUser = 1);
    if (nivelUser === 0 || nivelUser === 1) {
      let respuesta = null;
      const model = mapStateToModel(
        this.state.form,
        this.state.empresa,
        nivelUser
      );
      respuesta = await service.editar(model);
      if (respuesta !== null) {
        this.cerrarModalEditar();
        this.componentDidMount();
        Swal.fire({
          text:
            "¡El usuario " +
            this.state.form.nombre +
            " ha sido actualizado exitosamente!",
          icon: "success",
          timer: "5000",
        });
      } else {
        Swal.fire({
          text:
            "Uppss! El usuario " +
            this.state.form.nombre +
            " no puedo ser actualizado",
          icon: "error",
          timer: "4000",
        });
      }
    }
  };

  confirmar = async () => {
    Swal.fire({
      className: "swal",
      title: "Actualizacion de usuario",
      text:
        "¿Deseas confirmar la actualización de datos para " +
        this.state.form.nombre +
        "?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D4C90",
      cancelButtonColor: "#973232",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, proceder",
    }).then((result) => {
      if (result.value) {
        this.update();
      }
    });
  };
  render() {
    let usuarios;
    if (this.state.usuarios === null) {
      usuarios = [];
    } else {
      usuarios = this.state.usuarios;
    }
    let userstags = usuarios.map((user) => (
      <tr key={user.id}>
        <td>{user.nombre}</td>
        <td>{user.correo}</td>
        <td>{user.telefono}</td>
        <td>{user.nivel}</td>
        <td>
          <button
            style={{
              outline: "0 none",
              border: "0",
              backgroundColor: "rgba(167, 167, 187, 0.534)",
              borderRadius: "50%",
            }}
            onClick={() => {
              this.seleccionarUserActualizar(user);
              this.abrirModalEditar();
            }}
          >
            <img height="33" width="32" src={actualizar} alt="actulizar"></img>
          </button>
          {"  "}
          <button
            style={{
              outline: "0 none",
              border: "0",
              backgroundColor: "rgba(167, 167, 187, 0.534)",
              borderRadius: "50%",
            }}
            onClick={() => {
              this.seleccionarUserEliminar(user);
            }}
          >
            <img height="33" width="32" src={eliminar} alt="eliminar"></img>
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="container">
        <div className="actualizaciones">
          <div
            id="cabecera"
            className="row justify-content-center pt-6 mb-6 m-0 mt-0"
          >
            <div>
              <img src={logo} height="85" width="240" alt="Logo" />
            </div>
            <div
              style={{
                color: "#03083E",
                fontSize: "25px",
                fontFamily: "Segoe UI",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              <label>
                Actualizar o dar de baja usuarios registrados para{" "}
                {this.state.empresa.razonSocial}
              </label>
            </div>
            <div
              style={{
                marginTop: "0.3%",
                color: "#000227",
                fontSize: "13px",
                fontFamily: "Segoe UI",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <label style={{ color: "red" }}>Ten en cuenta que:</label>
              <br />
              <label>
                • Solo puedes actualizar el correo electrónico,teléfono o
                permisos de los usuarios
              </label>
              <br />
              <label>
                • No puedes actualizar o eliminar tu propio usuario, por eso no
                te encuentras en la lista
              </label>
              <br />
              <label>
                • Los usuarios se encuentra ordenados por el nombre de manera
                ascendente
              </label>
            </div>
          </div>
          <br />

          <div className="row justify-content-center pt-6 mb-6 m-2 mt-1">
            <Table cellSpacing="10" className="tableRegistros" striped>
              <tr align="center" textalign="center">
                <th scope="row">Nombre</th>
                <th scope="row">Correo electrónico</th>
                <th scope="row">Teléfono</th>
                <th scope="row">Permisos</th>
                <th colSpan="2">Acciones</th>
              </tr>
              <tbody className="bodyTable" align="center" textalign="center">
                {userstags}
              </tbody>
            </Table>
          </div>

          <Modal isOpen={this.state.modalActualizar}>
            <ModalHeader style={{ display: "block" }} closeButton>
              <Button
                size="sm"
                color="danger"
                style={{ float: "right" }}
                onClick={() => this.ocultarModalEditar()}
              >
                x
              </Button>
              <img
                src={logo}
                height="55"
                width="135"
                style={{
                  marginLeft: "3%",
                  marginTop: "3%",
                }}
                alt="Logo"
              />
              <div id="titulo">
                <label>
                  Actualizar datos del usuario {this.state.form.nombre}
                </label>
              </div>
            </ModalHeader>

            <ModalBody>
              <AvForm id="editar">
                <Row>
                  <Col md="12">
                    <AvGroup>
                      <Label>Nombre: </Label>
                      <AvInput
                        class="form-control"
                        type="text"
                        name="nombre"
                        readOnly
                        value={this.state.form.nombre}
                      />
                    </AvGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="12">
                    <AvGroup>
                      <Label>Correo electrónico: </Label>
                      <AvInput
                        autocomplete="off"
                        class="form-control"
                        type="email"
                        name="correo"
                        onChange={this.handleChange}
                        onBlur={this.onBlurEmail}
                        value={this.state.form.correo || ""}
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
                      <AvFeedback>El e-mail es requerido</AvFeedback>
                    </AvGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="12">
                    <AvGroup>
                      <Label>Teléfono: </Label>
                      <AvInput
                        autocomplete="off"
                        class="form-control"
                        type="text"
                        name="telefono"
                        onChange={this.handleChange}
                        value={this.state.form.telefono}
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
                    </AvGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <AvGroup>
                      <Label>Permisos: </Label>
                      <select
                        name="nivel"
                        className="form-select"
                        onChange={this.handleChange}
                        value={this.state.form.nivel}
                      >
                        <option>Administrador</option>
                        <option>Básico</option>
                      </select>
                    </AvGroup>
                  </Col>
                </Row>
              </AvForm>
            </ModalBody>
            <ModalFooter>
              <div class="col text-center">
                <Button
                  outline
                  color="primary"
                  disabled={this.state.button === false}
                  onClick={() => this.confirmar()}
                >
                  ¡Actualizar!
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToModel = function (formObject, empresa, nivelUser) {
  return {
    id: formObject.id,
    nombre: formObject.nombre,
    correo: formObject.correo,
    pass: formObject.pass,
    telefono: formObject.telefono,
    nivel: nivelUser,
    empresa: {
      id: empresa.id,
    },
    activo: true,
  };
};

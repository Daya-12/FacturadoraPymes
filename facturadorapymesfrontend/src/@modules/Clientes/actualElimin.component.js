import React from "react";
import logo from "../../@images/logoProyecto.png";
import service from "./cliente.service";
import actualizar from "../../@images/actualizar.png";
import eliminar from "../../@images/eliminar.png";
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
export default class ActualizarEliminarClientes extends React.Component {
  constructor() {
    super();
    this.state = {
      clientes: [],
      documentos: [],
      ciudades: [],
      modalActualizar: false,
      button: false,
      form: {
        id: "",
        idTipoDocumento: "",
        tipoDocumento: null,
        numeroDocumento: "",
        nombre: "",
        direccion: "",
        codigoPostal: "",
        ciudad: null,
        telefono: "",
        tipoModal: "",
      },
      empresa: {
        id: "",
        razonSocial: "",
      },
    };
  }
  componentDidMount = async () => {
    this.consultarEmpresa();
  };

  consultarEmpresa = async () => {
    let informacionLocalStorage = JSON.parse(localStorage.getItem("user"));
    await this.setState({
      empresa: {
        id: informacionLocalStorage.empresa.id,
        razonSocial: informacionLocalStorage.empresa.razonSocial,
      },
    });
    this.consultarClientes();
  };

  consultarClientes = async () => {
    let respuesta = null;
    respuesta = await service.consultar(this.state.empresa.id);
    if (respuesta !== null) {
      this.setState({
        clientes: respuesta.data,
      });
      this.consultarCiudades();
    }
  };

  consultarCiudades = async () => {
    let respuesta = null;
    respuesta = await service.consultarCiudades();
    this.setState({
      ciudades: respuesta.data,
    });
  };

  abrirModalEditar = () => {
    this.setState({ modalActualizar: !this.state.modalActualizar });
  };

  cerrarModalEditar = () => {
    this.setState({ modalActualizar: false });
  };

  seleccionarClienteActualizar = async (cliente) => {
    if (this.state.ciudades !== []) {
      await this.setState({
        tipoModal: "actualizar",
        form: {
          id: cliente.id,
          idTipoDocumento: cliente.id_tdocumento,
          tipoDocumento: cliente.nombre_tdocumento,
          numeroDocumento: cliente.num_documento,
          nombre: cliente.nombre,
          direccion: cliente.direccion,
          codigoPostal: cliente.codPostal,
          ciudad: cliente.id_ciudad,
          telefono: cliente.telefono
        },
      });
    }
  };


  seleccionarClienteEliminar = async (cliente) => {
    await this.setState({
      form: {
        id: cliente.id,
        idTipoDocumento: cliente.id_tdocumento,
        tipoDocumento: cliente.nombre_tdocumento,
        numeroDocumento: cliente.num_documento,
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        codigoPostal: cliente.codPostal,
        ciudad: cliente.id_ciudad,
        telefono: cliente.telefono
      },
    });
    this.confirmacionEliminar();
  };

  confirmacionEliminar = () => {
    Swal.fire({
      title: "Dar de baja clientes",
      text:
        "¿Estas seguro de dar de baja al cliente " +
        this.state.form.nombre +
        "?\nUna vez eliminado el cliente, no puedes volver a realizar facturas con el mismo",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D4C90",
      cancelButtonColor: "#973232",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, proceder",
    }).then((result) => {
      if (result.value) {
        this.deleteCliente();
      }
    });
  };

  deleteCliente = async () => {
    let respuesta = null;
    respuesta = await service.eliminar(this.state.form.id);
    if (respuesta.data === 1) {
      Swal.fire({
        text: "El cliente ha sido dado de baja con éxito",
        icon: "success",
        timer: "4000",
      });
      this.componentDidMount();
    } else if (respuesta.data === 2) {
      Swal.fire({
        text: "Se realizó un borralo lógico para el cliente seleccionado debido a que existe información que depende de este registro",
        icon: "success",
        timer: "4000",
      });
      this.componentDidMount();
    } else if (respuesta === null) {
      Swal.fire({
        text:
          "Uppss! El cliente " +
          this.state.form.nombre +
          " no pudo ser dado de baja,¡Intentalo nuevamente!",
        icon: "error",
        timer: "4000",
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

  validarCampos = () => {
    if (
      this.state.form.direccion === "" ||
      (this.state.form.direccion !== undefined &&
        this.state.form.direccion.length < 10) ||
      (this.state.form.direccion !== undefined &&
        this.state.form.direccion.length > 50) ||
      this.state.form.ciudad === null ||
      this.state.form.codigoPostal === "" ||
      (this.state.form.codigoPostal !== undefined &&
        this.state.form.codigoPostal.length < 4) ||
      (this.state.form.codigoPostal !== undefined &&
        this.state.form.codigoPostal.length > 8) ||
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


  ocultarModalEditar = () => {
    Swal.fire({
      className: "swal",
      title: "Actualizacion de producto",
      text: "¿Deseas cancelar la actualización de datos para el cliente seleccionado?",
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

  confirmar = async () => {
    Swal.fire({
      className: "swal",
      title: "Actualizacion de cliente",
      text:
        "¿Deseas confirmar la actualización del cliente " +
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
        this.actualizar();
      }
    });
  };

  actualizar = async () => {
    let respuesta = null;
    const model = mapStateToModel(this.state.form, this.state.empresa);
    respuesta = await service.editar(model);
    if (respuesta !== null) {
      this.cerrarModalEditar();
      this.componentDidMount();
      Swal.fire({
        text:
          "¡El cliente " +
          this.state.form.nombre +
          " ha sido actualizado exitosamente!",
        icon: "success",
        timer: "5000",
      });
    } else {
      Swal.fire({
        text:
          "Uppss! El cliente " +
          this.state.form.nombre +
          " no puedo ser actualizado",
        icon: "error",
        timer: "4000",
      });
    }
  };



  render() {
    let clientes;
    if (this.state.clientes === null) {
      clientes = [];
    } else {
      clientes = this.state.clientes;
    }
    let clientestags = clientes.map((cliente) => (
      <tr key={cliente.id}>
        <td>{cliente.nombre}</td>
        <td>{cliente.nombre_tdocumento}</td>
        <td>{cliente.num_documento}</td>
        <td>{cliente.direccion}</td>
        <td>{cliente.codPostal}</td>
        <td>{cliente.nombre_ciudad}</td>
        <td>{cliente.telefono}</td>
        <td>
          <button
            style={{
              outline: "0 none",
              border: "0",
              backgroundColor: "rgba(167, 167, 187, 0.534)",
              borderRadius: "50%",
            }}
            onClick={() => {
              this.seleccionarClienteActualizar(cliente);
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
              this.seleccionarClienteEliminar(cliente);
            }}
          >
            <img height="33" width="32" src={eliminar} alt="eliminar"></img>
          </button>
        </td>
      </tr>
    ));

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
        <div className="clientesFondo">
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
                Actualizar o dar de baja clientes registrados para{" "}
                {this.state.empresa.razonSocial}
              </label>
            </div>
            <div
              style={{
                marginTop: "0.2%",
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
                • Solo puedes actualizar el dirección,ciudad,código postal y
                teléfono
              </label>
              <br />
              <label>
                • Los clientes se encuentran ordenados por el nombre de manera
                ascendente
              </label>
              <br />
              <label>
                • Debes estar seguro de eliminar o actualizar la informacion de
                los clientes mostrados a continuación, una vez confirmada la
                acción no puedes revertir los cambios
              </label>
            </div>
          </div>
          <br />
          <div className="row justify-content-center pt-6 mb-6 m-2 mt-1">
            <Table cellSpacing="10" className="tableRegistros" striped>
              <tr align="center" textalign="center">
                <th scope="row">Nombre</th>
                <th scope="row">Tipo documento</th>
                <th scope="row">Número documento</th>
                <th scope="row">Dirección</th>
                <th scope="row">Código postal</th>
                <th scope="row">Ciudad</th>
                <th scope="row">Teléfono</th>
                <th colSpan="2">Acciones</th>
              </tr>
              <tbody className="bodyTable" align="center" textalign="center">
                {clientestags}
              </tbody>
            </Table>
          </div>

          <Modal isOpen={this.state.modalActualizar} size="lg">
            <ModalHeader style={{ display: "block" }} closebutton>
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
                height="60"
                width="150"
                style={{
                  marginLeft: "3%",
                  marginTop: "1%",
                }}
                alt="Logo"
              />
              <div id="titulo">
                <label>Actualizar cliente</label>
              </div>
            </ModalHeader>

            <ModalBody>
              <AvForm id="editar">
                <Row>
                  <Col md="6">
                    <AvGroup>
                      <Label>Nombre: </Label>
                      <AvInput
                        className="form-control"
                        type="text"
                        name="nombre"
                        readOnly
                        value={this.state.form.nombre}
                      />
                    </AvGroup>
                  </Col>
                  <Col md="6">
                    <AvGroup>
                      <Label>Tipo documento: </Label>
                      <AvInput
                        className="form-control"
                        type="text"
                        name="tipoDocumento"
                        readOnly
                        value={this.state.form.tipoDocumento}
                      />
                    </AvGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <AvGroup>
                      <Label>Número documento: </Label>
                      <AvInput
                        className="form-control"
                        type="text"
                        name="numeroDocumento"
                        readOnly
                        value={this.state.form.numeroDocumento}
                      />
                    </AvGroup>
                  </Col>
                  <Col md="6">
                    <AvGroup>
                      <Label>Dirección: </Label>
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
                    </AvGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <AvGroup>
                      <Label>Código postal: </Label>
                      <AvInput
                        autoComplete="off"
                        className="form-control"
                        type="text"
                        name="codigoPostal"
                        onChange={this.handleChange}
                        value={this.state.form.codigoPostal}
                        validate={{
                          required: {
                            value: true,
                          },
                          pattern: {
                            value: "^[0-9]+$",
                          },
                          minLength: {
                            value: 4,
                          },
                          maxLength: {
                            value: 8,
                          },
                        }}
                      />
                      <AvFeedback>El código postal es requerido</AvFeedback>
                    </AvGroup>
                  </Col>
                  <Col md="6">
                    <AvGroup>
                      <Label>Ciudad: </Label>
                      <select
                        name="ciudad"
                        className="form-select"
                        onChange={this.handleChange}
                        value={this.state.form.ciudad || null}
                      >
                        {ciudadestags}
                      </select>
                    </AvGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <AvGroup>
                      <Label>Teléfono: </Label>
                      <AvInput
                        autoComplete="off"
                        className="form-control"
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
              </AvForm>
            </ModalBody>
            <ModalFooter>
              <div className="col text-center">
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

const mapStateToModel = function (formObject, empresa) {
  return {
    id: formObject.id,
    documento: {
      id: formObject.idTipoDocumento,
    },
    numDocumento: formObject.numeroDocumento,
    nombre: formObject.nombre,
    direccion: formObject.direccion,
    ciudad: {
      id: formObject.ciudad,
    },
    empresa: {
      id: empresa.id,
    },
    codPostal: formObject.codigoPostal,
    telefono: formObject.telefono,
    activo: true,
  };
};

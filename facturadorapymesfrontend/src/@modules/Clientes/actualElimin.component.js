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
        tipoDocumento: null,
        numeroDocumento: "",
        nombre: "",
        direccion: "",
        codigoPostal: "",
        ciudad: null,
        telefono: "",
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
      this.consultarDocumentos();
      this.consultarCiudades();
    }
  };

  consultarDocumentos = async () => {
    let respuesta = null;
    respuesta = await service.consultarDocumentos();
    this.setState({
      documentos: respuesta.data,
    });
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

          <Modal isOpen={this.state.modalActualizar}>
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
                height="55"
                width="135"
                style={{
                  marginLeft: "3%",
                  marginTop: "3%",
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
                  <Col md="12">
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
                </Row>
                <Row>
                  <Col md="12">
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
                  <Col md="12">
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
                </Row>

                <Row>
                  <Col md="12">
                    <AvGroup>
                      <Label>Dirección: </Label>
                      <AvInput
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="direccion"
                        name="nomdireccionbre"
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
                  <Col md="12">
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
                </Row>
                <Row>
                  <Col md="12">
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
                  <Col md="12">
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
    id: 0,
    documento: {
      id: formObject.tipoDocumento,
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

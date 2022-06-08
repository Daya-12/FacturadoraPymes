import React from "react";
import logo from "../../@images/logoProyecto.png";
import service from "./producto.service";
import actualizar from "../../@images/actualizarRegistros.png";
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
  Container
} from "reactstrap";
import {
  AvForm,
  AvInput,
  AvFeedback,
  AvGroup,
} from "availity-reactstrap-validation";
import Swal from "sweetalert2";
export default class ActualizarEliminarProductos extends React.Component {
  constructor() {
    super();
    this.state = {
      productos: [],
      categorias: [],
      modalActualizar: false,
      button: false,
      empresa: {
        id: "",
        razonSocial: "",
      },
      form: {
        id: "",
        nombre: "",
        valor: 0,
        categoria: null,
        tipoModal: "",
      },
    };
  }

  componentDidMount = async () => {
    this.consultarEmpresa();
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
      this.state.form.nombre === "" ||
      (this.state.form.nombre !== undefined &&
        this.state.form.nombre.length < 4) ||
      (this.state.form.nombre !== undefined &&
        this.state.form.nombre.length > 100) ||
      this.state.form.valor === "" ||
      (this.state.form.valor !== undefined &&
        this.state.form.valor.length < 3) ||
      (this.state.form.valor !== undefined && this.state.form.valor.length > 8)
    ) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
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
    this.consultarProductos();
  };

  consultarProductos = async () => {
    let respuesta = null;
    respuesta = await service.consultarProductos(this.state.empresa.id);
    if (respuesta !== null) {
      this.setState({
        productos: respuesta.data,
      });
      this.consultarCategorias();
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
      title: "Actualizacion de producto",
      text: "¿Deseas cancelar la actualización de datos para el producto seleccionado?",
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

  seleccionarProductoActualizar = async (producto) => {
    if (this.state.categorias !== []) {
      await this.setState({
        tipoModal: "actualizar",
        form: {
          id: producto.id,
          nombre: producto.nombre,
          valor: producto.valor,
          categoria: producto.id_categoria,
        },
      });
    }
  };

  seleccionarProductoEliminar = async (producto) => {
    await this.setState({
      form: {
        id: producto.id,
        nombre: producto.nombre,
        valor: producto.valor,
        categoria: producto.id_categoria,
      },
    });
    this.confirmacionEliminar();
  };

  confirmacionEliminar = () => {
    Swal.fire({
      title: "Dar de baja productos",
      text:
        "¿Estas seguro de dar de baja al producto " +
        this.state.form.nombre +
        "?\nUna vez eliminado el producto, no puedes volver a realizar facturas con el mismo",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D4C90",
      cancelButtonColor: "#973232",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, proceder",
    }).then((result) => {
      if (result.value) {
        this.deleteProducto();
      }
    });
  };

  deleteProducto = async () => {
    let respuesta = null;
    respuesta = await service.eliminar(this.state.form.id);
    if (respuesta.data === 1) {
      Swal.fire({
        text: "El producto ha sido dado de baja con éxito",
        icon: "success",
        timer: "4000",
      });
      this.componentDidMount();
    } else if (respuesta.data === 2) {
      Swal.fire({
        text: "Se realizó un borralo lógico para el producto seleccionado debido a que existe información que depende de este registro",
        icon: "success",
        timer: "4000",
      });
      this.componentDidMount();
    } else if (respuesta == null) {
      Swal.fire({
        text:
          "Uppss! El producto " +
          this.state.form.nombre +
          " no pudo ser dado de baja,¡Intentalo nuevamente!",
        icon: "error",
        timer: "4000",
      });
    }
  };

  consultarCategorias = async () => {
    let respuesta = null;
    respuesta = await service.consultarCategorias(this.state.empresa.id);
    this.setState({
      categorias: respuesta.data,
    });
  };

  onBlurNombre = async () => {
    if (this.state.form.nombre !== "") {
      let respuesta = null;
      respuesta = await service.validarNombreDistinto(
        this.state.form.nombre,
        this.state.form.id,
        this.state.empresa.id
      );
      if (respuesta !== null) {
        if (respuesta.data === true) {
          Swal.fire({
            text: "¡Ya existe un producto registrado con el nombre ingresado,puedes modificarlo!",
            icon: "error",
            timer: "4000",
          });

          this.setState({
            form: {
              id: this.state.form.id,
              nombre: "",
              valor: this.state.form.valor,
              categoria: this.state.form.categoria,
            },
          });
          this.validarCampos();
        }
      }
    }
  };

  update = async () => {
    let respuesta = null;
    const model = mapStateToModel(this.state.form, this.state.empresa);
    respuesta = await service.editar(model);
    if (respuesta !== null) {
      this.cerrarModalEditar();
      this.componentDidMount();
      Swal.fire({
        text:
          "¡El producto " +
          this.state.form.nombre +
          " ha sido actualizado exitosamente!",
        icon: "success",
        timer: "5000",
      });
    } else {
      Swal.fire({
        text:
          "Uppss! El producto " +
          this.state.form.nombre +
          " no puedo ser actualizado",
        icon: "error",
        timer: "4000",
      });
    }
  };

  confirmar = async () => {
    Swal.fire({
      className: "swal",
      title: "Actualizacion de producto",
      text:
        "¿Deseas confirmar la actualización del producto " +
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
    let productos;
    if (this.state.productos === null) {
      productos = [];
    } else {
      productos = this.state.productos;
    }
    let productostags = productos.map((producto) => (
      <tr key={producto.id}>
        <td>{producto.nombre}</td>
        <td>{producto.valor}</td>
        <td style={{ display: "none" }}>{producto.id_categoria}</td>
        <td>{producto.categoria}</td>
        <td>
          <button
            style={{
              outline: "0 none",
              border: "0",
              backgroundColor: "rgba(167, 167, 187, 0.534)",
              borderRadius: "50%",
            }}
            onClick={() => {
              this.seleccionarProductoActualizar(producto);
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
              this.seleccionarProductoEliminar(producto);
            }}
          >
            <img height="33" width="32" src={eliminar} alt="eliminar"></img>
          </button>
        </td>
      </tr>
    ));

    let categorias;
    if (this.state.categorias === null) {
      categorias = [];
    } else {
      categorias = this.state.categorias;
    }
    let categoriastags = categorias.map((categoria) => (
      <option key={categoria.id} value={categoria.id}>
        {categoria.nombre}
      </option>
    ));

    return (
      <Container>
        <div className="productosFondo">
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
                fontSize: "1.5em",
                fontFamily: "Segoe UI",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "0.5%",
              }}
            >
              <label>
                Actualizar o dar de baja productos registrados para{" "}
                {this.state.empresa.razonSocial}
              </label>
            </div>
            <div
              style={{
                marginTop: "0.2%",
                color: "#000227",
                fontSize: "0.813em",
                fontFamily: "Segoe UI",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <label style={{ color: "red" }}>Ten en cuenta que:</label>
              <br />
              <label>
                • Puedes actualizar el nombre, el valor y la categorio a la que
                pertenece un producto
              </label>
              <br />
              <label>
                • Los productos se encuentra ordenados por el nombre de manera
                ascendente
              </label>
              <br />
              <label>
                • Debes estar seguro de eliminar o actualizar la información de
                los productos mostrados a continuación, una vez confirmada la
                acción no puedes revertir los cambios
              </label>
            </div>
          </div>
          <br />

          <div className="row justify-content-center pt-6 mb-6 m-2 mt-1">
            <Table cellSpacing="10" className="tableRegistros" striped>
              <tr align="center" textalign="center">
                <th scope="row">Nombre</th>
                <th scope="row">Precio</th>
                <th scope="row">Categoria</th>
                <th colSpan="2">Acciones</th>
              </tr>
              <tbody className="bodyTable" align="center" textalign="center">
                {productostags}
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
                <label>Actualizar producto</label>
              </div>
            </ModalHeader>

            <ModalBody>
              <AvForm id="editar">
                <Row>
                  <Col md="12">
                    <AvGroup>
                      <Label>Nombre: </Label>
                      <AvInput
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={this.state.form.nombre}
                        onChange={this.handleChange}
                        onBlur={this.onBlurNombre}
                        validate={{
                          required: {
                            value: true,
                          },
                          pattern: {
                            value: "^[A-Za-z0-9 -/*+üáéíóú#]+$",
                          },
                          minLength: {
                            value: 4,
                          },
                          maxLength: {
                            value: 100,
                          },
                        }}
                      />
                      <AvFeedback>El nombre es requerido</AvFeedback>
                    </AvGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <AvGroup>
                      <Label>Valor: </Label>
                      <AvInput
                        autoComplete="off"
                        className="form-control"
                        type="text"
                        name="valor"
                        onChange={this.handleChange}
                        value={this.state.form.valor}
                        validate={{
                          required: {
                            value: true,
                          },
                          pattern: {
                            value: "^[0-9]+$",
                          },
                          minLength: {
                            value: 3,
                          },
                          maxLength: {
                            value: 10,
                          },
                        }}
                      />
                      <AvFeedback>El valor es requerido</AvFeedback>
                    </AvGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="12">
                    <AvGroup>
                      <Label>Categoria: </Label>
                      <select
                        name="categoria"
                        className="form-select"
                        onChange={this.handleChange}
                        value={this.state.form.categoria || null}
                      >
                        {categoriastags}
                      </select>
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
      </Container>
    );
  }
}

const mapStateToModel = function (formObject, empresa) {
  return {
    id: formObject.id,
    nombre: formObject.nombre,
    valor: formObject.valor,
    categoria: {
      id: formObject.categoria,
    },
    empresa: {
      id: empresa.id,
    },
    activo: true,
  };
};

import React from "react";
import service from "./producto.service";
import Swal from "sweetalert2";
import clean from "../../@images/cleanForms.png";
import logo from "../../@images/logoProyecto.png";
import registrarProducto from "../../@images/agregarProducto.png";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import {
  Button,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Col,
} from "reactstrap";
export default class RegistroProducto extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        nombre: "",
        valor: 0,
        categoria: null,
      },
      button: false,
      categorias: [],
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
    let informacionLocalStorage=JSON.parse(localStorage.getItem("user"));
    await this.setState({
      empresa: {
        id: informacionLocalStorage.empresa.id,
        razonSocial: informacionLocalStorage.empresa.razonSocial
      },
    });
    this.consultarCategorias();
  };

  consultarCategorias = async () => {
    let respuesta = null;
    respuesta = await service.consultarCategorias(this.state.empresa.id);
    this.setState({
      categorias: respuesta.data,
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
      (this.state.form.telefono !== undefined &&
        this.state.form.valor.length > 8) ||
        this.state.form.categoria === null
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
        valor: 0,
        categoria: null
      },
      button: false
    });
  };

  onBlurNombre = async () => {
    if (this.state.form.nombre !== "") {
      let respuesta = null;
      respuesta = await service.validarNombre(this.state.form.nombre,this.state.empresa.id);
      if (respuesta !== null) {
        if (respuesta.data === true) {
          Swal.fire({
            text: "¡Ya existe un producto con el nombre ingresado,puedes modificarlo!",
            icon: "error",
            timer: "4000",
          });

          this.setState({
            form: {
              nombre: "",
              valor: this.state.form.valor,
              categoria: this.state.form.categoria
            },
          });
          this.validarCampos();
        }
      }
    }
  };

  confirmarProducto() {
    Swal.fire({
      title: "Confirmar producto",
      text: "¿Realmente deseas confirmar los datos del producto a registrar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D4C90",
      cancelButtonColor: "#973232",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, proceder",
    }).then((result) => {
      if (result.value) {
        this.registrar();
      }
    });
  }
  

  registrar = async () => {
    let respuesta = null;
    const model = mapStateToModel(this.state.form, this.state.empresa);
    respuesta = await service.registrar(model);
    if(respuesta !== null){
      Swal.fire({
        text: "¡El producto " + this.state.form.nombre + " ha sido registrado exitosamente!",
        icon: "success",
        timer: "3000"
    })
    setTimeout(function () { window.location.reload(1); }, 4000);
    }else{
      Swal.fire({
        text: "Uppss! El producto " + this.state.form.nombre + " no pudo ser registrado",
        icon: "error",
        timer: "3000"
    })
  }
};

  render() {
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
      <div className="container">
        <div className="productosFondo">
        <div
            id="formProducto" className="mx-auto" style={{width: "45%", marginTop:"4%"}}
          >
            <AvForm id="registros">
            <Row>
              <Col md="3">
                  <img src={logo} height="65" width="205" alt="Logo ITS" />
                </Col>
                <Col md="7"></Col>
                <Col md="2">
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
                    <img height="30" width="24" src={clean} alt="clean"></img>
                  </Button>
                </Col>
              </Row>
              <br/>
              <Row>
                <h3
                  style={{
                    fontSize: "24px",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                    color: "#09065A",
                  }}
                >
                  Registro de nuevos productos
                </h3>
              </Row>
              <Row>
                <Col md="12">
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
              </Row>
              <Row>
                <Col md="12">
                <AvGroup>
                    <Label className="label-registro" htmlFor="nombre">
                      Nombre
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>📰</InputGroupText>
                      </InputGroupAddon>
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
                            value: "^[A-Za-z0-9 -/*+üáéíóú#ñ]+$",
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
                    </InputGroup>
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                <AvGroup>
                    <Label className="label-registro" htmlFor="valor">
                      Valor
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>💲</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="number"
                        className="form-control"
                        id="valor"
                        name="valor"
                        value={this.state.form.valor}
                        onChange={this.handleChange}
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
                            value: 8,
                          },
                        }}
                      />
                      <AvFeedback>El valor es requerido</AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col>
              </Row>
              <Row>
              <Col md="12">
                    <AvGroup>
                      <Label className="label-registro" htmlFor="razonSocial">
                        Categoria
                      </Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>🗂️</InputGroupText>
                        </InputGroupAddon>
                        <select
                          defaultValue={"DEFAULT"}
                          className="form-select"
                          id="categoria"
                          name="categoria"
                          value={this.state.form.categoria || null}
                          onChange={this.handleChange}
                        >
                          <option value="DEFAULT" disabled>
                            Selecciona una categoria
                          </option>
                          {categoriastags}
                        </select>
                      </InputGroup>
                    </AvGroup>
                  </Col>                
              </Row>
                <div
                  align="center"
                  style={{ marginTop: "3%"}}
                >
                  <Button
                    id="botonValidar"
                    size="lg"
                    outline
                    color="primary"
                    disabled={this.state.button === false}
                    onClick={() => this.confirmarProducto()}
                  >
                    Registrar &nbsp;
                    <img
                      height="25"
                      width="25"
                      src={registrarProducto}
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
      valor:formObject.valor,
      categoria: {
        id: formObject.categoria
      },
      empresa: {
          id: empresa.id
      },
      activo:true
  };
}
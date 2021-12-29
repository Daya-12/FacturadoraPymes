import React from "react";
import service from "./cliente.service";
import Swal from "sweetalert2";
import clean from "../../@images/cleanForms.png";
import logo from "../../@images/logoProyecto.png"
import registrarUser from "../../@images/registrarUsuario.png";
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
export default class RegistroCliente extends React.Component {
  constructor() {
    super();
    this.state = {
      documentos: [],
      ciudades: [],
      form: {
        tipoDocumento: null,
        numeroDocumento: "",
        nombre: "",
        direccion: "",
        ciudad: null,
        codigoPostal: "",
        telefono: "",
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
    this.setState({
      empresa: {
        id: informacionLocalStorage.empresa.id,
        razonSocial: informacionLocalStorage.empresa.razonSocial,
      },
    });
    this.consultarDocumentos();
    this.consultarCiudades();
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
      this.state.form.tipoDocumento === null ||
      this.state.form.numeroDocumento === "" ||
      (this.state.form.numeroDocumento !== undefined &&
        this.state.form.numeroDocumento.length < 8) ||
      (this.state.form.numeroDocumento !== undefined &&
        this.state.form.numeroDocumento.length > 12) ||
      this.state.form.nombre === "" ||
      (this.state.form.nombre !== undefined &&
        this.state.form.nombre.length < 3) ||
      (this.state.form.nombre !== undefined &&
        this.state.form.nombre.length > 100) ||
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

  cleanForm = () => {
    this.setState({
      form: {
        tipoDocumento: null,
        numeroDocumento: "",
        nombre: "",
        direccion: "",
        ciudad: null,
        codigoPostal: "",
        telefono: "",
      },
      button: false
    });

  };

  confirmarCliente() {
    Swal.fire({
      title: "Confirmar cliente",
      text: "¿Realmente deseas confirmar los datos del cliente a registrar?",
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
        text: "¡El cliente " + this.state.form.nombre+" ha sido registrado exitosamente!",
        icon: "success",
        timer: "3000"
    })
    setTimeout(function () { window.location.reload(1); }, 4000);
    }else{
      Swal.fire({
        text: "Uppss! El cliente " + this.state.form.nombre + " no pudo ser registrado",
        icon: "error",
        timer: "3000"
    })
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

    let documentos;
    if (this.state.documentos === null) {
      documentos = [];
    } else {
      documentos = this.state.documentos;
    }
    let documentostags = documentos.map((documento) => (
      <option key={documento.id} value={documento.id}>
        {documento.nombre}
      </option>
    ));

    return (
      <div className="container">
        <div className="clientesFondo">
          <div
            id="formCliente"
            className="mx-auto"
            style={{ width: "90%", marginTop: "6%" }}
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
                    <img height="32" width="23" src={clean} alt="clean"></img>
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
                  Registro de nuevos clientes
                </h3>
                <br />
              </Row>

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
                      Nombre o Razón Social
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
                            value: "^[A-Za-z0-9#.üáéíóúñ ]+$",
                          },
                          minLength: {
                            value: 3,
                          },
                          maxLength: {
                            value: 100,
                          },
                        }}
                      />
                      <AvFeedback>El nombre o razón social es requerido</AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col> 
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registro" htmlFor="tipoDocumento">
                      Tipo documento
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🪪</InputGroupText>
                      </InputGroupAddon>
                      <select
                        defaultValue={"DEFAULT"}
                        className="form-select"
                        id="tipoDocumento"
                        name="tipoDocumento"
                        value={this.state.form.tipoDocumento || null}
                        onChange={this.handleChange}
                      >
                        <option value="DEFAULT" disabled>
                          Selecciona un tipo de documento
                        </option>
                        {documentostags}
                      </select>
                    </InputGroup>
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registro" htmlFor="razonSocial">
                      Número documento
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🆔</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="numeroDocumento"
                        name="numeroDocumento"
                        value={this.state.form.numeroDocumento}
                        onChange={this.handleChange}
                        validate={{
                          required: {
                            value: true,
                          },
                          pattern: {
                            value: "^[0-9]+$",
                          },
                          minLength: {
                            value: 8,
                          },
                          maxLength: {
                            value: 12,
                          },
                        }}
                      />
                      <AvFeedback>
                        El número de documento es requerido
                      </AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col>
                <Col md="4">
                    <AvGroup>
                      <Label className="label-registro">Dirección</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>🏤</InputGroupText>
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
                  <Col md="4">
                  <AvGroup>
                    <Label className="label-registro" htmlFor="razonSocial">
                      Código postal
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>🔢</InputGroupText>
                      </InputGroupAddon>
                      <AvInput
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="codigoPostal"
                        name="codigoPostal"
                        value={this.state.form.codigoPostal}
                        onChange={this.handleChange}
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
                      <AvFeedback>
                        El código postal es requerido
                      </AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registro" htmlFor="tipoDocumento">
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
                </Row>

                <div
                  align="right"
                  style={{ marginTop: "1%", marginLeft: "3%" }}
                >
                  <Button
                    id="botonValidar"
                    size="lg"
                    outline
                    color="primary"
                    disabled={this.state.button === false}
                    onClick={() => this.confirmarCliente()}
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
      documento: {
        id: formObject.tipoDocumento
      },
      numDocumento:formObject.numeroDocumento,
      nombre:formObject.nombre,
      direccion: formObject.direccion,
      ciudad:{
        id: formObject.ciudad
      },
      empresa: {
        id: empresa.id
      },
      codPostal: formObject.codigoPostal,
      telefono: formObject.telefono,
      activo:true
  };
}
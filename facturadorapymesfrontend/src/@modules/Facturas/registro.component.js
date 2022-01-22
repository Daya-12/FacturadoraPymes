import React from "react";
import service from "./factura.service";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
export default class RegistroFactura extends React.Component {
  constructor() {
    super();
    this.state = {
      ciudades: [],
      clientes: [],
      formasPago: [],
      button: false,
      fechaEmision: null,
      check: false,
      empresaCompleta: {
        id: "",
        razonSocial: "",
        slogan: "",
        nit: "",
        correoElectronico: "",
        direccion: "",
        ciudad: "",
        telefono: "",
      },
      empresa: {
        id: "",
        razonSocial: "",
      },
      form: {
        fechaEmision: "",
        fechaVencimiento: "",
        formaPago: "",
        formaPagoPersonalizada: "",
        ciudad: "",
        cliente: "",
      },
      cliente: {
        nombre_tdocumento: "",
        num_documento: "",
        nit: "",
        direccion: "",
        telefono: "",
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
    this.completarInformacionEmpresa();
    this.consultarCiudades();
    this.consultarClientes();
    this.consultarLogo();
    this.consultarFormasPago();
  };

  consultarCiudades = async () => {
    let respuesta = null;
    respuesta = await service.consultarCiudades();
    this.setState({
      ciudades: respuesta.data,
    });
  };

  consultarClientes = async () => {
    let respuesta = null;
    respuesta = await service.consultarClits(this.state.empresa.id);
    if (respuesta !== null) {
      this.setState({
        clientes: respuesta.data,
      });
    }
  };

  consultarFormasPago = async () => {
    let respuesta = null;
    respuesta = await service.consultarFormasPago();
    var f = new Date();
    if (respuesta !== null) {
      this.setState({
        formasPago: respuesta.data,
        fechaEmision:
          f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
      });
      document.getElementById("formaPagoPersonalizada").disabled = true;
    }
  };

  consultarLogo = async () => {
    let respuesta = null;
    respuesta = await service.consultarLogo(this.state.empresa.id);
    if (respuesta !== null) {
      document.getElementById("logoPyme").src =
        "data:" +
        respuesta.data.contentType +
        ";base64," +
        respuesta.data.bytes;
    }
  };

  completarInformacionEmpresa = async () => {
    let respuesta = null;
    respuesta = await service.buscarPorId(this.state.empresa.id);
    if (respuesta !== null) {
      this.setState({
        empresaCompleta: {
          id: respuesta.data.id,
          razonSocial: respuesta.data.razonSocial,
          slogan: respuesta.data.slogan,
          nit: respuesta.data.nit,
          correoElectronico: respuesta.data.correoElectronico,
          direccion: respuesta.data.direccion,
          ciudad: respuesta.data.ciudad.nombre,
          telefono: respuesta.data.telefono,
        },
      });
    }
  };

  handleChangeCiudad = async (e, v) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        ciudad: v,
      },
    });
  };

  handleChangeCliente = async (e, v) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        cliente: v,
      },
    });
    let cliente = this.state.clientes.find((cliente) => cliente.nombre === v);
    if (v !== "" && cliente != undefined) {
      this.setState({
        cliente: {
          nombre_tdocumento:
            cliente.nombre_tdocumento + " " + cliente.num_documento,
          direccion: cliente.direccion,
          telefono: cliente.telefono,
        },
      });
    } else {
      this.setState({
        cliente: {
          nombre_tdocumento: "",
          direccion: "",
          telefono: "",
        },
      });
    }
  };

  handleChangeFormaPago = async (e, v) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        formaPago: v,
      },
    });
    let formap = this.state.formasPago.find(
      (formaPago) => formaPago.nombre === v
    );
    if (v !== "" && formap != undefined) {
      document.getElementById("check").disabled = true;
    } else if (v === "") {
      document.getElementById("check").disabled = false;
    }
  };

  handleChangeCheck = async (cb) => {
    await this.setState({
      check: cb.target.checked,
    });
    if (this.state.check) {
      document.getElementById("formaPago").disabled = true;
      this.setState({
        form: {
          ...this.state.form,
          formaPago: "",
        },
      });

      document.getElementById("formaPagoPersonalizada").disabled = false;
    } else if (!this.state.check) {
      this.setState({
        form: {
          ...this.state.form,
          formaPagoPersonalizada: "",
        },
      });
      document.getElementById("formaPago").disabled = false;
      document.getElementById("formaPagoPersonalizada").disabled = true;
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
    //this.validarCampos();
  };

  render() {
    return (
      <div className="container">
        <div className="facturasFondo">
          <div
            id="formFactura"
            className="mx-auto"
            style={{ width: "95%", marginTop: "4%" }}
          >
            <div>
              <div className="sub1Factura" align="left">
                <img
                  className="logoPyme"
                  id="logoPyme"
                  src=""
                  height="130"
                  width="170"
                  alt="Cargando..."
                />
              </div>

              <div className="titulosFactura" align="center">
                <label
                  style={{
                    fontSize: "21px",
                    color: "#000227",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.empresaCompleta.razonSocial}
                </label>
                <br />
                <label
                  style={{
                    fontSize: "14px",
                    color: "#000227",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                    marginBottom: "1%",
                  }}
                >
                  {this.state.empresaCompleta.slogan}
                </label>
                <br />
                <label
                  style={{
                    fontSize: "14px",
                    color: "#000227",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                  }}
                >
                  {this.state.empresaCompleta.nit}
                </label>
                <br />
                <hr />
                <label
                  style={{
                    fontSize: "13px",
                    color: "#000227",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                  }}
                >
                  {this.state.empresaCompleta.direccion}&nbsp;-&nbsp;
                  {this.state.empresaCompleta.ciudad}&nbsp;&nbsp;•&nbsp;&nbsp;
                  {this.state.empresaCompleta.correoElectronico}
                  &nbsp;&nbsp;•&nbsp;&nbsp;{this.state.empresaCompleta.telefono}
                </label>
              </div>
              <div
                className="titulosFactura2"
                align="center"
                style={{
                  backgroundColor: "red",
                }}
              >
                <label>hola</label>
              </div>
            </div>
            <hr />
            <br />
            <AvForm id="registros">
              <Row>
                <Col md="2">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="fechaEmision">
                      Fecha emisión
                    </Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="fechaEmision"
                      name="fechaEmision"
                      value={this.state.fechaEmision}
                      readOnly
                    />
                  </AvGroup>
                </Col>
                <Col md="2">
                  <AvGroup>
                    <Label
                      className="label-registroF"
                      htmlFor="fechaVencimiento"
                    >
                      Fecha vencimiento
                    </Label>
                    <InputGroup>
                      <AvInput
                        type="date"
                        className="form-control"
                        id="fechaVencimiento"
                        name="fechaVencimiento"
                        value={this.state.form.fechaVencimiento}
                        onChange={this.handleChange}
                        validate={{
                          required: {
                            value: true,
                          },
                        }}
                      />
                      <AvFeedback>
                        La fecha de vencimiento es requerida
                      </AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col>
                <Col md="4">
                  <AvGroup>
                    <Autocomplete
                      style={{ marginTop: "3%" }}
                      options={this.state.ciudades}
                      getOptionLabel={(option) => option.nombre}
                      filterSelectedOptions
                      id="select-on-focus"
                      selectOnFocus
                      sx={{ width: 300 }}
                      onInputChange={this.handleChangeCiudad}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Ciudad"
                          variant="standard"
                          required
                        />
                      )}
                    />
                  </AvGroup>
                </Col>
                <Col md="4">
                  <Autocomplete
                    style={{ marginTop: "3%" }}
                    options={this.state.clientes}
                    getOptionLabel={(option) => option.nombre}
                    filterSelectedOptions
                    id="select-on-focus"
                    selectOnFocus
                    sx={{ width: 300 }}
                    onInputChange={this.handleChangeCliente}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cliente"
                        variant="standard"
                        required
                      />
                    )}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "2%" }}>
                <Col md="3">
                  <AvGroup>
                    <Label
                      className="label-registroF"
                      htmlFor="nombre_tdocumento"
                    >
                      Tipo y número documento cliente
                    </Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="nombre_tdocumento"
                      name="nombre_tdocumento"
                      value={this.state.cliente.nombre_tdocumento}
                      readOnly
                    />
                  </AvGroup>
                </Col>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="direccion">
                      Dirección cliente
                    </Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="direccion"
                      name="direccion"
                      value={this.state.cliente.direccion}
                      readOnly
                    />
                  </AvGroup>
                </Col>
                <Col md="3">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="telefono">
                      Teléfono cliente
                    </Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      value={this.state.cliente.telefono}
                      readOnly
                    />
                  </AvGroup>
                </Col>
                <Col md="2"></Col>
              </Row>
              <Row style={{ marginTop: "2%" }}>
                <Col md="4">
                  <Autocomplete
                    style={{ marginTop: "3%" }}
                    options={this.state.formasPago}
                    getOptionLabel={(option) => option.nombre}
                    filterSelectedOptions
                    id="formaPago"
                    selectOnFocus
                    sx={{ width: 300 }}
                    onInputChange={this.handleChangeFormaPago}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Forma de Pago"
                        variant="standard"
                        value={this.state.form.formaPago || null}
                      />
                    )}
                  />
                </Col>
                <Col md="2" style={{ marginTop: "2%" }}>
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="fechaEmision">
                      ¿F.Pago personalizada?&nbsp;&nbsp;
                    </Label>
                    <input
                      type="checkbox"
                      id="check"
                      name="check"
                      value={this.state.check}
                      onChange={this.handleChangeCheck.bind(this)}
                    />
                  </AvGroup>
                </Col>
                <Col md="6">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="fechaEmision">
                      Forma de pago personalizada
                    </Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="formaPagoPersonalizada"
                      name="formaPagoPersonalizada"
                      value={this.state.form.formaPagoPersonalizada}
                      onChange={this.handleChange}
                    />
                  </AvGroup>
                </Col>
              </Row>
              <br />
              <br />
              <hr />
            </AvForm>
          </div>
        </div>
      </div>
    );
  }
}

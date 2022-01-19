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
    this.consultarFormasPago();
    this.consultarLogo();
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
    if (respuesta !== null) {
      this.setState({
        formasPago: respuesta.data,
      });
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
    console.log("hoola" + this.state.empresa.id);
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
  };

  handleChangeFormaPago = async (e, v) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        formaPago: v,
      },
    });
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
            <hr /><br />
            <AvForm id="registros">
              <Row>
                <Col md="4">
                  <Autocomplete
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
                      />
                    )}
                  />
                </Col>
                <Col md="4">
                  <Autocomplete
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
                      />
                    )}
                  />
                </Col>

                <Col md="4">
                  <Autocomplete
                    options={this.state.formasPago}
                    getOptionLabel={(option) => option.nombre}
                    filterSelectedOptions
                    id="select-on-focus"
                    selectOnFocus
                    sx={{ width: 300 }}
                    onInputChange={this.handleChangeFormaPago}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Formas Pago"
                        variant="standard"
                      />
                    )}
                  />
                </Col>
              </Row>
            </AvForm>
          </div>
        </div>
      </div>
    );
  }
}

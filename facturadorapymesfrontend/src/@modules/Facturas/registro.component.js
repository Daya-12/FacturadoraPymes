import React from "react";
import service from "./factura.service";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default class RegistroFactura extends React.Component {
  constructor() {
    super();
    this.state = {
      ciudades: [],
      clientes: [],
      formasPago: [],
      button: false,
      empresa: {
        id :"",
        razonSocial: ""
      },
      form: {
        fechaEmision: "",
        fechaVencimiento: "",
        formaPago: "",
        formaPagoPersonalizada:"",
        ciudad: "",
        cliente: ""
      }
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
    this.consultarCiudades();
    this.consultarClientes();
    this.consultarFormasPago();
  };

  consultarCiudades = async () => {
    let respuesta = null;
    respuesta = await service.consultarCiudades();
    this.setState({
      ciudades: respuesta.data
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
  
  handleChangeCiudad = async (e,v) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        ciudad: v,
      }
    });
  };

    handleChangeCliente = async (e,v) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        cliente: v,
      }
    });
  };

      handleChangeFormaPago = async (e,v) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        formaPago: v,
      }
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
        
        <Autocomplete
          options={this.state.ciudades}
          getOptionLabel={option => option.nombre}
          filterSelectedOptions
          id="select-on-focus"
          selectOnFocus
          sx={{ width: 300 }}
          onInputChange={this.handleChangeCiudad}
          renderInput={(params) => (
            <TextField {...params} label="Ciudad" variant="standard" />
          )}
        />
        <Autocomplete
          options={this.state.clientes}
          getOptionLabel={option => option.nombre}
          filterSelectedOptions
          id="select-on-focus"
          selectOnFocus
          sx={{ width: 300 }}
          onInputChange={this.handleChangeCliente}
          renderInput={(params) => (
            <TextField {...params} label="Clientes" variant="standard" />
          )}
        />

                <Autocomplete
          options={this.state.formasPago}
          getOptionLabel={option => option.nombre}
          filterSelectedOptions
          id="select-on-focus"
          selectOnFocus
          sx={{ width: 300 }}
          onInputChange={this.handleChangeFormaPago}
          renderInput={(params) => (
            <TextField {...params} label="Formas Pago" variant="standard" />
          )}
        />
        </div>
        </div>
      </div>
    );
  }
}

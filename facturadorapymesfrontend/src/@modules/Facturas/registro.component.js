import React from "react";
import service from "./factura.service";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default class RegistroFactura extends React.Component {
  constructor() {
    super();
    this.state = {
      ciudades: [],
      button: false,

      form: {
        razonSocial: "",
        slogan: "",
        nit: "",
        telefono: "",
        email: "",
        direccion: "",
        logo: null,
        ciudad: null,
      },

    };
  }

  componentDidMount = async () => {
    this.consultarCiudades();
  };

  consultarCiudades = async () => {
    let respuesta = null;
    respuesta = await service.consultarCiudades();
    this.setState({
      ciudades: respuesta.data,
    });
  };

  
  handleChange = async (e,v) => {
    console.log("sdas");
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: v,
      }
    });
    console.log(this.state.form);
  };


  render() {
    
    return (
      <div className="container">
        <Autocomplete
          options={this.state.ciudades}
          getOptionLabel={option => option.nombre}
          filterSelectedOptions
         
          id="select-on-focus"
          selectOnFocus
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Ciudad" variant="standard" onInputChange={this.handleChange}  name="ciudad"/>
          )}
        />
      </div>
    );
  }
}

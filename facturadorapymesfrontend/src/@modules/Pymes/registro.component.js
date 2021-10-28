import React from "react";
import clean from "../../@images/cleanForms.png";
import logo from "../../@images/logoProyecto.png";
import registrarPyme from "../../@images/registrarPyme.png";
import "../../@styles/styles.components.css";
import service from "./registro.service";
import { Button,Input } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';

export default class RegistroPyme extends React.Component {
  constructor() {
    super();
    this.state = {
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
      ciudades: [],
      button: false
    };
  }

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });

    if (this.state.form.razonSocial === "" || this.state.form.slogan === "" || this.state.form.nit===""
    || this.validarEmail() === false
    || this.state.form.telefono==="" || this.state.form.direccion === "" || this.state.form.logo === null 
    || this.state.form.ciudad === null
    ) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
    console.log(this.state.form);
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

  handleFileInput = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.files[0],
      },
    });
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
    console.log(this.ciudades);
  };

  cleanForm = () => {
    document.getElementById("crearPymes").reset();
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

    return (
      <div className="container">
        <div className="pymeReg">
          <div className="col-md-12 formularioR">
            <div align="left" style={{ marginTop: "10px", marginLeft: "10px" }}>
              <img src={logo} height="85" width="260" alt="Logo ITS" />
            </div>
            <h2
              style={{
                fontSize: "36px",
                fontFamily: "Segoe UI",
                textAlign: "center",
                color: "#09065A",
              }}
            >
              ¡Registra tu pyme!
            </h2>
            <br />
            <div
              id="formPyme"
              className="row justify-content-center pt-6 mb-6 m-2"
            >
              <div className="col-12" align="right">
                <button
                  style={{
                    outline: "0 none",
                    border: "0",
                    backgroundColor: "rgba(221, 220, 220, 0.795)",
                    marginRight: "20px",
                  }}
                  onClick={() => {
                    this.cleanForm();
                  }}
                >
                  <img height="41" width="40" src={clean} alt="clean"></img>
                </button>
              </div>
              <AvForm id="crearPymes">
                <div className="form-group row">
                  <div className="form-group col-md-4">
                    <label className="label-registro" htmlFor="razonSocial">
                      Razón social
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-bank2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z" />
                        </svg>
                      </span>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="razonSocial"
                        name="razonSocial"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-5">
                    <label className="label-registro">Slogan</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-cart4"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                        </svg>
                      </span>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="slogan"
                        name="slogan"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-3">
                    <label className="label-registro">Identificación</label>
                    
                      <AvField autoComplete="off"
                        type='number'
                        className="form-control"
                        id="nit"
                        name="nit"
                        onChange={this.handleChange}
                        validate={{
                          required: {value: true, errorMessage: "Please enter a username"},
                          pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your username must be composed only with letter and numbers'},
                          minLength: {value: 6, errorMessage: 'Your username must be between 6 and 16 characters'},
                          maxLength: {value: 16, errorMessage: 'Your username must be between 6 and 16 characters'}
                      }}
                      />
                  
                  </div>
                </div>
                <div className="form-group row">
                  <div className="form-group col-md-4">
                    <label className="label-registro" htmlFor="razonSocial">
                      Teléfono
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-telephone-inbound"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0zm-12.2 1.182a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>
                      </span>
                      <input
                        autoComplete="off"
                        type="number"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="label-registro">E-mail</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-envelope"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                        </svg>
                      </span>
                      <input
                        autoComplete="off"
                        type="email"
                        className="form-control"
                        placeholder="ejemplo@dominio.com"
                        id="email"
                        name="email"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="label-registro">Dirección</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-geo-alt"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </span>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        id="direccion"
                        name="direccion"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="form-group col-md-5">
                    <label className="label-registro" htmlFor="razonSocial">
                      Logo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      id="logo" 
                      name="logo" 
                      onChange={this.handleFileInput}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="label-registro" htmlFor="razonSocial">
                      Ciudad
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-map"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"
                          />
                        </svg>
                      </span>
                      <select className="form-select" id="ciudad" name="ciudad" onChange={this.handleChange}>
                        <option selected="true" disabled="disabled">
                          Selecciona la ciudad
                        </option>
                        {ciudadestags}
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  align="right"
                  style={{ marginTop: "50px", marginLeft: "10px" }}
                >
                  <Button size="lg" outline disabled={this.state.button === false}>
                    ¡Registrar! &nbsp;
                    <img
                      height="40"
                      width="40"
                      src={registrarPyme}
                      alt="registrar"
                    ></img>
                  </Button>
                </div>
              </AvForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

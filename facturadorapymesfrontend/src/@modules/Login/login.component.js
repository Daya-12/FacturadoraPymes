import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,Container } from "reactstrap";
import "../../@styles/styles.components.css";
import service from "./login.service";
import Swal from 'sweetalert2';
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        correo: "",
        pass: "",
      },
      button: false,
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
    if (
      this.state.form.correo === "" ||
      this.validarEmail() === false ||
      this.state.form.pass < 8
    ) {
      this.setState({ button: false });
    } else if (
      this.validarEmail() !== false &&
      this.state.form.pass.length >= 8
    ) {
      this.setState({ button: true });
    }
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

  validarUser = async () => {
    if (this.state.form.correo === "" || this.state.form.pass === "") {
      window.alert("¡Completa los campos vacios!");
    } else if (this.validarEmail() === false) {
      window.alert("¡Diligencia un correo valido!");
    } else {
      let respuesta = null;
      respuesta = await service.validarUsuario({
        correo: this.state.form.correo,
        pass: this.state.form.pass,
      });
      if (respuesta!==null) {
        if(respuesta.data.nivel==="0"){
          let idEmpresa = respuesta.data.empresa.id;
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(respuesta.data));
          Swal.fire({
            text: "¡Bienvenido "+respuesta.data.nombre+"!",
            icon: "success",
            timer: "3000",
          });
          const isAuthenticated = localStorage.getItem("isAuthenticated");
          isAuthenticated
            ? this.props.history.replace("/MenuAdministrador/" + idEmpresa, {
                idEmpresa: idEmpresa,
              }
              )
            : window.alert("Error");
        }else if(respuesta.data.nivel==="1"){
          let idEmpresa = respuesta.data.empresa.id;
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("user", JSON.stringify(respuesta.data));
          Swal.fire({
            text: "¡Bienvenido "+respuesta.data.nombre+"!",
            icon: "success",
            timer: "3000",
          });
          const isAuthenticated = localStorage.getItem("isAuthenticated");
          isAuthenticated
            ? this.props.history.replace("/MenuUsuarioBasico/" + idEmpresa, {
                idEmpresa: idEmpresa,
              }
              )
            : window.alert("Error");

        }
      } else {
        Swal.fire({
          text: "Correo o contraseña invalidos",
          icon: "error",
          timer: "3000",
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <div className="background-image">
          <div className="row justify-content-center pt-5 mt-5 m-1">
            <div className="col-md-4 formulario">
              <form id="login">
                <div className="form-group text-center pt-4 pb-4">
                  <h3 className="text-light">Iniciar sesión en ISSMC</h3>
                </div>
                <div className="form-group mx-sm-4">
                  <input
                    autoComplete="off"
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                    name="correo"
                    onChange={this.handleChange}
                    required
                    style={{ marginTop: "1.25em", marginBottom: "1.688em" }}
                  />
                </div>
                <div className="form-group mx-sm-4">
                  <input
                    autoComplete="off"
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="pass"
                    minLength="8"
                    onChange={this.handleChange}
                    required
                    style={{ marginBottom: "1.25em" }}
                  />
                </div>
                <div className="form-group row">
                  <div className="form-group col-md-4"></div>
                  <div className="form-group col-md-4">
                    <Button
                      className="buttonIngresar"
                      color="primary"
                      onClick={() => this.validarUser()}
                      disabled={this.state.button === false}
                      style={{ marginBottom: "1.688em" }}
                    >
                      INGRESAR
                    </Button>
                  </div>
                  <div className="form-group col-md-4"></div>
                </div>
                <br/>
                <div className="form-group mx-sm-4 text-center pb-3">
                  <span>
                    <label>¿No estas registrado?</label>&nbsp;&nbsp;
                    <a href="/Registrarse" className="registrarseAhora">
                      ¡Registrate ahora!
                    </a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

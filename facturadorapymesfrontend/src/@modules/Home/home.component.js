import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../@images/logoProyecto.png";
import { Collapse, Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import "../../@styles/styles.components.css";
import Swal from "sweetalert2";
import serviceHome from "./home.service.js";

export default class Home extends React.Component {


    consultarFactura = async () => {
    let refFactura = document.getElementById("refFactura").value;
    if (refFactura === "") {
      Swal.fire({
        text: "Ingresa la referencia de tu factura",
        icon: "error",
        timer: "3000",
      });
    } else {
      let respuesta = null;
      respuesta = await serviceHome.consultarFactura(refFactura);
      this.props.history.push("/consultaFactura/"+refFactura, {refFactura:refFactura})
    }
  };
  
  render() {
    return (
      <div class="container">
        <header id="main-header">
          <div class="cabecera">
            <div class="sub1">
              <div>
                <a href="Principal.js">
                  <img src={Logo} height="100" width="295" alt="Logo" />
                </a>
              </div>
            </div>
            <div class="sub2">
              <Navbar color="light" light expand="md">
                <Collapse navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink href="/">Inicio</NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink href="/">Sobre nosotros</NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink href="/">Contactanos</NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink href="/Login">Ingresar</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </div>
        </header>

        <div class="Inicio">
          <div class="subc1">
            <div class="col-12">
              <div class="input-group input-group-md w-50 mx-auto">
                <div class="input-group-prepend">
                  <span class="input-group-text">📑</span>
                </div>
                <input
                  id="refFactura"
                  type="text"
                  class="form-control"
                  placeholder="Digita la referencia de tu factura"
                  autocomplete="off"
                />
                <div class="input-group-append">
                  <Button
                    color="primary"
                    onClick={() => this.consultarFactura()}
                  >
                    Consultar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer id="main-footer">
          <br></br>
          <p>
            <div align="center">
              &copy; Copyrigth 2021. Diseñado por ISSMC Colombia |
              Bogotá,Colombia
            </div>
          </p>
        </footer>
      </div>
    );
  }
}

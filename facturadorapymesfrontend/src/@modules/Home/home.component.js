import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../@images/logoProyecto.png";
import { Collapse, Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import "../../@styles/styles.components.css";
import Swal from "sweetalert2";
import {
  AvForm
} from "availity-reactstrap-validation";
import {
  Row,
  Col
} from "reactstrap";
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
      window.open("/exportarFactura/"+refFactura, "_blank");
    }
  };
  
  render() {
    return (
      <div className="container">
        <div className="subc1">
        <header id="main-header">
          <div className="cabecera">
            <div className="sub1">
              <div>
                <a href="Principal.js">
                  <img src={Logo} height="100" width="295" alt="Logo" />
                </a>
              </div>
            </div>
            <div className="sub2">
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
                      <NavLink href="/Login">Ingresar</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </div>
        </header>

        <div className="Inicio">
              <div className="input-group input-group-md w-50 mx-auto">
                <div className="input-group-prepend">
                  <span className="input-group-text">📑</span>
                </div>
                <input
                  id="refFactura"
                  type="text"
                  className="form-control"
                  placeholder="Digita la referencia de tu factura"
                  autocomplete="off"
                />
                <div className="input-group-append">
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

        <footer id="main-footer">
          <br></br>
          <p>
            <div align="center">
              &copy; Copyrigth 2022. Diseñado por ISSMC Colombia |
              Bogotá,Colombia
            </div>
          </p>
        </footer>
      </div>
    );
  }
}

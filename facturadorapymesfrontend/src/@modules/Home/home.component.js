import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../@images/logoProyecto.png";
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import "../../@styles/styles.components.css";
import Swal from "sweetalert2";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  consultarFactura = async () => {
    let refFactura = document.getElementById("refFactura").value;
    if (refFactura === "") {
      Swal.fire({
        text: "Ingresa la referencia de la factura a consultar",
        icon: "info",
        timer: "3000",
      });
    } else {
      window.open("/exportarFactura/" + refFactura, "_blank");
      document.getElementById("refFactura").value="";
    }
  };

  sobreNosotros = async () => {
    Swal.fire({
      title: "¿Qué es ISSMC?",
      html: "<p id='swalParte1SobreNosotros'>ISSMC es un sistema facturador web orientado para pequeñas y medianas empresas en Colombia, aquí podrás encontrar soluciones organizacionales para mejorar los procesos de facturación en un menor tiempo. Ofrecemos creación y anulación de facturas con exportación en formato PDF y una administración total de clientes, productos y usuarios con exportaciones a Excel, así como administración de categorias con el fin de que puedas emprender con nuevos productos en tu pyme.</p><br/><p id='swalParte2SobreNosotros'>¡No esperes más, olvidate del papel con ISSMC!</p>",
      footer: '<a href="/Registrarse">¿No está registrada tu pyme? ¡Registrate ahora!</a>'
    });

  };
  
  render() {
    return (
      <div className="container">
        <div className="subc1">
          <header id="main-header">
            <div className="cabecera">
              <div className="sub1">
                <div>
                  <a href="/">
                    <img src={Logo} height="100" width="295" alt="Logo" />
                  </a>
                </div>
              </div>
              <div className="sub2">
                <Navbar color="light" light expand="lg">
                  <Collapse navbar>
                    <Nav className="mr-auto" navbar>
                      <NavItem>
                        <NavLink href="/">Inicio</NavLink>
                      </NavItem>

                      <Dropdown
                        nav
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle nav caret>
                          Sobre nosotros
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={this.sobreNosotros}>¿Qué es ISSMC?</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

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
                autoComplete="off"
              />
              <div className="input-group-append">
                <Button color="primary" onClick={() => this.consultarFactura()}>
                  Consultar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <footer id="main-footer">
          <br></br>
          <span>
            <div align="center">
              &copy; Copyrigth 2022. Diseñado por ISSMC | Bogotá,Colombia
            </div>
          </span>
        </footer>
      </div>
    );
  }
}

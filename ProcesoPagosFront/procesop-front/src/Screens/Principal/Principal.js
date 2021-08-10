import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../Images/LogoITS2.JPG';
import "../../Styles/Principal.css"
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
} from 'reactstrap';

class Principal extends React.Component {
    constructor() {
        super();
        this.state={

        }
    }

    validarVacio = function () {
        let idFactura = document.getElementById("idFactura").value;
        if (idFactura === "") {
            window.alert("Digita el número de tu factura")
        }

        else if (idFactura <= 0) {
            window.alert("Digita un número factura valido")
        }
    }


    render() {
        return (
            <div class="container">
                <header id="main-header">
                    <div class="cabecera">
                        <div class="sub1">
                            <br></br><br></br><br></br>
                            <div>
                                <a href="Principal.js"><img src={Logo} height="95" width="280" alt="Logo ITS"/></a>
                            </div>
                        </div>

                        <div>
                            <Navbar color="light" light expand="md">
                                <Collapse navbar>
                                    <Nav className="mr-auto" navbar>

                                        <NavItem>
                                            <NavLink href="/">Inicio</NavLink>
                                        </NavItem>

                                        <NavItem>
                                            <NavLink href="/About">Sobre nosotros</NavLink>
                                        </NavItem>

                                        <NavItem>
                                            <NavLink href="/ContactUs">Contactanos</NavLink>
                                        </NavItem>

                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>Nuestros productos</DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>Internet Satelital</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>Telefonía</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                        <NavItem>
                                            <NavLink href="/Login">Ingresar</NavLink>
                                        </NavItem>

                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                        <br></br>
                    </div>
                </header>

                <div class="Inicio">
                    <div class="subc1">
                        <div class="col-12">
                            <div class="input-group input-group-md w-50 mx-auto">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">📑</span>
                                </div>
                                <input id="idFactura" type="number" class="form-control" placeholder="Digita el número de tu factura" />
                                <div class="input-group-append">
                                    <Button color="primary" onClick={() => this.validarVacio()}>Consultar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer id="main-footer">
                    <br></br>
                    <p><div align="center">&copy; Copyrigth 2021. Diseñado por ITS Colombia | Bogotá,Colombia</div></p>
                </footer>
            </div>

        );

    }
}
export default Principal;

import React from 'react';
import "../../Styles/MenuAdmin.css"
import {
    Collapse,
    Navbar,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Logo from '../../Images/LogoITS2.JPG';
import Menu from '../../Images/menubarra2.png';
import Funcionalidad from '../../Images/funcionalidad.png'
class MenuAdmin extends React.Component {
    render() {
        return (
            <div class="container">
                <div class="cuerpo">
                    <header id="main-header">
                        <div class="cabeceraMenu">
                            <div class="sub1Menu">
                                <div class="btn-menu">
                                    <br></br><br></br>
                                    <label for="btn-menu"><img src={Menu} height="55" width="57" alt="Boton para abrir menu" /></label>
                                </div>
                                <div>
                                    <br></br>
                                    <img src={Logo} height="85" width="240" alt="Logo ITS" />
                                </div>
                            </div>

                            <div>
                                <Navbar color="light" light expand="md">
                                    <Collapse navbar>
                                        <Nav className="mr-auto" navbar>
                                            <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle nav caret>Mi perfil</DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem>Informacion personal</DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem href="/Logout">Cerrar Sesión</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav>
                                    </Collapse>
                                </Navbar>
                            </div>
                            <br></br>
                        </div>
                    </header>
                    <input type="checkbox" id="btn-menu"></input>
                    <div class="container-menu">
                        <div class="cont-menu" align="center">
                            <br></br><br></br>
                            <nav><h4>Tus funcionalidades</h4></nav>
                            <img src={Funcionalidad} height="60" width="60" alt="Funcionalidad" />
                            <nav>
                                <ul class="acorh">
                                    <li><a href="!#">Facturas</a>
                                        <ul>
                                            <li><a href="!#">Consultar</a></li>
                                            <li><a href="!#">Crear</a></li>
                                            <li><a href="!#">Anular</a></li>
                                        </ul>
                                    </li>

                                    <li><a href="!#">Clientes</a>
                                        <ul>
                                            <li><a href="/Menu/consultCustomers">Consultar</a></li>
                                            <li><a href="/Menu/createCustomers">Registrar</a></li>
                                            <li><a href="/Menu/updateordeleteC">Actualizar o dar de baja</a></li>
                                        </ul>
                                    </li>

                                    <li><a href="!#">Productos</a>
                                        <ul>
                                            <li><a href="/Menu/consultProducts">Consultar</a></li>
                                            <li><a href="/Menu/createProducts">Agregar</a></li>
                                            <li><a href="/Menu/updateordeleteP">Actualizar o sacar del mercado</a></li>
                                        </ul>
                                    </li>
                                    <li> <a href="!#">Usuarios</a>
                                        <ul>
                                            <li><a href="/Menu/consultUsers">Consultar</a></li>
                                            <li><a href="/Menu/createUser">Registrar</a></li>
                                            <li><a href="/Menu/updateordeleteU">Actualizar o dar de baja</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                <br></br><br></br>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default MenuAdmin;


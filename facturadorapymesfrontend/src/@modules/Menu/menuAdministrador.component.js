import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../@styles/styles.components.css";
import {
    Collapse,
    Navbar,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Logo from '../../@images/logoProyecto.png';
import Menu from '../../@images/iconoMenu.png';
import Funcionalidad from '../../@images/funcionalidad.png';


export default class MenuAdministrador extends React.Component{
    constructor() {
        super();
        this.state = {
          usuario: {
            id: "",
            nombre: "",
          },
        };
      }

      componentDidMount = async () => {
        this.consultarUsuarios();
      };
    
      consultarUsuarios = async () => {
        let informacionLocalStorage=JSON.parse(localStorage.getItem("user"));
        await this.setState({
            usuario: {
            id: informacionLocalStorage.id,
            nombre: informacionLocalStorage.nombre
          },
        });
      };

    render(){
        return (
            <div className="container">
                <div className="cuerpo">
                    <header id="main-header">
                        <div className="cabeceraMenu">
                            <div className="sub1Menu">
                                <div className="btn-menu" style={{ marginTop: "2.5%"}}>
                                    <label htmlFor="btn-menu"><img src={Menu} height="61" width="53" alt="Abrir menu"/></label>
                                </div>
                                <div style={{ marginTop: "1%", marginLeft:"3%"}}>
                                    <img src={Logo} height="95" width="265" alt="Logo ITS" />
                                </div>
                            </div>

                            <div style={{ marginTop: "15%"}}>
                                <Navbar color="light" light expand="md">
                                    <Collapse navbar>
                                        <Nav className="mr-auto" navbar>
                                            <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle nav caret>{this.state.usuario.nombre}</DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem href="/Logout">Cerrar Sesión</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav>
                                    </Collapse>
                                </Navbar>
                            </div>
                        </div>
                    </header>
                    <input type="checkbox" id="btn-menu"></input>
                    <div className="container-menu">
                        <div className="cont-menu" align="center">
                            <br/><br/>
                            <nav><h4>Tus funcionalidades</h4></nav>
                            <img src={Funcionalidad} height="80" width="80" alt="Funcionalidad" />
                            <nav>
                                <ul className="acorh">
                                    <li><a>Facturas</a>
                                        <ul>
                                            <li><a href="/Menu/consultarAnularFacturas">Consultar o Anular</a></li>
                                            <li><a href="/Menu/crearFacturas">Crear</a></li>
                                        </ul>
                                    </li>

                                    <li><a>Clientes</a>
                                        <ul>
                                            <li><a href="/Menu/consultarClientes">Consultar</a></li>
                                            <li><a href="/Menu/registrarClientes">Registrar</a></li>
                                            <li><a href="/Menu/actualizarEliminarClientes">Actualizar o dar de baja</a></li>
                                        </ul>
                                    </li>

                                    <li><a>Productos</a>
                                        <ul>
                                            <li><a href="/Menu/consultarProductos">Consultar</a></li>
                                            <li><a href="/Menu/registrarProductos">Agregar</a></li>
                                            <li><a href="/Menu/actualizarEliminarProductos">Actualizar o sacar del mercado</a></li>
                                        </ul>
                                    </li>
                                    <li> <a>Usuarios</a>
                                        <ul>
                                            <li><a href="/Menu/consultarUsuarios">Consultar</a></li>
                                            <li><a href="/Menu/registrarUsuarios">Registrar</a></li>
                                            <li><a href="/Menu/actualizarEliminarUsuarios">Actualizar o dar de baja</a></li>
                                        </ul>
                                    </li>
                                    <li> <a>Categorias</a>
                                    </li>
                                </ul>
                                <br/><br/>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
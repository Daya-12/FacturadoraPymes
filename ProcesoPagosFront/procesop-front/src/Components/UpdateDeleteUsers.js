import React from 'react';
import Logo from '../Images/LogoITS2-Sinfondo.png';
import actualizar from '../Images/actualizar.png';
import eliminar from '../Images/eliminar.jpg';
import Connection from "../Connection/Consume";
import { Table, Button, ModalBody, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import "../Styles/Actualizareliminar.css";
export default class UpdateDeleteUsers extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            users2: null,
            modalActualizar: false,
            form: {
                id: '',
                nombre: '',
                correo: '',
                telefono: '',
                nivel: '',
                tipoModal: ''
            }
        }
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    componentDidMount = async () => {
        let respuesta = null;
        respuesta = await Connection.consultar('user/consultar');
        this.setState({
            users: respuesta.data
        });

        let userActivo = JSON.parse(localStorage.getItem("user"));
        let indiceUser = this.state.users.findIndex(userAct => userAct.id === userActivo.id);
        this.state.users.splice(indiceUser, 1);

        this.setState({
            users2: this.state.users
        });


    }

    seleccionarUserEliminar = (user) => {
        this.setState({
            form: {
                id: user.id,
                nombre: user.nombre,
                correo: user.correo,
                telefono: user.telefono,
                nivel: user.nivel,
            }
        })
        this.confirmacion();
    }

    seleccionarUserActualizar = (user) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: user.id,
                nombre: user.nombre,
                correo: user.correo,
                telefono: user.telefono,
                nivel: user.nivel,
            }
        })
    }

    confirmacion = () => {
        Swal.fire({
            title: 'Dar de baja a usuarios',
            text: '¿Estas seguro de dar de baja al usuario seleccionado?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0D4C90',
            cancelButtonColor: '#973232',
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Si, proceder'
        }).then((result) => {
            if (result.value) {
                this.deleteUser();
            }
        })
    }

    deleteUser = async () => {
        let respuesta = null;
        respuesta = await Connection.dardeBaja('user/eliminar/' + this.state.form.id);
        if (respuesta) {
            Swal.fire({
                text: "El usuario ha sido eliminado con éxito",
                icon: "success",
                timer: "4000"
            })
            this.componentDidMount();
        }

    }

    validarEmail = () => {
        //eslint-disable-next-line
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(this.state.form.correo) && this.state.form.correo !== '') {
            return false;
        }
    }
    validarCampos = () => {
        if (this.state.form.correo === '' || this.state.form.telefono === '' || this.state.form.nivel === '') {
            return false;
        }
    }

    validarTelefono = () => {
        if(this.state.form.telefono.length<7 || this.state.form.telefono.length>10){
            return false;
        }
    }

    modalEditar = () => {
        this.setState({ modalActualizar: !this.state.modalActualizar });
    }

    ocultarModalEditar = () => {
        this.setState({ modalActualizar: false });
    }


    updateUser = async () => {
        if (this.validarCampos() === false) {
            Swal.fire({
                text: "¡Completa los campos vacios!",
                icon: "warning",
                timer: "4000"
            })
        }
        else if (this.validarEmail() === false) {
            Swal.fire({
                text: "¡Digita un correo valido!",
                icon: "warning",
                timer: "4000"
            })
        
        } 
        else if (this.validarTelefono() === false) {
            Swal.fire({
                text: "¡Digita un número telefónico valido!",
                icon: "warning",
                timer: "4000"
            })
        }
        else {

            let respuesta = null;
            respuesta = await Connection.actualizar('user/actualizar', this.state.form);
            if (respuesta) {
                Swal.fire({
                    text: "El usuario ha sido actualizado con éxito",
                    icon: "success",
                    timer: "4000"
                })
                this.ocultarModalEditar();
                this.componentDidMount();
            }
            else {
                Swal.fire({
                    text: "¡Otro usuario ya usa este correo electrónico, intentalo nuevamente!",
                    icon: "error",
                    timer: "5000"
                })
            }
        }
    }


    render() {
        let usuarios;
        if (this.state.users2 === null) {
            usuarios = [];
        } else {
            usuarios = this.state.users2;
        }
        let userstags = usuarios.map((user) => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.correo}</td>
                <td>{user.telefono}</td>
                <td>{user.nivel}</td>
                <td><button style={{outline:"0 none", border:"0"}} onClick={() => { this.seleccionarUserActualizar(user); this.modalEditar() }}><img height="33" width="32" src={actualizar} alt="actulizar"></img></button>{"  "}
                <button style={{outline:"0 none", border:"0"}} onClick={() => { this.seleccionarUserEliminar(user) }}><img height="33" width="32" src={eliminar} alt="eliminar"></img></button></td>
            </tr>
        ));
        return (
            <div>
                <div style={{
                    backgroundColor: "#B6B6B6"
                }}>
                    <img src={Logo} height="75" width="220" style={{
                        marginLeft: "30px",
                        marginTop: "20px"
                    }} alt="Logo ITS" />
                    <div style={{
                        color: "#03083E",
                        fontSize: "33px",
                        fontFamily: "Segoe UI",
                        textAlign: "center",
                        fontWeight: "bold",
                        marginTop: "5px"
                    }}><label>Actualizar o dar de baja usuarios registrados ITS</label></div>
                    <br />
                    <div style={{
                        color: "#000227",
                        fontSize: "14px",
                        fontFamily: "Segoe UI",
                        textAlign: "center",
                        fontWeight: "bold"
                    }}><label style={{ color: "red" }}>Ten en cuenta que:</label>
                        <br />
                        <label>• Solo puedes actualizar el correo electrónico,teléfono o nivel de los usuarios</label>
                        <br />
                        <label>• No puedes actualizar o eliminar tu propio usuario, por eso no te encuentras en la lista</label>
                    </div>

                    <div style={{
                        color: "#000227",
                        fontSize: "11px",
                        fontFamily: "Segoe UI",
                        textAlign: "left",
                        fontWeight: "bold",
                        marginLeft:"5px"
                    }}>
                        <label>• Niveles</label>
                        <br />
                        <label>0 - Permisos de administrador</label>
                        <br />
                        <label>1 - Permisos sobre facturas y clientes</label>
                    </div>

                </div>
                <br></br>
                <Table cellSpacing="10">
                    <tr align="center" textAlign="center">
                        <th scope="row">Identificador</th>
                        <th scope="row">Nombre</th>
                        <th scope="row">Correo electrónico</th>
                        <th scope="row">Teléfono</th>
                        <th scope="row">Nivel asignado</th>
                        <th colSpan="2">Acciones</th>
                    </tr>
                    <tbody align="center" textAlign="center">
                        {userstags}
                    </tbody>
                </Table>

                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader style={{ display: 'block' }} closeButton>
                        <Button color="danger" style={{ float: 'right' }} onClick={() => this.ocultarModalEditar()}>x</Button>
                        <img src={Logo} height="35" width="100" style={{
                            marginLeft: "10px",
                            marginTop: "10px"
                        }} alt="Logo ITS" />
                        <br></br><br></br>
                        <div id="titulo">
                            <label>Actualizar datos de {this.state.form.nombre}</label>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <form id="editar">
                            <br></br>
                            <label>Identificador: </label>
                            <input class="form-control" type="number" name="id" readOnly value={this.state.form.id} />
                            <br></br>
                            <label >Nombre: </label>
                            <input class="form-control" type="text" name="nombre" readOnly value={this.state.form.nombre} />
                            <br></br>
                            <label >Correo electrónico: </label>
                            <input autocomplete="off" class="form-control" type="email" name="correo" onChange={this.handleChange} value={this.state.form.correo} />
                            <br></br>
                            <label >Teléfono: </label>
                            <input autocomplete="off" class="form-control" type="number" name="telefono" onChange={this.handleChange} value={this.state.form.telefono} />
                            <br></br>
                            <label >Nivel: </label>
                            <select name='nivel' class="form-control" onChange={this.handleChange} value={this.state.form.nivel}>
                                <option>0</option>
                                <option>1</option>
                            </select>
                        </form>

                    </ModalBody>
                    <ModalFooter>
                        <div class="col text-center">
                            <Button outline color="primary" onClick={() => this.updateUser()}>Actualizar</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

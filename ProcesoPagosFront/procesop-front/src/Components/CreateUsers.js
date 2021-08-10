import React from 'react';
import { Button } from 'reactstrap';
import "../Styles/Registros.css"
import Avatar from '../Images/agregarUsu.png';
import Connection from "../Connection/Consume"
import Swal from 'sweetalert2'; 
import clean from '../Images/cleanForm.png';

export default class CreateUsers extends React.Component {
    constructor() {
        super();
        this.state = {
            form: {
                id: '',
                nombre: '',
                correo: '',
                pass: '',
                telefono: '',
                nivel: ''
            }
        }
    }

    cleanForm = () => {
        document.getElementById("crearUsuarios").reset();
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

    validarEmail = () => {
        //eslint-disable-next-line
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(this.state.form.correo) && this.state.form.correo !== '') {
            return false;
        }
    }
    validarCampos = () => {
        if (this.state.form.id === '' || this.state.form.nombre === '' || this.state.form.correo === ''
            || this.state.form.pass === '' || this.state.form.telefono === '' || this.state.form.nivel === '') {
            return false;
        }
    }

    setStateForm = () => {
        this.setState({
            form: {
                id: '',
                nombre: '',
                correo: '',
                pass: '',
                telefono: '',
                nivel: ''
            }
        });
    }

    validarTelefono = () => {
        if (this.state.form.telefono.length < 7 || this.state.form.telefono.length > 10) {
            return false;
        }
    }

    limpiarForm =()=>{
        this.cleanForm();
        this.setStateForm();
    }

    crearUsuario = async () => {
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
            respuesta = await Connection.registrar(this.state.form, 'user/registrar');
            if (respuesta === null) {
                Swal.fire({
                    text: "¡El usuario ya se encuentra registrado!",
                    icon: "error",
                    timer: "4000"
                })
            } else {
                Swal.fire({
                    text: "¡El usuario" + this.state.form.nombre + " ha sido registrado exitosamente!",
                    icon: "success",
                    timer: "4000"
                })
                setTimeout(function () { window.location.reload(1); }, 4000);
            }
            
        }
    }

    render() {
        return (
            <div class="container">
                <div class="principalReg">
                    <div class="row justify-content-center pt-5 mb-5 m-1">
                        <div class="col-md-5 formularioR">
                            
                            <div class="col-12" align="right">
                                <button style={{outline:"0 none", border:"0", backgroundColor: "rgb(223, 223, 223)"}} onClick={() => { this.limpiarForm() }}><img height="36" width="35" src={clean} alt="clean"></img></button>
                            </div>

                            <div class="col-12" align="center">
                                <img src={Avatar} height="110" width="110" alt="icono insertar"/>
                                <h2>Registrar usuarios</h2>
                                <br></br>
                            </div>
                            <form id="crearUsuarios">
                                <div class="form-group mx-sm-5">
                                    <input autocomplete="off" type="number" class="form-control" placeholder="Numero de identificación" name='id' onChange={this.handleChange} />
                                </div>
                                <div class="form-group mx-sm-5">
                                    <input autocomplete="off" type="text" class="form-control" placeholder="Nombres" name='nombre' onChange={this.handleChange} />
                                </div>
                                <div class="form-group mx-sm-5">
                                    <input autocomplete="off" type="email" class="form-control" placeholder="Correo" name='correo' onChange={this.handleChange} />
                                </div>
                                <div class="form-group mx-sm-5">
                                    <input autocomplete="off" type="password" class="form-control" placeholder="Contraseña" name='pass' onChange={this.handleChange} />
                                </div>
                                <div class="form-group mx-sm-5">
                                    <input autocomplete="off" type="number" class="form-control" placeholder="Telefono" name='telefono' onChange={this.handleChange} required />
                                </div>
                                <div class="form-group mx-sm-5">
                                    <select name='nivel' class="form-control" onChange={this.handleChange}>
                                        <option selected="true" disabled="disabled">Nivel de usuario</option>
                                        <option>0</option>
                                        <option>1</option>
                                    </select>
                                </div>
                                <br></br>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <br />
                                    </div>
                                    <div class="form-group col-md-4" align="center">
                                        <Button outline color="primary" size="lg" onClick={() => this.crearUsuario()}>REGISTRAR</Button>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <br />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

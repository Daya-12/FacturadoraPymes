import React from 'react';
import Avatar from '../Images/cliente2.png';
import "../Styles/Registros.css";
import { Button } from 'reactstrap';
import Connection from "../Connection/Consume"
import EnlazarProds from "./EnlazarProds"
import Swal from 'sweetalert2';
import persona from '../Images/logo.png';
import clean from '../Images/cleanForm.png';  

export default class CreateCustomers extends React.Component {
    constructor() {
        super();
        this.state = {
            productos: null,
            form: {
                idC: '',
                nombreDoc: '',
                numDoc: '',
                nombreC: '',
                apellidoC: '',
                direccionC: '',
                nombreCiudad: '',
                codPos: '',
                tel: '',
                email: '',
                nombreDC: ''
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

    validarCampos = () => {
        if (this.state.form.idC === '' || this.state.form.nombreDoc === '' || this.state.form.numDoc === '' || this.state.form.nombreC === ''
            || this.state.form.apellidoC === '' || this.state.form.direccionC === '' || this.state.form.nombreCiudad === ''
            || this.state.form.tel === '' || this.state.form.email === '' || this.state.form.codPos === '') {
            return false;
        }
    }

    cleanForm = () => {
        document.getElementById("crearClientes").reset();
    }

    validarEmail = () => {
        //eslint-disable-next-line
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(this.state.form.email) && this.state.form.email !== '') {
            return false;
        }
    }

    setStateForm = () => {
        this.setState({
            form: {
                idC: '',
                nombreDoc: '',
                numDoc: '',
                nombreC: '',
                apellidoC: '',
                direccionC: '',
                nombreCiudad: '',
                codPos: '',
                tel: '',
                email: ''
            }
        });
    }

    validarTelefono = () => {
        if (this.state.form.tel.length < 7 || this.state.form.tel.length > 10) {
            return false;
        }
    }

    desactivarElementos = () => {
        document.getElementById("id").readOnly = true;
        document.getElementById("doc").readOnly = true;
        document.getElementById("doc").disabled = true;
        document.getElementById("num").readOnly = true;
        document.getElementById("no").readOnly = true;
        document.getElementById("ap").readOnly = true;
        document.getElementById("ci").disabled = true;
        document.getElementById("dir").readOnly = true;
        document.getElementById("pos").readOnly = true;
        document.getElementById("te").readOnly = true;
        document.getElementById("em").readOnly = true;
        document.getElementById("boton").disabled = true;
        document.getElementById("enlazarProds").style.display = "block";
    }

    componentDidMount = async (productos) => {
        this.setState({
            productos: productos
        });
        if (this.state.productos != null) {
            document.getElementById("confirmarRegistro").style.display = "block";
        }
    }

    registrarCliente = async () => {
        let respuesta = null;
        const model = mapStateToModel(this.state.form, this.state.productos);
        respuesta = await Connection.registrar(model, 'cliente/agregar');
        if (respuesta != null) {
            Swal.fire({
                text: "¡El cliente " + this.state.form.nombreC + " ha sido registrado exitosamente con " + this.state.productos.length + " producto(s) seleccionado(s)!",
                icon: "success",
                timer: "4000"
            })
            document.getElementById("confirmarRegistro").style.display = "none";
            document.getElementById("enlazarProds").style.display = "none";
            setTimeout(function () { window.location.reload(1); }, 5000);

        }
    }

    limpiarForm = () => {
        this.cleanForm();
        this.setStateForm();
    }

    validarCliente = async () => {
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
            const model = mapStateToModel(this.state.form);
            respuesta = await Connection.validarCliente(model);
            if (respuesta === null) {
                Swal.fire({
                    text: "El cliente ya se encuentra registrado",
                    icon: "error",
                    timer: "4000"
                })
                this.cleanForm();
                this.setStateForm();
            } else {
                Swal.fire({
                    title: 'Confirmar registro de clientes',
                    text: '¿Deseas confirmar el cliente a registrar?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#0D4C90',
                    cancelButtonColor: '#973232',
                    cancelButtonText: 'No, cancelar',
                    confirmButtonText: 'Si, proceder'
                }).then((result) => {
                    if (result.value) {
                        this.desactivarElementos();
                    }
                })
            }
        }
    }

    render() {
        return (
            <div class="container">
                <div class="principalReg">
                    <div class="row justify-content-center pt-5 mb-5 m-1">
                        <div class="col-md-8 formularioR">

                            <div class="col-12" align="right">
                                <button style={{ outline: "0 none", border: "0", backgroundColor: "rgb(223, 223, 223)" }} onClick={() => { this.limpiarForm() }}><img height="36" width="35" src={clean} alt="clean"></img></button>
                            </div>

                            <div class="col-12" align="center">
                                <img src={Avatar} height="140" width="140" alt="icono insertar" />
                                <h2>Registrar nuevos clientes</h2>
                            </div>
                            <br></br>
                            <form id="crearClientes">
                                <div class="form-row">
                                    <div class="form-group col-md-3">
                                        <input autocomplete="off" type="number" class="form-control" placeholder="Ref.Cliente" id="id" name='idC' onChange={this.handleChange} />
                                    </div>

                                    <div class="form-group col-md-5">
                                        <select id="doc" name='nombreDoc' class="form-control" onChange={this.handleChange}>
                                            <option selected="true" disabled="disabled">Tipo de documento</option>
                                            <option>Cédula de ciudadanía</option>
                                            <option>Cédula de extranjería</option>
                                            <option>Pasaporte</option>
                                            <option>Número de identificación tributaria</option>
                                            <option>Registro único tributario</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <input autocomplete="off" type="number" class="form-control" placeholder="Número de documento" id="num" name='numDoc' onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <input autocomplete="off" type="text" class="form-control" placeholder="Nombres" id="no" name='nombreC' onChange={this.handleChange} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input autocomplete="off" type="text" class="form-control" placeholder="Apellidos" id="ap" name='apellidoC' onChange={this.handleChange} />
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-5">
                                        <select id="ci" name='nombreCiudad' class="form-control" onChange={this.handleChange}>
                                            <option selected="true" disabled="disabled">Ciudad</option>
                                            <option>Bogotá</option>
                                            <option>Cali</option>
                                            <option>Medellín</option>
                                            <option>Barranquilla</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <input autocomplete="off" type="text" class="form-control" placeholder="Dirección" id="dir" name='direccionC' onChange={this.handleChange} />
                                    </div>
                                    <div class="form-group col-md-3">
                                        <input autocomplete="off" type="number" class="form-control" placeholder="Cod.Postal" id="pos" name='codPos' onChange={this.handleChange} />
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <input autocomplete="off" type="number" class="form-control" placeholder="Teléfono " id="te" name='tel' onChange={this.handleChange} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input autocomplete="off" type="email" class="form-control" placeholder="Correo electrónico" id="em" name='email' onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-2">
                                    </div>
                                    <div class="form-group col-md-8" align="center">
                                        <Button id="boton" outline color="primary" size="lg" onClick={() => this.validarCliente()}>VALIDAR</Button>
                                    </div>
                                    <div class="form-group col-md-2">
                                    </div>
                                </div>
                                <section id="enlazarProds" style={{ display: 'none' }}>
                                    <EnlazarProds enviarProductos={this.componentDidMount} ></EnlazarProds>
                                </section>
                                <section id="confirmarRegistro" style={{ display: 'none' }}>
                                    <br></br><br></br>
                                    <div class="form-row">
                                        <div class="form-group col-md-2"></div>
                                        <div class="form-group col-md-8" align="center">
                                            <Button outline color="primary" size="lg" onClick={() => { this.registrarCliente() }}>REGISTRAR  <img height="45" width="48" src={persona} alt="registrar"></img></Button>
                                        </div>
                                        <div class="form-group col-md-2"></div>
                                    </div>
                                </section>
                            </form>
                        </div>
                    </div>
                    <br></br><br></br>
                </div>
            </div >
        );
    }
}


const mapStateToModel = function (formObject, listProds) {
    return {
        id: formObject.idC,
        documento: {
            nombre: formObject.nombreDoc
        },
        numeroDocumento: formObject.numDoc,
        nombres: formObject.nombreC,
        apellidos: formObject.apellidoC,
        direccion: formObject.direccionC,
        ciudad: {
            nombre: formObject.nombreCiudad
        },
        codpostal: formObject.codPos,
        telefono: formObject.tel,
        email: formObject.email,
        productos: listProds
    };
}
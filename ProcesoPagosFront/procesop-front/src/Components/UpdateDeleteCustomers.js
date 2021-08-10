import React from 'react';
import Connection from "../Connection/Consume"
import "../Styles/Actualizareliminar.css";
import Swal from 'sweetalert2';
import { Table, Button, ModalBody, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import actualizar from '../Images/actualizar.png';
import eliminar from '../Images/eliminar.jpg';
import Logo from '../Images/LogoITS2-Sinfondo.png';

export default class UpdateDeleteCustomers extends React.Component {
    constructor() {
        super();
        this.state = {
            customers: null,
            modalActualizar: false,
            productos: null,
            productosEnlazar: null,
            productos2:null,
            ciudadCliente:'',
            codPostalCliente:'',
            direccionCliente:'',
            form: {
                id: '',
                idTipoDocumento: '',
                nombreTipodocumento: '',
                numeroDocumento: '',
                nombres: '',
                apellidos: '',
                direccion: '',
                ciudad: '',
                codpostal: '',
                telefono: '',
                email: ''
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
        respuesta = await Connection.consultar('cliente/consultar');
        this.setState({
            customers: respuesta.data
        });
    }

    modalEditar = () => {
        this.setState({ modalActualizar: !this.state.modalActualizar });
    }

    ocultarModalEditar = () => {
        this.setState({ modalActualizar: false });
    }

    seleccionarCustomerAct = (customer) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: customer.id,
                idTipoDocumento: customer.documento.id,
                nombreTipodocumento: customer.documento.nombre,
                numeroDocumento: customer.numeroDocumento,
                nombres: customer.nombres,
                apellidos: customer.apellidos,
                direccion: customer.direccion,
                ciudad: customer.ciudad.nombre,
                codpostal: customer.codpostal,
                telefono: customer.telefono,
                email: customer.email
            },
            productosEnlazar: customer.productos,
            ciudadCliente: customer.ciudad.nombre,
            codPostalCliente: customer.codpostal,
            direccionCliente: customer.direccion
        });
        this.consultarProductos();
    }
    consultarProductos = async () => {
        let respuesta = null;
        respuesta = await Connection.consultar('producto/mostrar');
        this.setState({
            productos: respuesta.data
        });
        this.SProducts();
    }

    SProducts() {
        this.setState({
            productos: this.state.productos.map((p) => {
                return {
                    id: p.id,
                    nombre: p.nombre,
                    valor: p.valor,
                    categoria: p.categoria,
                    select: this.enlazarP(p.id)
                };
            })
        });
    }

    enlazarP(id) {
        let variable;
        let indiceProducto = this.state.productosEnlazar.findIndex(producto => producto.id === id);
        if (indiceProducto !== -1) {
            variable = true;
        }
        else {
            variable = false;
        }
        return variable;
    }

    validarEmail = () => {
        //eslint-disable-next-line
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(this.state.form.email) && this.state.form.email !== '') {
            return false;
        }
    }

    validarCampos = () => {
        if (this.state.form.direccion === '' || this.state.form.telefono === '' || this.state.form.email === '' || this.state.form.codpostal === '') {
            return false;
        }
    }

    validarTelefono = () => {
        if (this.state.form.telefono.length < 7 || this.state.form.telefono.length > 10) {
            return false;
        }
    }

    validarCambioCiudad = () => {
        if (this.state.form.ciudad!==this.state.ciudadCliente && this.state.direccionCliente===this.state.form.direccion) {
            return false;
        }
    }

    validarCodigoPostal = () => {
        if (this.state.form.codpostal!==this.state.codPostalCliente && this.state.direccionCliente===this.state.form.direccion) {
            return false;
        }
    }

    validarCambioCiudadCodPos = () => {
        if (this.state.form.ciudad!==this.state.ciudadCliente && this.state.direccionCliente!==this.state.form.direccion && this.state.form.codpostal===this.state.codPostalCliente) {
            return false;
        }
    }

    validarDatosIngresados = () => {
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

        else if (this.validarCambioCiudad() === false) {
            Swal.fire({
                text: "¡Si actualizas la ciudad debes actualizar la dirección del cliente!",
                icon: "warning",
                timer: "4000"
            })
        }

        else if (this.validarCambioCiudadCodPos() === false) {
            Swal.fire({
                text: "¡Si actualizas la ciudad y la dirección, debes actualizar el código postal del cliente!",
                icon: "warning",
                timer: "4000"
            })
        }

        else if (this.validarCodigoPostal() === false) {
            Swal.fire({
                text: "¡Si actualizas el código postal debes actualizar la dirección del cliente!",
                icon: "warning",
                timer: "4000"
            })
        }

        else {
            let validarSeleccion = Object.values(this.state.productos).filter(key => key.select === true);
            if (validarSeleccion.length === 0) {
                Swal.fire({
                    text: "¡Debes seleccionar por lo menos un producto!",
                    icon: "warning",
                    timer: "4000"
                })
            }
            else{
                Swal.fire({
                    title: 'Confirmar productos relacionados con el cliente',
                    text: '¿Confirmas los productos que están seleccionados para este cliente?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#0D4C90',
                    cancelButtonColor: '#973232',
                    cancelButtonText: 'No, cancelar',
                    confirmButtonText: 'Si, proceder'
                }).then((result) => {
                    if (result.value) {
                        let selectProds = Object.values(this.state.productos).filter(key => key.select === true);
                        this.setState({
                            productos2: selectProds.map((p) => {
                                return {
                                    id: p.id,
                                    nombre: p.nombre,
                                    valor: p.valor,
                                    categoria: p.categoria,
                                };
                            })
                        });
                        this.updateCustomer();
                    }
                })
            }            
        }
    }

    updateCustomer=async()=>{
        let respuesta = null;
        const model = mapStateToModel(this.state.form,this.state.productos2);
        respuesta = await Connection.actualizar('cliente/actualizar', model);
            if (respuesta) {
                Swal.fire({
                    text: "El cliente ha sido actualizado éxito",
                    icon: "success",
                    timer: "4000"
                })
                this.ocultarModalEditar();
                this.componentDidMount();
            }
            else {
                Swal.fire({
                    text: "¡Otro cliente ya se encuentra registrado con este e-mail, intentalo nuevamente!",
                    icon: "error",
                    timer: "5000"
                })
            }
    }

    seleccionarCustomerEliminar = (customer) => {
        this.setState({
            form: {
                id: customer.id,
                idTipoDocumento: customer.documento.id,
                nombreTipodocumento: customer.documento.nombre,
                numeroDocumento: customer.numeroDocumento,
                nombres: customer.nombres,
                apellidos: customer.apellidos,
                direccion: customer.direccion,
                ciudad: customer.ciudad.nombre,
                codpostal: customer.codpostal,
                telefono: customer.telefono,
                email: customer.email
            }
        })
        this.confirmacion();
    }

    confirmacion = () => {
        Swal.fire({
            title: 'Eliminar clientes',
            text: "¿Estas seguro de dar de baja al cliente seleccionado?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0D4C90',
            cancelButtonColor: '#973232',
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Si, proceder'
        }).then((result) => {
            if (result.value) {
                this.deleteCliente();
            }
        })
    }

    deleteCliente = async () => {
        let respuesta = null;
        respuesta = await Connection.dardeBaja('cliente/eliminar/' + this.state.form.id);
        console.log(respuesta);
        if (respuesta.data==="") {
            Swal.fire({
                text: "El cliente ha sido dado de baja con exito",
                icon: "success",
                timer: "4000"
            })
            this.componentDidMount();
        }
        if (respuesta.data!=="") {
            Swal.fire({
                text: "El cliente "+this.state.form.nombres+" "+this.state.form.apellidos+" no puede ser dado de baja, tiene un saldo pendiente de $"+respuesta.data+" por pagar en facturas",
                icon: "error",
                timer: "7000"
            })
            this.componentDidMount();
        }
    }

    render() {
        let clientes;
        if (this.state.customers === null) {
            clientes = [];
        } else {
            clientes = this.state.customers
        }
        let customerstags = clientes.map((customer) => (
            <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.nombres}</td>
                <td>{customer.apellidos}</td>
                <td>{customer.direccion}</td>
                <td>{customer.ciudad.nombre}</td>
                <td>{customer.telefono}</td>
                <td>{customer.email}</td>
                <td><button style={{ outline: "0 none", border: "0" }} onClick={() => { this.seleccionarCustomerAct(customer); this.modalEditar() }}><img height="33" width="32" src={actualizar} alt="actulizar"></img></button>{"  "}
                    <button style={{ outline: "0 none", border: "0" }} onClick={() => { this.seleccionarCustomerEliminar(customer) }}><img height="33" width="32" src={eliminar} alt="eliminar"></img></button></td>
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
                    }}><label>Actualizar o dar de baja clientes ITS</label></div>
                    <br />
                    <div style={{
                        color: "#000227",
                        fontSize: "14px",
                        fontFamily: "Segoe UI",
                        textAlign: "center",
                        fontWeight: "bold"
                    }}><label style={{ color: "red" }}>Ten en cuenta que:</label>
                        <br />
                        <label>• No puedes eliminar clientes que tengan saldos pendientes por cancelar</label>
                        <br />
                        <label>• Al actualizar la ciudad o el código postal, es necesario actualizar la dirección del cliente</label>
                        <br />
                        <label>• Puedes actualizar la dirección,ciudad,código postal,teléfono,e-mail o los productos relacionados con el cliente</label>
                        <br></br>
                    </div>
                </div>
                <br></br>
                <Table cellSpacing="10">
                    <tr align="center" textAlign="center">
                        <th scope="row">Ref.</th>
                        <th scope="row">Nombre</th>
                        <th scope="row">Apellidos</th>
                        <th scope="row">Dirección</th>
                        <th scope="row">Ciudad</th>
                        <th scope="row">Teléfono</th>
                        <th scope="row">E-mail</th>
                        <th colSpan="2">Acciones</th>
                    </tr>
                    <tbody align="center" textAlign="center">
                        {customerstags}
                    </tbody>
                </Table>

                <Modal isOpen={this.state.modalActualizar} size="lg" style={{ maxWidth: '1000px', width: '100%' }}>

                    <ModalHeader style={{ display: 'block' }} closeButton>
                        <Button color="danger" style={{ float: 'right' }} onClick={() => this.ocultarModalEditar()}>x</Button>
                        <img src={Logo} height="50" width="125" style={{
                            marginLeft: "10px",
                            marginTop: "10px"
                        }} alt="Logo ITS" />
                        <br></br><br></br>
                        <div id="titulo">
                            <label>Actualizar al cliente {this.state.form.nombres} {this.state.form.apellidos}</label>
                        </div>
                    </ModalHeader>

                    <ModalBody>

                        <form id="editar">

                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label>Identificador: </label>
                                    <input class="form-control" type="number" name="id" readOnly value={this.state.form.id} />
                                </div>

                                <div class="form-group col-md-4">
                                    <label>Tipo de documento: </label>
                                    <input class="form-control" type="text" name="nombreTipodocumento" readOnly value={this.state.form.nombreTipodocumento} />
                                </div>

                                <div class="form-group col-md-5">
                                    <label>Número de documento: </label>
                                    <input class="form-control" type="text" name="numeroDocumento" readOnly value={this.state.form.numeroDocumento} />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Nombres: </label>
                                    <input class="form-control" type="text" name="nombres" readOnly value={this.state.form.nombres} />
                                </div>
                                <div class="form-group col-md-6">
                                    <label>Apellidos: </label>
                                    <input class="form-control" type="text" name="apellidos" readOnly value={this.state.form.apellidos} />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label>Dirección: </label>
                                    <input autocomplete="off" class="form-control" type="text" name="direccion" onChange={this.handleChange} value={this.state.form.direccion} />
                                </div>

                                <div class="form-group col-md-5">
                                    <label >Ciudad: </label>
                                    <select class="form-control" name='ciudad' onChange={this.handleChange} value={this.state.form.ciudad}>
                                        <option>Bogotá</option>
                                        <option>Cali</option>
                                        <option>Medellín</option>
                                        <option>Barranquilla</option>
                                    </select>
                                </div>

                                <div class="form-group col-md-3">
                                    <label >Código postal: </label>
                                    <input autocomplete="off" class="form-control" type="text" name="codpostal" onChange={this.handleChange} value={this.state.form.codpostal} />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label >Teléfono: </label>
                                    <input autocomplete="off" class="form-control" type="text" name="telefono" onChange={this.handleChange} value={this.state.form.telefono} />
                                </div>
                                <div class="form-group col-md-6">
                                    <label >Correo electrónico: </label>
                                    <input autocomplete="off" class="form-control" type="email" name="email" onChange={this.handleChange} value={this.state.form.email} />
                                </div>
                            </div>
                            <br></br><br></br>
                            <section>
                                <h2 style={{ color: "rgb(18, 21, 61)", fontSize: "17px", fontFamily: "Segoe UI", textAlign: "center", fontWeight: "bold" }}> Productos relacionados con el cliente</h2>
                                <br></br>
                                <Table id="tablaProductos" striped>
                                    <tr align="center" textAlign="center">
                                        <th>Id</th>
                                        <th>Descripción</th>
                                        <th>Valor</th>
                                        <th>Categoria</th>
                                        <th>Marcar/desmarcar</th>
                                    </tr>

                                    <tbody align="center" textAlign="center">
                                        {
                                            this.state.productos && this.state.productos.map((pr) => (
                                                <tr key={pr.id}>
                                                    <td>{pr.id}</td>
                                                    <td>{pr.nombre}</td>
                                                    <td>{pr.valor}</td>
                                                    <td>{pr.categoria.nombre}</td>
                                                    <th scope="row"><input name="checkbox" onChange={(event) => {
                                                        let checked = event.target.checked;
                                                        this.setState({
                                                            productos: this.state.productos.map((p) => {
                                                                if (pr.id === p.id) {
                                                                    p.select = checked;
                                                                }
                                                                return p
                                                            })
                                                        });
                                                    }} type="checkbox" checked={pr.select} /></th>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </section>

                        </form>

                    </ModalBody>
                    <ModalFooter>
                        <div class="col text-center">
                            <Button outline color="primary" size="lg" onClick={() => this.validarDatosIngresados()}>Actualizar</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToModel = function (formObject, listProds) {
    return {
        id: formObject.id,
        documento: {
            id: formObject.idTipoDocumento,
            nombre: formObject.nombreTipodocumento
        },
        numeroDocumento: formObject.numeroDocumento,
        nombres: formObject.nombres,
        apellidos: formObject.apellidos,
        direccion: formObject.direccion,
        ciudad: {
            nombre: formObject.ciudad
        },
        codpostal: formObject.codpostal,
        telefono: formObject.telefono,
        email: formObject.email,
        productos: listProds
    };
}

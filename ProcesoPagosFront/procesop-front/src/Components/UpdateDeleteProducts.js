import React from 'react';
import Logo from '../Images/LogoITS2-Sinfondo.png';
import { Table, Button, ModalBody, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Connection from "../Connection/Consume";
import actualizar from '../Images/actualizarP.jpg';
import eliminar from '../Images/eliminar.jpg';
import "../Styles/Actualizareliminar.css";
import Swal from 'sweetalert2';
export default class UpdateDeleteProducts extends React.Component {
    constructor() {
        super();
        this.state = {
            products: null,
            modalActualizar: false,
            form: {
                id: '',
                nombre: '',
                valor: '',
                categoria: '',
            }
        }

    }

    validarCampos = () => {
        if (this.state.form.nombre === '' || this.state.form.valor === '') {
            return false;
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
        respuesta = await Connection.consultar('producto/mostrar');
        this.setState({
            products: respuesta.data
        });
    }

    modalEditar = () => {
        this.setState({ modalActualizar: !this.state.modalActualizar });
    }

    ocultarModalEditar = () => {
        this.setState({ modalActualizar: false });
    }


    seleccionarProdActualizar = (user) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: user.id,
                nombre: user.nombre,
                valor: user.valor,
                categoria: user.categoria.nombre
            }
        })
    }
    
    seleccionarProdEliminar = (user) => {
        this.setState({
            form: {
                id: user.id,
                nombre: user.nombre,
                valor: user.valor,
                categoria: user.categoria.nombre
            }
        })
        this.confirmacion();
    }

    confirmacion = () => {
        Swal.fire({
            title: 'Eliminar productos',
            text: '¿Estas seguro de sacar del mercado al producto seleccionado?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0D4C90',
            cancelButtonColor: '#973232',
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Si, proceder'
        }).then((result) => {
            if (result.value) {
                this.deleteProdc();
            }
        })
    }

    deleteProdc = async () => {
        let respuesta = null;
        respuesta = await Connection.dardeBaja('producto/eliminar/' + this.state.form.id);
        if (respuesta) {
            Swal.fire({
                text: "El producto ha sido eliminado del mercado con éxito",
                icon: "success",
                timer: "4000"
            })
            this.componentDidMount();
        }
        if (respuesta===null) {
            Swal.fire({
                text: "El producto no puede ser eliminado porque hay clientes usando este servicio",
                icon: "error",
                timer: "4000"
            })
            this.componentDidMount();
        }
    }


    updateProduct = async () => {
        if (this.validarCampos() === false) {
            Swal.fire({
                text: "¡Completa los campos vacios!",
                icon: "warning",
                timer: "4000"
            })
        }
        else {
            let respuesta = null;
            const model = mapStateToModel(this.state.form);
            respuesta = await Connection.actualizar('producto/actualizar', model);
            if (respuesta) {
                Swal.fire({
                    text: "El producto ha sido actualizado con éxito",
                    icon: "success",
                    timer: "4000"
                })
                this.ocultarModalEditar();
                this.componentDidMount();
            }
            else {
                Swal.fire({
                    text: "¡Otro producto ya tiene esta descripción, intentalo nuevamente!",
                    icon: "error",
                    timer: "5000"
                })
            }
        }
    }

    render() {
        let productos;
        if (this.state.products === null) {
            productos = [];
        } else {
            productos = this.state.products
        }

        let productstags = productos.map((product) => (
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td>{product.valor}</td>
                <td>{product.categoria.nombre}</td>
                <td><button style={{ outline: "0 none", border: "0" }} onClick={() => { this.seleccionarProdActualizar(product); this.modalEditar() }}><img height="33" width="32" src={actualizar} alt="actulizar"></img></button>{"  "}
                    <button style={{ outline: "0 none", border: "0" }} onClick={() => { this.seleccionarProdEliminar(product) }}><img height="33" width="32" src={eliminar} alt="eliminar"></img></button></td>
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
                    }}><label>Actualizar o sacar del mercado productos ITS</label></div>
                    <br />
                    <div style={{
                        color: "#000227",
                        fontSize: "14px",
                        fontFamily: "Segoe UI",
                        textAlign: "center",
                        fontWeight: "bold"
                    }}><label style={{ color: "red" }}>Ten en cuenta que:</label>
                        <br />
                        <label>• Puedes actualizar la descripción,el valor o la categoría de los productos</label>
                        <br />
                        <label>• No puedes eliminar productos que se encuentren relacionados con clientes</label>
                        <br />
                        <label>• Los clientes deben estar informados de los cambios realizados a los productos con los que esten relacionados</label>
                        <br></br>
                    </div>
                </div>
                <br></br>
                <Table cellSpacing="10">
                    <tr align="center" textAlign="center">
                        <th scope="row">Identificador</th>
                        <th scope="row">Descripción</th>
                        <th scope="row">Valor</th>
                        <th scope="row">Categoría</th>
                        <th colSpan="2">Acciones</th>
                    </tr>
                    <tbody align="center" textAlign="center">
                        {productstags}
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
                            <label>Actualizar producto N° {this.state.form.id}</label>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <form id="editar">
                            <br></br>
                            <label>Identificador: </label>
                            <input class="form-control" type="number" name="id" readOnly value={this.state.form.id} />
                            <br></br>
                            <label >Descripción: </label>
                            <textarea autocomplete="off" class="form-control" type="text" name="nombre" rows="3" cols="50" onChange={this.handleChange} value={this.state.form.nombre} />
                            <br></br>
                            <label >Valor: </label>
                            <input autocomplete="off" class="form-control" type="number" name="valor" onChange={this.handleChange} value={this.state.form.valor} />
                            <br></br>
                            <label >Categoría: </label>
                            <select name='categoria' class="form-control" onChange={this.handleChange} value={this.state.form.categoria}>
                                <option>Internet</option>
                                <option>Telefonía</option>
                                <option>Internet y Telefonía</option>
                            </select>
                            <br></br>
                        </form>

                    </ModalBody>
                    <ModalFooter>
                        <div class="col text-center">
                            <Button outline color="primary" onClick={() => this.updateProduct()}>Actualizar</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToModel = function (formObject) {
    return {
        id: formObject.id,
        nombre: formObject.nombre,
        valor: formObject.valor,
        categoria: {
            nombre: formObject.categoria
        }
    };
}
import React from 'react';
import Avatar from '../Images/agregarProd.png';
import "../Styles/Registros.css";
import { Button } from 'reactstrap';
import Connection from "../Connection/Consume"
import Swal from 'sweetalert2';  
import clean from '../Images/cleanForm.png'; 

export default class CreateProducts extends React.Component {
    constructor() {
        super();
        this.state = {
            form: {
                idProd: '',
                nombreProd: '',
                valorProd: '',
                nombreCategoriaProd: ''
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
        if (this.state.form.idProd === '' || this.state.form.nombreProd === '' || this.state.form.valorProd === '' || this.state.form.nombreCategoriaProd === '') {
            return false;
        }
    }

    setStateForm = () => {
        this.setState({
            form: {
                idProd: '',
                nombreProd: '',
                valorProd: '',
                idCategoriaProd: '',
                nombreCategoriaProd: ''
            }
        });
    }

    cleanForm = () => {
        document.getElementById("crearProductos").reset();
    }

    limpiarForm =()=>{
        this.cleanForm();
        this.setStateForm();
    }

    crearProducto = async () => {
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
            respuesta = await Connection.registrar(model, 'producto/registrar');
            if (respuesta === null) {
                Swal.fire({
                    text: "¡El producto ya se encuentra registrado!",
                    icon: "error",
                    timer: "4000"
                })

            } else {
                Swal.fire({
                    text: "¡El producto " + this.state.form.idProd + " ha sido registrado exitosamente!",
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

                            <br></br>
                            <div class="col-12" align="center">
                                <img src={Avatar} height="120" width="120" alt="icono insertar"/>
                                <h2>Agregar productos</h2>
                                <br></br>
                            </div>

                            <form id="crearProductos">
                                <div class="form-group mx-sm-5">
                                    <input autocomplete="off" type="number" class="form-control" placeholder="Ref. producto" name='idProd' onChange={this.handleChange} />
                                </div>
                                <div class="form-group mx-sm-5">
                                    <textarea class="form-control" placeholder="Descripción del producto" name='nombreProd' rows="3" cols="50" onChange={this.handleChange}></textarea>
                                </div>
                                <div class="form-group mx-sm-5">
                                    <input autocomplete="off" type="number" class="form-control" placeholder="Valor del producto" name='valorProd' onChange={this.handleChange} />
                                </div>

                                <div class="form-group mx-sm-5">
                                    <select name='nombreCategoriaProd' class="form-control" onChange={this.handleChange}>
                                        <option selected="true" disabled="disabled">Categoria del producto</option>
                                        <option>Internet</option>
                                        <option>Telefonía</option>
                                        <option>Internet y Telefonía</option>
                                    </select>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <br />
                                    </div>
                                    <div class="form-group col-md-4" align="center">
                                        <Button outline color="primary" size="lg" onClick={() => this.crearProducto()}>AGREGAR</Button>
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
const mapStateToModel = function (formObject) {
    return {
        id: formObject.idProd,
        nombre: formObject.nombreProd,
        valor: formObject.valorProd,
        categoria: {
            nombre: formObject.nombreCategoriaProd
        }
    };
}

import React from 'react';
import Connection from "../Connection/Consume"
import { Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';

export default class EnlazarProds extends React.Component {
    constructor(props) {
        super(props);
        this.enviarProductos = props.enviarProductos;
        this.state = {
            productos: null,
            productosEnlazar: null
        }
    }


    componentDidMount = async () => {
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
                    select: false
                };
            })
        });
    }
    confirmarP() {
        let validarSeleccion = Object.values(this.state.productos).filter(key => key.select === true);
        if (validarSeleccion.length===0) {
            Swal.fire({
                text: "¡Debes seleccionar por lo menos un producto!",
                icon: "warning",
                timer: "4000"
            })
        }
        else {
            Swal.fire({
                title: 'Confirmar productos a enlazar',
                text: '¿Realmente deseas confirmar los productos seleccionados?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#0D4C90',
                cancelButtonColor: '#973232',
                cancelButtonText: 'No, cancelar',
                confirmButtonText: 'Si, proceder'
            }).then((result) => {
                if (result.value) {
                    let inputs = document.getElementsByName("checkbox");
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].disabled = true;
                    }
                    document.getElementById("btnEnlazar").disabled = true;
                    this.Productos();
                }
            })
        }
    }

    Productos() {
        let selectProds = Object.values(this.state.productos).filter(key => key.select === true);
        this.setState({
            productosEnlazar: selectProds.map((p) => {
                return {
                    id: p.id,
                    nombre: p.nombre,
                    valor: p.valor,
                    categoria: p.categoria,
                };
            })
        });
        this.enviarProductos(this.state.productosEnlazar);
    }

    render() {
        return (
            <div >
                <br></br>
                <h4>Enlazar productos al cliente</h4>
                <br></br>
                <Table id="tablaProductos" striped>
                    <tr align="center" textAlign="center">
                        <th>Id</th>
                        <th>Descripción</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Seleccionar</th>
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
                <div align="right">
                    <Button id="btnEnlazar" outline color="info" size="sm" onClick={() => this.confirmarP()}>CONFIRMAR PRODUCTOS</Button>
                </div>
            </div>
        );
    }
};


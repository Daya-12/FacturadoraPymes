import React from "react";
import service from "./consultaRelacion.service";
import { Table, Button } from "reactstrap";
import Swal from "sweetalert2";
export default class ConsultaRelacion extends React.Component {
  constructor(props) {
    super(props);
    this.enviarCategorias = props.enviarCategorias;
    this.state = {
      categorias: null,
      categoriasEnlazar: null,
    };
  }

  componentDidMount = async () => {
    this.consultarCategorias();
    this.setStateModel();
  };

  consultarCategorias = async () => {
    let respuesta = null;
    respuesta = await service.consultarCategorias();
    this.setState({
      categorias: respuesta.data,
    });
  };

  setStateModel() {
    if(this.state.categorias!=null){
    this.setState({
        categorias: this.state.categorias.map((p) => {
            return {
                id: p.id,
                nombre: p.nombre,
                activo: p.activo,
                select: false
            };
        })
    });
}
}

confirmarCategorias() {
    let validarSeleccion = Object.values(this.state.categorias).filter(key => key.select === true);
    if (validarSeleccion.length===0) {
        Swal.fire({
            text: "¡Debes seleccionar por lo menos una categoria!",
            icon: "warning",
            timer: "4000"
        })
    }
    else {
        Swal.fire({
            title: 'Confirmar categorias',
            text: '¿Realmente deseas confirmar las categorias seleccionadas?',
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
                this.categorias();
            }
        })
    }
}

categorias() {
    let selectCategorias = Object.values(this.state.categorias).filter(key => key.select === true);
    this.setState({
        categoriasEnlazar: selectCategorias.map((p) => {
            return {
                id: p.id,
                nombre: p.nombre,
                activo: p.activo
            };
        })
    });
    this.enviarCategorias(this.state.categoriasEnlazar);
}
render() {
    return (
        <div >
            <br></br>
            <h4>¡Selecciona la(s) categoria(s) de productos que maneja tu pyme!</h4>
            <br></br>
            <Table id="tablaCategorias" className="tableCategoria" striped>
            <thead>
                <tr align="center">
                    <th>Item</th>
                    <th>Nombre</th>
                    <th>Seleccionar</th>
                </tr>
            </thead>
                <tbody align="center">
                    {
                        this.state.categorias && this.state.categorias.map((ct) => (
                            <tr key={ct.id}>
                                <td>{ct.id}</td>
                                <td>{ct.nombre}</td>
                                <th scope="row"><input name="checkbox" onChange={(event) => {
                                    let checked = event.target.checked;
                                    this.setState({
                                        categorias: this.state.categorias.map((c) => {
                                            if (ct.id === c.id) {
                                                c.select = checked;
                                            }
                                            return c
                                        })
                                    });
                                }} type="checkbox" checked={ct.select || false}/></th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div align="right">
                <Button id="btnEnlazar" outline color="primary" size="sm" onClick={() => this.confirmarCategorias()}>Confirmar categorias</Button>
            </div>
        </div>
    );
}
}

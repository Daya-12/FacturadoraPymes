import React from "react";
import service from "./consultaRelacion.service";
import { Table, Button } from "reactstrap";
import Swal from "sweetalert2";
export default class EditarCategorias extends React.Component {
  constructor() {
    super();
    this.state = {
      button: false,
      categoriasEnlazar: [],
      categorias: [],
      categorias2:[],
      empresa: {
        id: "",
        razonSocial: "",
      },
    };
  }

  componentDidMount = async () => {
    this.consultarEmpresa();
  };

  consultarEmpresa = async () => {
    let informacionLocalStorage = JSON.parse(localStorage.getItem("user"));
    await this.setState({
      empresa: {
        id: informacionLocalStorage.empresa.id,
        razonSocial: informacionLocalStorage.empresa.razonSocial,
      },
    });
    await this.consultarCategorias();
    await this.consultarCategoriasPersonalizado();
  };

  consultarCategorias = async () => {
    let respuesta = null;
    respuesta = await service.consultarCategorias();
    await this.setState({
      categorias: respuesta.data,
    });
  };

  consultarCategoriasPersonalizado = async () => {
    let respuesta = null;
    respuesta = await service.consultarCategoriasPersonalizado(
      this.state.empresa.id
    );
    await this.setState({
      categoriasEnlazar: respuesta.data,
    });
    await this.SCategorias();
  };

  SCategorias= async () => {
    await this.setState({
      categorias: this.state.categorias.map((c) => {
        return {
          id: c.id,
          nombre: c.nombre,
          activo: c.activo,
          select: this.enlazarCategorias(c.id),
        };
      }),
    });
  }

  enlazarCategorias(id) {
    let variable;
    let indiceCategoria = this.state.categoriasEnlazar.findIndex(
      (categoria) => categoria.id === id
    );
    if (indiceCategoria !== -1) {
      variable = true;
    } else {
      variable = false;
    }
    return variable;
  }

  editarCategorias = async () => {
    let validarSeleccion = Object.values(this.state.categorias).filter(key => key.select === true);
    if (validarSeleccion.length === 0) {
        Swal.fire({
            text: "¡Debes seleccionar por lo menos una categoria!",
            icon: "warning",
            timer: "3000"
        })
    }
    else{
        Swal.fire({
            title: 'Confirmar categorias',
            text: '¿Confirmas las categorias que seleccionaste para la pyme?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0D4C90',
            cancelButtonColor: '#973232',
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Si, proceder'
        }).then((result) => {
            if (result.value) {
                let categoriasSeleccionadas = Object.values(this.state.categorias).filter(key => key.select === true);
                this.setState({
                    categorias2: categoriasSeleccionadas.map((c) => {
                        return {
                            id: c.id,
                            nombre: c.nombre,
                            activo: c.activo
                        };
                    })
                });
                this.actualizarFinal();
            }
        })
    }
};

actualizarFinal = async () => {
    let respuesta = null;
    const model = mapStateToModel(this.state.empresa,this.state.categorias2);
    respuesta = await service.actualizar(model);
    if(respuesta !== null){
      if(respuesta.data==0){
        Swal.fire({
          text: "¡Las categorias fueron actualizadas correctamente!",
          icon: "success",
          timer: "4000"
      })
      }
      if(respuesta.data==1){
        Swal.fire({
          text: "¡Las categorias fueron actualizadas correctamente, algunas no fueron actualizadas debido a que hay productos que las usan!",
          icon: "warning",
          timer: "4000"
      })
      }
      setTimeout(function () { window.location.reload(1); }, 4000);
      }else{
      Swal.fire({
          text: "Uppss! Las categorias no pudieron ser actualizadas",
          icon: "error",
          timer: "3000"
      })
      setTimeout(function () { window.location.reload(1); }, 3000);
    }
};

  render() {
    return (
      <div className="container">
        <div className="facturasFondo">
          <div
            id="formFactura"
            className="mx-auto"
            style={{ width: "80%", marginTop: "5%" }}
          >
              <h3
                  style={{
                    fontSize: "20px",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                    color: "#09065A",
                    marginBottom: "1%"
                  }}
                >
                  Actualización de categorias para {this.state.empresa.razonSocial}
                </h3>
            <Table id="tablaCategorias" className="tableCategoria" striped>
              <thead>
                <tr align="center" textAlign="center">
                  <th>Item</th>
                  <th>Nombre</th>
                  <th>Marcar/Desmarcar</th>
                </tr>
              </thead>

              <tbody align="center" textalign="center">
                {this.state.categorias &&
                  this.state.categorias.map((pr) => (
                    <tr key={pr.id}>
                      <td>{pr.id}</td>
                      <td>{pr.nombre}</td>
                      <th scope="row">
                        <input
                          name="checkbox"
                          onChange={(event) => {
                            let checked = event.target.checked;
                            this.setState({
                              categorias: this.state.categorias.map((p) => {
                                if (pr.id === p.id) {
                                  p.select = checked;
                                }
                                return p;
                              }),
                            });
                          }}
                          type="checkbox"
                          checked={pr.select}
                        />
                      </th>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div align="center">
              <Button
                id="botonValidar"
                size="lg"
                outline
                color="primary"
                onClick={() => this.editarCategorias()}
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToModel = function (empresa, lista) {
    return {
        id: empresa.id,
        categorias: lista
    };
  }
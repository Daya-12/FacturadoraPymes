import React from "react";
import service from "./producto.service";
import Swal from "sweetalert2";
export default class RegistroProducto extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        nombre: "",
        valor: 0,
        categoria: null,
      },
      button: false,
      categorias: [],
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
    let informacionLocalStorage=JSON.parse(localStorage.getItem("user"));
    await this.setState({
      empresa: {
        id: informacionLocalStorage.empresa.id,
        razonSocial: informacionLocalStorage.empresa.razonSocial
      },
    });
    this.consultarCategorias();
  };

  consultarCategorias = async () => {
    let respuesta = null;
    respuesta = await service.consultarCategorias(this.state.empresa.id);
    this.setState({
      categorias: respuesta.data,
    });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    this.validarCampos();
  };

  validarCampos = () => {
    if (
      this.state.form.nombre === "" ||
      (this.state.form.nombre !== undefined &&
        this.state.form.nombre.length < 4) ||
      (this.state.form.nombre !== undefined &&
        this.state.form.nombre.length > 100) ||
      this.state.form.valor === "" ||
      (this.state.form.valor !== undefined &&
        this.state.form.valor.length < 3) ||
      (this.state.form.telefono !== undefined &&
        this.state.form.telefono.length > 8) ||
        this.state.form.categoria === null
    ) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  cleanForm = () => {
    this.setState({
      form: {
        nombre: "",
        valor: 0,
        categoria: null
      },
    });
  };

  onBlurNombre = async () => {
    if (this.state.form.nombre !== "" && this.validarNombre()!=false) {
      let respuesta = null;
      respuesta = await service.validarNombre(this.state.form.nombre);
      if (respuesta !== null) {
        if (respuesta.data === true) {
          Swal.fire({
            text: "Ya existe un producto con el nombre ingresado",
            icon: "error",
            timer: "4000",
          });

          this.setState({
            form: {
              nombre: "",
              valor: this.state.form.valor,
              categoria: this.state.form.categoria
            },
          });
          this.validarCampos();
        }
      }
    }
  };

  confirmarProducto() {
    Swal.fire({
      title: "Confirmar producto",
      text: "¿Realmente deseas confirmar los datos del producto a registrar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D4C90",
      cancelButtonColor: "#973232",
      cancelButtonText: "No, cancelar",
      confirmButtonText: "Si, proceder",
    }).then((result) => {
      if (result.value) {
        //this.registrar();
      }
    });
  }
  
  render() {
    return (
      <div className="container">
        <div className="productosFondo">

        </div>
      </div>
    );
  }
}

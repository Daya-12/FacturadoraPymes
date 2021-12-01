import React from "react";
import logo from "../../@images/logoProyecto.png";
import actualizar from "../../@images/actualizar.png";
import eliminar from "../../@images/eliminar.png";
import service from "./usuario.service";
import { Table, Button, ModalBody, Modal, ModalHeader, ModalFooter } from 'reactstrap';

export default class ActualizarEliminarUsuarios extends React.Component {
  constructor() {
    super();
    this.state = {
      usuarios: null,
      modalActualizar: false,
      form: {
        nombre: "",
        correo: "",
        pass: "",
        telefono: "",
        nivel: null,
        tipoModal: "",
      },
      button: false,
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
    console.log(informacionLocalStorage);
    await this.setState({
      empresa: {
        id: informacionLocalStorage.id_empresa,
        razonSocial: informacionLocalStorage.nombre_empresa,
      },
    });
    this.consultarUsuarios();
  };

  consultarUsuarios = async () => {
    let respuesta = null;
    let users=[];
    console.log(this.state.empresa.id);
    respuesta = await service.consultarUsuarios(this.state.empresa.id);
    if (respuesta !== null) {
      users = respuesta.data;
      console.log(respuesta.data);
      let userActivo = JSON.parse(localStorage.getItem("user"));
      let indiceUser = users.findIndex(
        (userAct) => userAct.id === userActivo.id
      );
      users.splice(indiceUser, 1);
      this.setState({
        usuarios: users,
      });
    }
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  abrirModalEditar = () => {
    this.setState({ modalActualizar: !this.state.modalActualizar });
  };

  ocultarModalEditar = () => {
    this.setState({ modalActualizar: false });
  };
  render() {
    let usuarios;
    if (this.state.usuarios === null) {
      usuarios = [];
    } else {
      usuarios = this.state.usuarios;
    }
    let userstags = usuarios.map((user) => (
      <tr key={user.id}>
        <td>{user.nombre}</td>
        <td>{user.correo}</td>
        <td>{user.telefono}</td>
        <td>{user.nivel}</td>
        <td>
          <button
            style={{
              outline: "0 none",
              border: "0",
              backgroundColor: "rgba(167, 167, 187, 0.534)",
              borderRadius: "50%",
            }}
            onClick={() => {
              this.seleccionarUserActualizar(user);
              this.modalEditar();
            }}
          >
            <img height="33" width="32" src={actualizar} alt="actulizar"></img>
          </button>
          {"  "}
          <button
            style={{
              outline: "0 none",
              border: "0",
              backgroundColor: "rgba(167, 167, 187, 0.534)",
              borderRadius: "50%",
            }}
            onClick={() => {
              this.seleccionarUserEliminar(user);
            }}
          >
            <img height="33" width="32" src={eliminar} alt="eliminar"></img>
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="container">
        <div className="actualizaciones">
          <div id="cabecera" className="row justify-content-center pt-6 mb-6 m-0 mt-0">
            <div>
                <img
                src={logo}
                height="85"
                width="240"
                alt="Logo"
                />
            </div>
            <div
              style={{
                color: "#03083E",
                fontSize: "25px",
                fontFamily: "Segoe UI",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              <label>
                Actualizar o dar de baja usuarios registrados para{" "}
                {this.state.empresa.razonSocial}
              </label>
            </div>
            <div
              style={{
                marginTop: "0.3%",
                color: "#000227",
                fontSize: "13px",
                fontFamily: "Segoe UI",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <label style={{ color: "red" }}>Ten en cuenta que:</label>
              <br />
              <label>
                • Solo puedes actualizar el correo electrónico,teléfono o permisos
                de los usuarios
              </label>
              <br />
              <label>
                • No puedes actualizar o eliminar tu propio usuario, por eso no
                te encuentras en la lista
              </label>
              <br />
              <label>
                • Los usuarios se encuentra ordenados por el nombre de manera ascendente
              </label>
            </div>
          </div>
          <br/>

          <div className="row justify-content-center pt-6 mb-6 m-2 mt-1">
          <Table cellSpacing="10" className="tableRegistros" striped>
                    <tr align="center" textAlign="center">
                        <th scope="row">Nombre</th>
                        <th scope="row">Correo electrónico</th>
                        <th scope="row">Teléfono</th>
                        <th scope="row">Permisos</th>
                        <th colSpan="2">Acciones</th>
                    </tr>
                    <tbody className="bodyTable" align="center" textAlign="center">
                        {userstags}
                    </tbody>
                </Table>
                </div>
        </div>
      </div>
    );
  }
}

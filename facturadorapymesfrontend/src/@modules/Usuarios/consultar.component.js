import React from "react";
import logo from "../../@images/logoProyecto.png";
import DataTable from "react-data-table-component";
import service from "./usuario.service";
export default class ConsultarUsuarios extends React.Component {
  constructor() {
    super();
    this.state = {
      usuarios: [],
      usuarios2: [],
      busqueda: "",
      users: [],
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
    this.consultarUsuarios();
  };

  consultarUsuarios = async () => {
    let respuesta = null;
    respuesta = await service.consultaPersonalizada(this.state.empresa.id);
    this.setState({
      usuarios: respuesta.data,
    });

    this.setState({
      usuarios2: this.state.usuarios.map((user) => {
        return {
          id: user.id,
          nombre: user.nombre,
          correo: user.correo,
          telefono: user.telefono,
          nivel: user.nivel,
          facturas: user.facturas,
        };
      }),
    });
  };

  onChange = async (e) => {
    e.persist();
    await this.setState({ busqueda: e.target.value });
    this.filtrarElementos();
  };

  filtrarElementos = () => {
    var search = this.state.usuarios2.filter((item) => {
      if (
        item.id.toString().includes(this.state.busqueda) ||
        item.nombre
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(this.state.busqueda) ||
        item.nombre
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(this.state.busqueda) ||
        item.correo.toLowerCase().includes(this.state.busqueda) ||
        item.correo.toUpperCase().includes(this.state.busqueda) ||
        item.telefono.toString().includes(this.state.busqueda) ||
        item.nivel.toLowerCase().includes(this.state.busqueda) ||
        item.nivel.toUpperCase().includes(this.state.busqueda)
      ) {
        return item;
      }
      return null;
    });
    this.setState({ users: search });
  };

  render() {
    const columnas = [
      {
        name: "Nombre",
        selector: "nombre",
        sortable: true,
      },
      {
        name: "E-mail",
        selector: "correo",
        sortable: true,
      },
      {
        name: "Teléfono",
        selector: "telefono",
        sortable: true,
      },
      {
        name: "Nivel",
        selector: "nivel",
        sortable: true,
      },
      {
        name: "Facturaciones realizadas",
        selector: "facturas",
        sortable: true,
      },
    ];
    const paginacionOpc = {
      rowsPerPageText: "Filas por página",
      rangeSeparatorText: "de",
      selectAllRowsItem: true,
      selectAllRowsItemText: "Todos",
    };
    return (
      <div className="container">
        <div className="actualizaciones">
          <div
            id="cabecera"
            className="row justify-content-center pt-6 mb-6 m-0 mt-0"
          >
            <div>
              <img src={logo} height="85" width="240" alt="Logo" />
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
                Usuarios registrados en estado activo para{" "}
                {this.state.empresa.razonSocial}
              </label>
            </div>
            <div
              style={{
                color: "#000227",
                fontSize: "14px",
                fontFamily: "Segoe UI",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <label>
                Puedes consultar a traves del identificador,el nombre,
                e-mail,teléfono y nivel
              </label>
            </div>

            <div id="barraBusqueda">
              <div align="center"
                style={{
                  marginTop:"2%",
                  width: "100%"
                }}
              >
                <input
                  className="form-control"
                  autoComplete="off"
                  type="text"
                  placeholder="🔍 Buscar"
                  name="Busqueda"
                  value={this.state.busqueda}
                  onChange={this.onChange}
                />
              </div>
              <div
                align="right"
                id="barraBusquedahijo"
                style={{
                  color: "#000227",
                  fontSize: "10px",
                  fontFamily: "Segoe UI",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                <label>Color de filas según número de facts. realizadas</label>
                <br />
                <label>0 🔴</label>
                <br />
                <label>1-5 🟠</label>
                <br />
                <label>5-10 🟡</label>
                <br />
                <label>10+ 🟢</label>
              </div>
            </div>
          </div>

          <div className="tablaFiltrada">
            <DataTable
              columns={columnas}
              data={this.state.users}
              title="Usuarios registrados"
              pagination
              paginationComponentOptions={paginacionOpc}
              fixedHeader
              fixedHeaderScrollHeight="100%"
              noDataComponent={<span>No se encontró ningún registro</span>}
              customStyles={customStyles}
              conditionalRowStyles={conditionalRowStyles}
            />
          </div>
        </div>
      </div>
    );
  }
}

const customStyles = {
  backgroundColor: "red",
  title: {
    style: {
      fontColor: "red",
      fontWeight: "900",
    },
  },
  headCells: {
    style: {
      fontSize: "15px",
      color: "#03083E",
      fontFamily: "Segoe UI",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      fontFamily: "Segoe UI",
    },
  },
};

const conditionalRowStyles = [
  {
    when: (row) => row.facturas === 0,
    style: {
      backgroundColor: "rgba(172, 27, 27, 0.274)",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.facturas >= 1 && row.facturas <= 5,
    style: {
      backgroundColor: "rgba(202, 97, 27, 0.301)",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.facturas >= 5 && row.facturas <= 10,
    style: {
      backgroundColor: "rgba(196, 184, 23, 0.26)",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.facturas >= 10,
    style: {
      backgroundColor: "rgba(35, 180, 35, 0.185)",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
];

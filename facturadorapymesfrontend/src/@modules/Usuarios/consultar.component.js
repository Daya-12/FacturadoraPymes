import React from "react";
import logo from "../../@images/logoProyecto.png";
import DataTable from "react-data-table-component";
import service from "./usuario.service";
import ExportExcel from "react-export-excel";
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
        item.nombre
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(this.state.busqueda.toLowerCase()) ||
        item.nombre
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(this.state.busqueda.toUpperCase()) ||
        item.correo.toLowerCase().includes(this.state.busqueda.toLowerCase()) ||
        item.correo.toUpperCase().includes(this.state.busqueda.toUpperCase()) ||
        item.telefono.toString().includes(this.state.busqueda) ||
        item.nivel.toLowerCase().includes(this.state.busqueda.toLowerCase()) ||
        item.nivel.toUpperCase().includes(this.state.busqueda.toUpperCase())
      ) {
        return item;
      }
      return null;
    });
    this.setState({ users: search });
  };

  render() {
    const ExcelFile = ExportExcel.ExcelFile;
    const ExcelSheet = ExportExcel.ExcelShet;
    const ExcelColumn = ExportExcel.ExcelColumn;
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
        name: "Facturas realizadas",
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
                Usuarios registrados para {this.state.empresa.razonSocial}
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
                Puedes consultar a traves del nombre, e-mail,teléfono y permiso
                otorgado
              </label>
            </div>

            <div>
            <div
                align="left"
                className="subCuerpo1"
                style={{
                  color: "#000227",
                  fontSize: "10px",
                  fontFamily: "Segoe UI",
                  textAlign: "left",
                  fontWeight: "bold"
                }}
              >
                <ExcelFile
                  element={
                    <button type="button" className="btn btn-success">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-file-excel"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.18 4.616a.5.5 0 0 1 .704.064L8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 0 1 .064-.704z" />
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                      </svg>
                    </button>
                  }
                  filename={"Usuarios " + this.state.empresa.razonSocial}
                >
                  <ExcelSheet data={this.state.usuarios} name="Usuarios">
                    <ExcelColumn label="Nombre" value="nombre" />
                    <ExcelColumn label="E-mail" value="correo" />
                    <ExcelColumn label="Teléfono" value="telefono" />
                    <ExcelColumn label="Nivel" value="nivel" />
                    <ExcelColumn label="Facturas realizadas" value="facturas" />
                  </ExcelSheet>
                </ExcelFile>
              </div>
              <div
                id="barraBusqueda"
                className="subCuerpo2"
                style={{
                  marginTop: "2%"
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
                className="subCuerpo3"
                style={{
                  color: "#000227",
                  fontSize: "10px",
                  fontFamily: "Segoe UI",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                <label>Color de filas según número de facts. realizadas</label>
                <label>0 🔴</label>
                &nbsp;&nbsp;&nbsp;
                <label>1-5 🟠</label>
                &nbsp;&nbsp;&nbsp;
                <label>5-10 🟡</label>
                &nbsp;&nbsp;&nbsp;
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
              defaultSortField="nombre"
              defaultSortAsc={true}
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
      backgroundColor: "#ff8480",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.facturas >= 1 && row.facturas <= 5,
    style: {
      backgroundColor: "#ffb071",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.facturas >= 5 && row.facturas <= 10,
    style: {
      backgroundColor: "#ffee71",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  {
    when: (row) => row.facturas >= 10,
    style: {
      backgroundColor: "#96ff71",
      color: "black",
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
];

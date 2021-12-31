import React from "react";
import logo from "../../@images/logoProyecto.png";
import DataTable from "react-data-table-component";
import service from "./cliente.service";

export default class ConsultarProductos extends React.Component {
  constructor() {
    super();
    this.state = {
      clientes: [],
      clientes2: [],
      busqueda: "",
      clients: [],
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
    this.consultarClientes();
  };

  consultarClientes = async () => {
    let respuesta = null;
    respuesta = await service.consultaPersonalizada(this.state.empresa.id);
    this.setState({
      clientes: respuesta.data,
    });

    this.setState({
      clientes2: this.state.clientes.map((cliente) => {
        return {
          nombre: cliente.nombre,
          tipoDocumento: cliente.nombre_tdocumento,
          num_documento: cliente.num_documento,
          direccion: cliente.direccion,
          codPostal: cliente.codPostal,
          nombre_ciudad: cliente.nombre_ciudad,
          telefono: cliente.telefono,
          valorFacturado: cliente.valorFacturado,
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
    var search = this.state.clientes2.filter((item) => {
      if (
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
        item.tipoDocumento.toLowerCase().includes(this.state.busqueda) ||
        item.tipoDocumento.toUpperCase().includes(this.state.busqueda) ||
        item.num_documento.toString().includes(this.state.busqueda) ||
        item.direccion.toLowerCase().includes(this.state.busqueda) ||
        item.direccion.toUpperCase().includes(this.state.busqueda) ||
        item.codPostal.toString().includes(this.state.busqueda) ||
        item.nombre_ciudad.toLowerCase().includes(this.state.busqueda) ||
        item.nombre_ciudad.toUpperCase().includes(this.state.busqueda) ||
        item.telefono.toString().includes(this.state.busqueda)
      ) {
        return item;
      }
      return null;
    });
    this.setState({ clients: search });
  };

  render() {
    const columnas = [
      {
        name: "Nombre",
        selector: "nombre",
        sortable: true,
      },
      {
        name: "Tipo documento",
        selector: "tipoDocumento",
        sortable: true,
      },
      {
        name: "Número documento",
        selector: "num_documento",
        sortable: true,
      },
      {
        name: "Dirección",
        selector: "direccion",
        sortable: true,
      },
      {
        name: "Código postal",
        selector: "codPostal",
        sortable: true,
      },
      {
        name: "Ciudad",
        selector: "nombre_ciudad",
        sortable: true,
      },
      {
        name: "Teléfono",
        selector: "telefono",
        sortable: true,
      },
      {
        name: "Total facturado",
        selector: "valorFacturado",
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
        <div className="clientesFondo">
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
                Clientes registrados para {this.state.empresa.razonSocial}
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
                Puedes consultar a traves del nombre, tipo de documento, número
                de documento, dirección, ciudad, código postal y teléfono
              </label>
            </div>

            <div id="barraBusqueda">
              <div
                align="center"
                style={{
                  marginTop: "2%",
                  width: "100%",
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
                <br />
                <label>
                  Color de filas según valor facturado hasta el momento para
                  cada cliente
                </label>
                <br />
                <label>0 🔴</label>
              </div>
            </div>
          </div>

          <div className="tablaFiltrada">
            <DataTable
              columns={columnas}
              data={this.state.clients}
              title="Clientes registrados"
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
      when: (row) => row.valorFacturado === 0,
      style: {
        backgroundColor: "rgba(172, 27, 27, 0.274)",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
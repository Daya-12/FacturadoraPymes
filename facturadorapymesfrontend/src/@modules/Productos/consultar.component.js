import React from "react";
import logo from "../../@images/logoProyecto.png";
import DataTable from "react-data-table-component";
import service from "./producto.service";

export default class ConsultarProductos extends React.Component {
  constructor() {
    super();
    this.state = {
      productos: [],
      productos2: [],
      busqueda: "",
      products: [],
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
    this.consultarProductos();
  };

  consultarProductos = async () => {
    let respuesta = null;
    respuesta = await service.consultaPersonalizada(this.state.empresa.id);
    this.setState({
      productos: respuesta.data,
    });

    this.setState({
      productos2: this.state.productos.map((producto) => {
        return {
          nombre: producto.nombre,
          valor: producto.valor,
          categoria: producto.categoria,
          valorFacturado: producto.valorFacturado,
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
    var search = this.state.productos2.filter((item) => {
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
        item.categoria.toLowerCase().includes(this.state.busqueda) ||
        item.categoria.toUpperCase().includes(this.state.busqueda) ||
        item.valor.toString().includes(this.state.busqueda)
      ) {
        return item;
      }
      return null;
    });
    this.setState({ products: search });
  };

  render() {
    const columnas = [
      {
        name: "Nombre",
        selector: "nombre",
        sortable: true,
      },
      {
        name: "Valor",
        selector: "valor",
        sortable: true,
      },
      {
        name: "Categoría",
        selector: "categoria",
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
        <div className="productosFondo">
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
                Productos registrados para{" "}
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
                Puedes consultar a traves del nombre, valor y categoria
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
                <label>
                  Color de filas según valor facturado para un producto
                </label>
                <br />
                <label>0 🔴</label>
              </div>
            </div>
          </div>

          <div className="tablaFiltrada">
            <DataTable
              columns={columnas}
              data={this.state.products}
              title="Productos registrados"
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

import React from "react";
import logo from "../../@images/logoProyecto.png";
import DataTable from "react-data-table-component";
import service from "./factura.service";
import anular from "../../@images/anular.png";
import pdf from "../../@images/Exportarpdf.png";
import Swal from "sweetalert2";
export default class ConsultarAnularFacturas extends React.Component {
    constructor() {
        super();
        this.state = {
          facturas: [],
          facturas2: [],
          busqueda: "",
          facts: [],
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
        this.consultarFacturas();
      };

      consultarFacturas = async () => {
        let respuesta = null;
        respuesta = await service.consultaTabla(this.state.empresa.id);
        this.setState({
          facturas: respuesta.data,
        });
    
        this.setState({
          facturas2: this.state.facturas.map((factura) => {
            return {
              id: factura.id,
              referencia: factura.referencia,
              fechaEmision: factura.fechaEmision,
              fechaVencimiento: factura.fechaVencimiento,
              ciudad: factura.ciudad,
              cliente: factura.cliente,
              total: factura.total,
              usuario: factura.usuario,
              estado: factura.estado
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
        var search = this.state.facturas2.filter((item) => {
          if (
              item.referencia
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(this.state.busqueda.toLowerCase()) ||
            item.referencia
              .toUpperCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(this.state.busqueda.toUpperCase()) ||
            item.fechaEmision.toString().includes(this.state.busqueda) ||
            item.fechaVencimiento.toString().includes(this.state.busqueda) ||
            item.ciudad.toLowerCase().includes(this.state.busqueda.toLowerCase()) ||
            item.ciudad.toUpperCase().includes(this.state.busqueda.toUpperCase()) ||
            item.cliente.toLowerCase().includes(this.state.busqueda.toLowerCase()) ||
            item.cliente.toUpperCase().includes(this.state.busqueda.toUpperCase()) ||
            item.total.toString().includes(this.state.busqueda) ||
            item.usuario.toLowerCase().includes(this.state.busqueda.toLowerCase()) ||
            item.usuario.toUpperCase().includes(this.state.busqueda.toUpperCase()) ||
            item.estado.toLowerCase().includes(this.state.busqueda.toLowerCase()) ||
            item.estado.toUpperCase().includes(this.state.busqueda.toUpperCase()) 
          ) {
            return item;
          }
          return null;
        });
        this.setState({ facts: search });
      };

  consultarFactura = async (referencia) => {
    window.open("/exportarFactura/"+referencia, "_blank");
  }
      
  confirmarAnularFactura = async (row) => {

    Swal.fire ({
        title: "Anular factura",
        text:
          "¿Estas seguro de anular la factura " +
          row.referencia +
          "?\nUna vez anulada, no puedes revertir el cambio",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0D4C90",
        cancelButtonColor: "#973232",
        cancelButtonText: "No, cancelar",
        confirmButtonText: "Si, proceder",
      }).then((result) => {
        if (result.value) {
            this.anular(row);
        }
      });


  };

  anular = async (row) =>{
    let respuesta = null;
    respuesta = await service.anular(row);
    if (respuesta.data!==null) {
        Swal.fire({
            text: "¡La factura "+row.referencia+" ha sido anulada exitosamente!",
            icon: "success",
            timer: "4000",
          });
          setTimeout(function () { window.location.reload(1); }, 3000);
    }else{
        Swal.fire({
            text:
              "Uppss! la factura " +
              row.referencia +
              " no pudo ser anulada,¡Intentalo nuevamente!",
            icon: "error",
            timer: "4000",
          });
    }
  }

  render() {
    const columnas = [
    {
        name: "Anular",
        cell: (row) => row.estado ==="Emitido" ? ( <button style={{
            outline: "0 none",
            border: "0",
            backgroundColor: "none",
            borderRadius: "50%",
          }} onClick={() => this.confirmarAnularFactura(row)}><img height="20" width="20" src={anular} alt="anular"></img></button>) : (<></>),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
    },

    {
        name: "Referencia",
        selector: "referencia",
        sortable: true,
      },
      {
        name: "F.Emisión",
        selector: "fechaEmision",
        sortable: true,
      },
      {
        name: "F.Vencimiento",
        selector: "fechaVencimiento",
        sortable: true,
      },
      {
        name: "Ciudad",
        selector: "ciudad",
        sortable: true,
      },
      {
        name: "Cliente",
        selector: "cliente",
        sortable: true
      },
      {
        name: "Valor",
        selector: "total",
        sortable: true,
      },
      {
        name: "Usuario",
        selector: "usuario",
        sortable: true,
      },
      {
        name: "Estado",
        selector: "estado",
        sortable: true
      },
      {
        name: "Ver",
        cell: (row) => row.estado ==="Emitido" ? ( <button style={{
            outline: "0 none",
            border: "0",
            backgroundColor: "none",
          }} onClick={() => this.consultarFactura(row.referencia)}><img height="27" width="22" src={pdf} alt="anular"></img></button>) : (<></>),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
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
        <div className="facturasFondo">
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
              }}
            >
              <label>
                Facturas registradas para {this.state.empresa.razonSocial}
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
                Puedes consultar a traves de la referencia, fecha emisión, fecha vencimiento, ciudad, cliente,valor, usuario y estado
              </label>
            </div>

            <div >
              <div
                align="left"
                className="subCuerpo1"
                style={{
                  color: "#000227",
                  fontSize: "10px",
                  fontFamily: "Segoe UI",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              ></div>

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
                <label>
                  Color de filas para facturas anuladas
                </label>
                <br />
                <label>⚫</label>
              </div>
            </div>
          </div>

          <div className="tablaFiltrada">
            <DataTable
              columns={columnas}
              data={this.state.facts}
              title="Facturas registradas"
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
      when: (row) => row.estado === 'Anulado',
      style: {
        backgroundColor: "#c4c4c4",
        color: "black",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];
  
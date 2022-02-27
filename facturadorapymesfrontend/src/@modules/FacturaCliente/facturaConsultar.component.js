import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import x from "../../@images/anular.png";
import service from "./facturaConsultar.service";
import Loading from "../Loading/loading";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image
} from "@react-pdf/renderer";
import { Button } from "reactstrap";
export default class ConsultarFactura extends React.Component {
  constructor() {
    super();
    this.state = {
      refFactura: "",
      imagen:"",
      empresaCompleta: {
        id: "",
        razonSocial: "",
        slogan: "",
        nit: "",
        correoElectronico: "",
        direccion: "",
        ciudad: "",
        telefono: "",
      },
      form: {
        referencia: "",
        ciudad: "",
        cliente: {
          nombre: "",
          nombre_tdocumento: "",
          num_documento: "",
          direccion: "",
          nombre_ciudad: "",
          id_empresa: "",
          codPostal: "",
          telefono: "",
        },
        usuario: "",
        formaPago: "",
        formaPagoPersonalizada: "",
        fechaEmision: "",
        fechaVencimiento: "",
        subtotal: 0,
        impuestoIva: 0,
        total: 0,
        valorLetras: "",
        detalles: [],
      },
    };
  }
  componentDidMount = async () => {
    let refFactura = this.props.match.params.refFactura;
    await this.setState({ refFactura: refFactura });
    this.consultarFacturaPorReferencia();
  };

  consultarFacturaPorReferencia = async () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);

    let respuesta = null;
    respuesta = await service.consultarPorReferencia(this.state.refFactura);
    console.log(respuesta);
    if (respuesta !== null) {
      await this.setState({
        form: {
          referencia: respuesta.data.referencia,
          ciudad: respuesta.data.ciudad,
          cliente: {
            nombre: respuesta.data.cliente.nombre,
            nombre_tdocumento: respuesta.data.cliente.nombre_tdocumento,
            num_documento: respuesta.data.cliente.num_documento,
            direccion: respuesta.data.cliente.direccion,
            nombre_ciudad: respuesta.data.cliente.nombre_ciudad,
            id_empresa: respuesta.data.cliente.id_empresa,
            codPostal: respuesta.data.cliente.codPostal,
            telefono: respuesta.data.cliente.telefono,
          },
          usuario: respuesta.data.usuario,
          formaPago: respuesta.data.formaPago,
          formaPagoPersonalizada: respuesta.data.formaPagoPersonalizada,
          fechaEmision: respuesta.data.fechaEmision,
          fechaVencimiento: respuesta.data.fechaVencimiento,
          subtotal: respuesta.data.subtotal,
          impuestoIva: respuesta.data.impuestoIva,
          total: respuesta.data.total,
          valorLetras: respuesta.data.valorLetras,
          detalles: respuesta.data.detalles,
        },
      });
    }
    this.consultarLogo();
  };

  consultarLogo = async () => {
    let respuesta = null;
    respuesta = await service.consultarLogo(this.state.form.cliente.id_empresa);
    if (respuesta !== null) {
        this.setState({ imagen: "data:" +
        respuesta.data.contentType +
        ";base64," +
        respuesta.data.bytes });

        this.completarInformacionEmpresa();
    }
  };


  completarInformacionEmpresa = async () => {
    let respuesta = null;
    respuesta = await service.buscarPorId(this.state.form.cliente.id_empresa);
    if (respuesta !== null) {
      this.setState({
        empresaCompleta: {
          id: respuesta.data.id,
          razonSocial: respuesta.data.razonSocial,
          slogan: respuesta.data.slogan,
          nit: respuesta.data.nit,
          correoElectronico: respuesta.data.correoElectronico,
          direccion: respuesta.data.direccion,
          ciudad: respuesta.data.ciudad.nombre,
          telefono: respuesta.data.telefono,
        },
      });
    }
  };

  devolverAPaginaAnterior = async () => {
    window.close();
  };

  render() {
    const styles = StyleSheet.create({
      page: {
        //backgroundColor: "#d11fb6",
        //color: "white",
      },
      image: {
        width: 100,
        height: 75,
      },
      sub1Factura: {
        width: "15%",
        display: "inline-block",
        align: "left",
      },
      titulosFactura: {
        width: "70%",
        display: "inline-block",
        align: "center",
        verticalAlign: "top",
        margin: "0 auto"
      },
      labelRazonSocial: {
        fontSize: 13
      },
      section: {
        margin: 10,
        padding: 10,
      },
      viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
      },
    });
    while (this.state.loading === true) {
      return <Loading />;
    }
    return (
      <>
        {this.state.form.referencia !== "" ? (
          <PDFViewer style={styles.viewer}>
            {/* Start of the document*/}
            <Document>
              {/*render a single page*/}
              <Page size="A4" style={styles.page}>
              <View>
                <View style={styles.sub1Factura}>
                      <Image
                        style={styles.image}
                        src={this.state.imagen}
                      />
                </View>
                <View style={styles.titulosFactura}>
                  <Text style={styles.labelRazonSocial}>{this.state.empresaCompleta.razonSocial}</Text>
                  <Text >{this.state.empresaCompleta.slogan}</Text>
                  <Text >{this.state.empresaCompleta.nit}</Text>
                  <Text>{this.state.empresaCompleta.direccion} - {this.state.empresaCompleta.ciudad}  •  {this.state.empresaCompleta.correoElectronico}  •  {this.state.empresaCompleta.telefono}</Text>
                </View>
              </View>

                <View style={styles.section}>
                 
                </View>
              </Page>
            </Document>
          </PDFViewer>
        ) : (
          <div className="container">
            <div
              className="facturasFondo"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div align="center">
                <Button
                  id="botonValidar"
                  size="lg"
                  color="warning"
                  onClick={() => this.devolverAPaginaAnterior()}
                >
                  ¡La factura "{this.state.refFactura}" no existe!&nbsp;&nbsp;
                  <br />
                  <br />
                  ¡Presione aquí para salir!&nbsp;&nbsp;
                  <img height="25" width="25" src={x} alt="error"></img>
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

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
  Image,
  Font 
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
    Font.register({ family: 'Roboto', src: "source" });
    const styles = StyleSheet.create({
      page: {
        //backgroundColor: "#d11fb6",
        //color: "white",
      },
      image: {
        width: 100,
        height: 75,
        borderTopLeftRadius:3,
        borderTopRightRadius:3,
        borderBottomRightRadius:3,
        borderBottomLeftRadius:3,
        marginTop: 5,
        marginLeft: 5,
      },
      parte1: {
        display: "flex",
        flexDirection: "row"
      },
      sub1Factura: {
        width: "20%",
        align: "left",
        display: "inline-block"
      },
      titulosFactura: {
        width: "60%",
        display: "inline-block"
      },
      referenciaFact: {
        width: "20%",
        backgroundColor: "green",
        display: "inline-block"
      },
      factura: {
        margin: 12,
        border: 1,
        borderColor: "#00064d",
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
        borderBottomLeftRadius:8,
        maxWidth: "100vw",
        minHeight: "100%" 
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
              <View style={styles.factura}>
                <View style={styles.parte1}>
                <View style={styles.sub1Factura}>
                      <Image
                        style={styles.image}
                        src={this.state.imagen}
                      />
                </View>
                <View style={styles.titulosFactura}>
                  <Text style={{marginTop:10,fontSize: 12,
                  color: "rgb(4, 9, 32)",
                  textAlign: "center",
                  fontWeight: "bold",
                  letterSpacing: 2,
                  padding: 2}}>{this.state.empresaCompleta.razonSocial}</Text>
                  <Text style={{fontSize: 10,
                  color: "rgb(4, 9, 32)",
                  textAlign: "center",
                  fontWeight: "bold",
                  letterSpacing: 2,
                  padding: 2}}>{this.state.empresaCompleta.slogan}</Text>
                  <Text style={{fontSize: 10,
                  color: "rgb(4, 9, 32)",
                  textAlign: "center",
                  fontWeight: "bold",
                  letterSpacing: 2,
                  padding: 2}} >{this.state.empresaCompleta.nit}</Text>
                  <Text style={{fontSize: 8,
                  color: "rgb(4, 9, 32)",
                  textAlign: "center",
                  fontWeight: "bold",
                  letterSpacing: 1,
                  padding: 2}}>{this.state.empresaCompleta.direccion} - {this.state.empresaCompleta.ciudad}  •  {this.state.empresaCompleta.correoElectronico}  •  {this.state.empresaCompleta.telefono}</Text>
                </View>
                <View style={styles.referenciaFact}>
                  <Text>hola</Text>
                </View>
                </View>
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

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import x from "../../@images/anular.png";
import service from "./facturaConsultar.service";
import Loading from "../Loading/loading";
import QRCode from "qrcode.react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import {Button} from "reactstrap";
export default class ConsultarFactura extends React.Component {
  constructor() {
    super();
    this.state = {
      refFactura: "",
      imagen: "",
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
          estado: respuesta.data.estado
        },
      });
    }
    this.consultarLogo();
  };

  consultarLogo = async () => {
    let respuesta = null;
    respuesta = await service.consultarLogo(this.state.form.cliente.id_empresa);
    if (respuesta !== null) {
      this.setState({
        imagen:
          "data:" +
          respuesta.data.contentType +
          ";base64," +
          respuesta.data.bytes,
      });

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
    //Font.register({ family: "Roboto", src: "source" });
    const styles = StyleSheet.create({
      page: {
        //backgroundColor: "#d11fb6",
        //color: "white",
      },
      image: {
        width: 100,
        height: 79,
        borderRadius: 3,
        marginTop: 5,
        marginLeft: 5,
      },
      parte1: {
        display: "flex",
        flexDirection: "row",
        borderBottom: 0.7
      },
      sub1Factura: {
        width: "20%",
        align: "left",
      },
      titulosFactura: {
        width: "60%",
      },
      referenciaFact: {
        width: "20%",
        fontSize: 10,
        textAlign: "center",
        color: "rgb(20, 20, 20)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      factura: {
        margin: 12,
        border: 1,
        borderColor: "#000323",
        borderRadius: 10,
        maxWidth: "100vw",
        maxHeight:"100vh"
      },
      viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
      },

      table: {
        margin: 10,
        border: 1,
      },
      row: {
        textAlign: "center",
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 9.5,
        letterSpacing: 1,
        borderTop: 0.5
      },
      header: {
        borderTop: 'none',
        backgroundColor: "#b3b3b3",
        fontSize: 10,
      },
      // So Declarative and unDRY 👌
      row1: {
        width: '10%',
      },
      row2: {
        width: '40%',
        borderLeft: 1,
        padding: 1
      },
      row3: {
        width: '25%',
        borderLeft: 1
      },
      row4: {
        width: '25%',
        borderLeft: 1
      },
      informacion: {
        margin: 10
      },
      infoPartes: {
        display: "flex",
        flexDirection: "row",
        padding: 5
      },
      titulosInfo: {
        fontSize: 10,
        padding: 2,
        letterSpacing: 1,
      },
      dataInfo:{
        fontSize: 11.5,
        padding: 2,
        letterSpacing: 2
      }
    });
    while (this.state.loading === true) {
      return <Loading />;
    }

    const qrCodeComponent = (
      <QRCode value={this.state.form.referencia} renderAs="svg" size={80} />
    );

    const qrCodeComponentStaticMarkup = renderToStaticMarkup(qrCodeComponent);

    const parsedQrCodeSvg = parseQrCodeMarkup(qrCodeComponentStaticMarkup);
    if (!parsedQrCodeSvg) {
      return null;
    }

    return (
      <>
        {this.state.form.referencia !== "" && this.state.form.estado!=="Anulado" ? (
          <PDFViewer style={styles.viewer}>
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.factura}>
                  <View style={styles.parte1}>
                    <View style={styles.sub1Factura}>
                      <Image style={styles.image} src={this.state.imagen} />
                    </View>
                    <View style={styles.titulosFactura}>
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 12,
                          color: "rgb(4, 9, 32)",
                          textAlign: "center",
                          fontWeight: "bold",
                          letterSpacing: 2,
                          padding: 3,
                        }}
                      >
                        {this.state.empresaCompleta.razonSocial}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "rgb(4, 9, 32)",
                          textAlign: "center",
                          fontWeight: "bold",
                          letterSpacing: 2,
                          padding: 3,
                        }}
                      >
                        {this.state.empresaCompleta.slogan}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "rgb(4, 9, 32)",
                          textAlign: "center",
                          fontWeight: "bold",
                          letterSpacing: 2,
                          padding: 3,
                        }}
                      >
                        {this.state.empresaCompleta.nit}
                      </Text>
                      <Text
                        style={{
                          fontSize: 9,
                          color: "rgb(4, 9, 32)",
                          textAlign: "center",
                          fontWeight: "bold",
                          letterSpacing: 1,
                          padding: 3,
                        }}
                      >
                        {this.state.empresaCompleta.direccion} -{" "}
                        {this.state.empresaCompleta.ciudad} •{" "}
                        {this.state.empresaCompleta.correoElectronico} •{" "}
                        {this.state.empresaCompleta.telefono}
                      </Text>
                    </View>
                    <View style={styles.referenciaFact}>
                      <Text
                        style={{
                          letterSpacing: 1,
                          marginTop: 10
                        }}
                      >
                        Ref.{this.state.form.referencia}
                      </Text>
                      <Svg
                        style={{ width: 80, height: 80 }}
                        viewBox="-8 -5 37 35"
                      >
                        {parsedQrCodeSvg.props.children
                          .filter((c) => c.type === "path")
                          .map((child, index) => (
                            <Path
                              key={index}
                              d={child.props.d}
                              fill={child.props.fill}
                            />
                          ))}
                      </Svg>
                    </View>
                  </View>
                  <View>
                    <View style={styles.informacion}>

                    <View style={{borderBottom: 0.5}}>
                      <View style={{ backgroundColor:"#cacaca"}}>
                          <Text style={{textAlign: "center",fontSize: 10,padding: 2,letterSpacing: 2}}>INFORMACIÓN BÁSICA</Text>
                      </View>
                      <View style={styles.infoPartes}>
                        <View style={{width: "35%"}}>
                          <Text style={styles.titulosInfo}>Fecha de emisión</Text>
                          <Text style={styles.dataInfo}>{this.state.form.fechaEmision}</Text>
                        </View>
                        <View style={{width: "35%"}}>
                          <Text style={styles.titulosInfo}>Fecha de vencimiento</Text>
                          <Text style={styles.dataInfo}>{this.state.form.fechaVencimiento}</Text>
                        </View>
                        <View style={{width: "30%"}}>
                          <Text style={styles.titulosInfo}>Ciudad</Text>
                          <Text style={styles.dataInfo}>{this.state.form.ciudad}</Text>
                        </View>
                      </View>
                      <View style={styles.infoPartes}>
                        <View style={{width: "100%"}}>
                          <Text style={styles.titulosInfo}>Forma de pago</Text>

                          {this.state.form.formaPago!== null ? (

                            <Text style={styles.dataInfo}>{this.state.form.formaPago}</Text>
                          ): (
                            <Text style={styles.dataInfo}>{this.state.form.formaPagoPersonalizada}</Text>
                          )}
                        </View>
                      </View>
                    </View>

                      <View style={{borderBottom: 0.5}}>
                        <View style={{marginTop: 10, backgroundColor:"#cacaca"}}>
                          <Text style={{textAlign: "center",fontSize: 10,padding: 2,letterSpacing: 2}}>INFORMACIÓN CLIENTE</Text>
                        </View>
                        <View style={styles.infoPartes}>
                          <View style={{width: "40%"}}>
                            <Text style={styles.titulosInfo}>Nombre</Text>
                            <Text style={styles.dataInfo}>{this.state.form.cliente.nombre}</Text>
                          </View>
                          <View style={{width: "35%"}}>
                            <Text style={styles.titulosInfo}>Documento</Text>
                            <Text style={styles.dataInfo}>{this.state.form.cliente.nombre_tdocumento}{" "}{this.state.form.cliente.num_documento}</Text>
                          </View>
                          <View style={{width: "25%"}}>
                            <Text style={styles.titulosInfo}>Teléfono</Text>
                            <Text style={styles.dataInfo}>{this.state.form.cliente.telefono}</Text>
                          </View>
                        </View>
                        <View style={styles.infoPartes}>
                          <View style={{width: "40%"}}>
                            <Text style={styles.titulosInfo}>Ciudad</Text>
                            <Text style={styles.dataInfo}>{this.state.form.cliente.nombre_ciudad}</Text>
                          </View>
                          <View style={{width: "40%"}}>
                            <Text style={styles.titulosInfo}>Dirección</Text>
                            <Text style={styles.dataInfo}>{this.state.form.cliente.direccion}</Text>
                          </View>
                          <View style={{width: "20%"}}>
                            <Text style={styles.titulosInfo}>Código Postal</Text>
                            <Text style={styles.dataInfo}>{this.state.form.cliente.codPostal}</Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    
                    <View>
                      <View style={{marginTop: 5,marginBottom: 5, backgroundColor:"#cacaca"}}>
                        <Text style={{textAlign: "center",fontSize: 10,padding: 2,letterSpacing: 2}}>INFORMACIÓN FACTURACIÓN</Text>
                      </View>
                
                      <View style={styles.table}>
                        <View style={[styles.row, styles.header]}>
                          <Text style={styles.row1}>Cantidad</Text>
                          <Text style={styles.row2}>Producto</Text>
                          <Text style={styles.row3}>Valor Unitario</Text>
                          <Text style={styles.row4}>Valor Total</Text>
                        </View>
                        {this.state.form.detalles.map((row, i) => (
                          <View key={i} style={styles.row} wrap={false}>
                            <Text style={styles.row1}>{row.cantidad}</Text>
                            <Text style={styles.row2}>{row.nombreProducto}</Text>
                            <Text style={styles.row3}>{row.valorUnitario}</Text>
                            <Text style={styles.row4}>{row.valorTotal}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    <View style={{borderBottom: 0.5,display: "flex",flexDirection: "row"}}>
                      <View style={{margin: 10,width:"60%",display: "flex",justifyContent: "center", backgroundColor: "#dadada", borderRadius: 5}}>
                        <Text style={{fontSize: 10,padding: 4,letterSpacing: 2, textAlign: "left"}}>Valor en letras: </Text>
                        <Text style={{fontSize: 10,padding: 4,letterSpacing: 2.5,textAlign: "left"}}>{this.state.form.valorLetras}.</Text>
                      </View>

                      <View  style={{margin: 10,width:"40%"}} >
                        <View style={{ textAlign:"right"}}>
                            <Text style={[styles.dataInfo,{padding: 5}]} >Sub-Total:{" "}{this.state.form.subtotal}</Text>
                            <Text style={[styles.dataInfo,{padding: 5}]} >IVA:{" "}{this.state.form.impuestoIva}</Text>
                            <Text style={[styles.dataInfo,{padding: 5}]}>Total:{" "}{this.state.form.total}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{position:"fixed",bottom: 0, width: "100%"}}>
                      <View style={{borderBottom: 0.5}}>
                        <Text style={{fontSize: 10,padding: 4,letterSpacing: 2, textAlign: "center", padding: 10}}>Factura creada por:{" "}{this.state.form.usuario}</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: 6,padding: 4,letterSpacing: 2, textAlign: "center", padding: 10}}> ISSMC | Bogotá,Colombia</Text>
                      </View>
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
              <div align="center" backgroundColor="gray">
                <Button
                  id="botonValidar"
                  size="lg"
                  onClick={() => this.devolverAPaginaAnterior()}
                >
                  ¡La factura "{this.state.refFactura}" no existe o se encuentra anulada!&nbsp;&nbsp;
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

const parseQrCodeMarkup = (markup) => {
  let parsedQrCodeSvg = null;

  ReactHtmlParser(markup).forEach((el) => {
    const { type } = el;
    if (type === "svg") {
      parsedQrCodeSvg = el;
    }
  });

  return parsedQrCodeSvg;
};




//////      PAPSA-68847
import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Svg,
    Path,
  } from "@react-pdf/renderer";
import QRCode from "qrcode.react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactHtmlParser from "react-html-parser";

import service from "./facturaConsultar.service";

export default class MyDocument extends React.Component {

    constructor() {
        super();
        this.state = {
          imagen: "",
        };
      }

      componentDidMount = async () => {
        this.consultarLogo();
      };

    
      consultarLogo = async () => {
        let respuesta = null;
        respuesta = await service.consultarLogo(this.props.informacion.form.cliente.id_empresa);
        if (respuesta !== null) {
          this.setState({
            imagen:
              "data:" +
              respuesta.data.contentType +
              ";base64," +
              respuesta.data.bytes,
          });
    
        }
      };

    render() {
        const styles = StyleSheet.create({
            page: {
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


          const qrCodeComponent = (
            <QRCode value={"Ref.: "+this.props.informacion.form.referencia+ "\nFecha: "+this.props.informacion.form.fechaEmision+ "\nValor: "+this.props.informacion.form.total} renderAs="svg" size={80} />
          );
      
          const qrCodeComponentStaticMarkup = renderToStaticMarkup(qrCodeComponent);
      
          const parsedQrCodeSvg = parseQrCodeMarkup(qrCodeComponentStaticMarkup);
          if (!parsedQrCodeSvg) {
            return null;
          }
        return (
            <Document>
            <Page wrap={true} size="A4" style={styles.page}>
              <View wrap={true} style={styles.factura}>
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
                      {this.props.informacion.empresaCompleta.razonSocial}
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
                      {this.props.informacion.empresaCompleta.slogan}
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
                      {this.props.informacion.empresaCompleta.nit}
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
                      {this.props.informacion.empresaCompleta.direccion} -{" "}
                      {this.props.informacion.empresaCompleta.ciudad} •{" "}
                      {this.props.informacion.empresaCompleta.correoElectronico} •{" "}
                      {this.props.informacion.empresaCompleta.telefono}
                    </Text>
                  </View>
                  <View style={styles.referenciaFact}>
                    <Text
                      style={{
                        letterSpacing: 1,
                        marginTop: 10
                      }}
                    >
                      Ref.{this.props.informacion.form.referencia}
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
                        <Text style={styles.dataInfo}>{this.props.informacion.form.fechaEmision}</Text>
                      </View>
                      <View style={{width: "35%"}}>
                        <Text style={styles.titulosInfo}>Fecha de vencimiento</Text>
                        <Text style={styles.dataInfo}>{this.props.informacion.form.fechaVencimiento}</Text>
                      </View>
                      <View style={{width: "30%"}}>
                        <Text style={styles.titulosInfo}>Ciudad</Text>
                        <Text style={styles.dataInfo}>{this.props.informacion.form.ciudad}</Text>
                      </View>
                    </View>
                    <View style={styles.infoPartes}>
                      <View style={{width: "100%"}}>
                        <Text style={styles.titulosInfo}>Forma de pago</Text>

                        {this.props.informacion.form.formaPago!== null ? (

                          <Text style={styles.dataInfo}>{this.props.informacion.form.formaPago}</Text>
                        ): (
                          <Text style={styles.dataInfo}>{this.props.informacion.form.formaPagoPersonalizada}</Text>
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
                          <Text style={styles.dataInfo}>{this.props.informacion.form.cliente.nombre}</Text>
                        </View>
                        <View style={{width: "35%"}}>
                          <Text style={styles.titulosInfo}>Documento</Text>
                          <Text style={styles.dataInfo}>{this.props.informacion.form.cliente.nombre_tdocumento}{" "}{this.props.informacion.form.cliente.num_documento}</Text>
                        </View>
                        <View style={{width: "25%"}}>
                          <Text style={styles.titulosInfo}>Teléfono</Text>
                          <Text style={styles.dataInfo}>{this.props.informacion.form.cliente.telefono}</Text>
                        </View>
                      </View>
                      <View style={styles.infoPartes}>
                        <View style={{width: "40%"}}>
                          <Text style={styles.titulosInfo}>Ciudad</Text>
                          <Text style={styles.dataInfo}>{this.props.informacion.form.cliente.nombre_ciudad}</Text>
                        </View>
                        <View style={{width: "40%"}}>
                          <Text style={styles.titulosInfo}>Dirección</Text>
                          <Text style={styles.dataInfo}>{this.props.informacion.form.cliente.direccion}</Text>
                        </View>
                        <View style={{width: "20%"}}>
                          <Text style={styles.titulosInfo}>Código Postal</Text>
                          <Text style={styles.dataInfo}>{this.props.informacion.form.cliente.codPostal}</Text>
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
                      {this.props.informacion.form.detalles.map((row, i) => (
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
                      <Text style={{fontSize: 10,padding: 4,letterSpacing: 2.5,textAlign: "left"}}>{this.props.informacion.form.valorLetras}.</Text>
                    </View>

                    <View  style={{margin: 10,width:"40%"}} >
                      <View style={{ textAlign:"right"}}>
                          <Text style={[styles.dataInfo,{padding: 5}]} >Sub-Total:{" "}{this.props.informacion.form.subtotal}</Text>
                          <Text style={[styles.dataInfo,{padding: 5}]} >IVA:{" "}{this.props.informacion.form.impuestoIva}</Text>
                          <Text style={[styles.dataInfo,{padding: 5}]}>Total:{" "}{this.props.informacion.form.total}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{position:"fixed",bottom: 0, width: "100%"}}>
                    <View style={{borderBottom: 0.5}}>
                      <Text style={{fontSize: 10,padding: 10,letterSpacing: 2, textAlign: "center"}}>Factura creada por:{" "}{this.props.informacion.form.usuario}</Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 6,padding: 10,letterSpacing: 2, textAlign: "center"}}> ISSMC | Bogotá,Colombia</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
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
  
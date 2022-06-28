import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import x from "../../@images/anular.png";
import MyDocument from "./document.component";

import {
  StyleSheet,
  PDFViewer,
  PDFDownloadLink
} from "@react-pdf/renderer";
import {Button, Container} from "reactstrap";
import { isBrowser, isMobile } from "react-device-detect";
import service from "./facturaConsultar.service";
import Loading from "../Loading/loading";

export default class ConsultarFactura extends React.Component {
  constructor() {
    super();
    this.state = {
      refFactura: "",
      imagen: "",
      loading: true,
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
        estado: ""
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
    if (respuesta.data != "") {
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
      },
      viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    });

    while (this.state.loading === true) {
      return <Loading />;
    }

      if(isMobile){
        return (
          <>
          <PDFDownloadLink document={<MyDocument informacion={this.state}/>} fileName="document.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Estamos generando la factura...' : '¡Presiona aquí para descargar la factura!'
            }
          </PDFDownloadLink>
          </>
        )
      }
      
      if(isBrowser){
      return (
        <>
          {this.state.form.referencia !== "" && this.state.form.estado!=="Anulado" ? (
            <PDFViewer style={styles.viewer}>
              <MyDocument informacion={this.state}/>
            </PDFViewer>
          ) : (
            <Container>
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
            </Container>
          )}
        </>
      );
      }
  }
}
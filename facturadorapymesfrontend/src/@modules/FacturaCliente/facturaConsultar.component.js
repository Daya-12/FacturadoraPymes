import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import x from "../../@images/anular.png";
//import service from "./facturaConsultar.service";
import Loading from "../Loading/loading";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import {
  Button
} from "reactstrap";
export default class ConsultarFactura extends React.Component {
  constructor() {
    super();
    this.state = {
      refFactura: "",
    };
  }
  componentDidMount= async () => {
    let refFactura = this.props.match.params.refFactura;
    this.setState({ refFactura: refFactura });
    this.consultarFactura();
  }
  consultarFactura = async () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    let respuesta = null;
    //respuesta = await service.consultarFactura(this.refFactura);
  };

  devolverAPaginaAnterior = async () => {
    window.close();
  };

  render() {
    const styles = StyleSheet.create({
      page: {
        backgroundColor: "#d11fb6",
        color: "white",
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
        {this.state.refFactura !== null ? (
          <PDFViewer style={styles.viewer}>
            {/* Start of the document*/}
            <Document>
              {/*render a single page*/}
              <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                  <Text>{this.state.refFactura}</Text>
                </View>
                <View style={styles.section}>
                  <Text>Te amo mor</Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        ) : (
          <div className="container" >
            <div className="facturasFondo" style={{ display: "flex",
                    alignItems: "center",
                    justifyContent: "center"}}>
                <div
                  align="center"
                >
                  <Button
                    id="botonValidar"
                    size="lg"
                    color="warning"
                    
                    onClick={() => this.devolverAPaginaAnterior()}
                  >
                    ¡La factura "{this.state.refFactura}" no existe!&nbsp;&nbsp;<br/><br/>¡Presione aquí para salir!&nbsp;&nbsp;
                    <img
                      height="25"
                      width="25"
                      src={x}
                      alt="error"
                    ></img>
                  </Button>
                  </div>
                  </div>
          </div>
        )}
      </>
    );
  }
}

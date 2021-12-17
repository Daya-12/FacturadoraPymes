import React from "react";
import logo from "../../@images/logoProyecto.png";
export default class ActualizarEliminarProductos extends React.Component {
    constructor() {
        super();
        this.state = {
            empresa: {
                id: "",
                razonSocial: "",
              },
        }
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
        //this.consultarProductos();
      };

      
  render() {
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
                Actualizar o dar de baja productos registrados para{" "}
                {this.state.empresa.razonSocial}
              </label>
            </div>
            <div
              style={{
                marginTop: "0.2%",
                color: "#000227",
                fontSize: "13px",
                fontFamily: "Segoe UI",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <label style={{ color: "red" }}>Ten en cuenta que:</label>
              <br />
              <label>
                • Puedes actualizar el nombre, el valor y la categorio a la que pertenece un producto
              </label>
              <br />
              <label>
                • Los producto se encuentra ordenados por el nombre de manera
                ascendente
              </label>
              <br />
              <label>
                • Debes estar seguro de eliminar o actualizar la informacion de los productos
                mostrados a continuación, una vez confirmada la acción no puedes revertir los cambios
              </label>
            </div>




          </div>
        </div>
      </div>
    );
  }
}

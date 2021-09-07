import React from "react";
import clean from "../../@images/cleanForms.png";
import logo from "../../@images/logoProyecto.png";
import "../../@styles/styles.components.css";

export default class RegistroPyme extends React.Component {
  cleanForm = () => {
    document.getElementById("crearPymes").reset();
  };

  render() {
    return (
      <div class="container">
        <div class="pymeReg">
          <div class="col-md-12 formularioR">
            <div
              class="col-12"
              align="left"
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              <img src={logo} height="85" width="260" alt="Logo ITS" />
            </div>
            <h2
              style={{
                fontSize: "35px",
                fontFamily: "Segoe UI",
                textAlign: "center",
                color: "#09065A",
              }}
            >
              ¡Registra tu pyme!
            </h2>
            <div class="row justify-content-center pt-4 mb-4 m-2">
              <div class="col-12" align="right">
                <button
                  style={{
                    outline: "0 none",
                    border: "0",
                    backgroundColor: "rgb(223, 223, 223)",
                    marginRight: "20px",
                  }}
                  onClick={() => {
                    this.limpiarForm();
                  }}
                >
                  <img height="41" width="40" src={clean} alt="clean"></img>
                </button>
              </div>
              <form id="crearPymes">
                <div class="form-group row">
                  <div class="form-group col-md-4">
                    <label class="label-registro" for="razonSocial">Razón social</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-bank2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z" />
                        </svg>
                      </span>
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        id="razonSocial"
                        name="razonSocial"
                      />
                    </div>
                  </div>

                  <div class="form-group col-md-5">
                    <label class="label-registro">Slogan</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-cart4"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                        </svg>
                      </span>
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="form-group col-md-3">
                    <label class="label-registro">Identificación</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-file-earmark-person"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z" />
                        </svg>
                      </span>
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control"
                        placeholder="Nit o Rut"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

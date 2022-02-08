import React from "react";
import service from "./factura.service";
import Autocomplete from "@mui/material/Autocomplete";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import { InputGroup, Label, Row, Col, Table,Input,Form,FormGroup } from "reactstrap";
import CreateIcon from "@material-ui/icons/Create";
import { Button, Snackbar } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class RegistroFactura extends React.Component {
  constructor() {
    super();
    this.state = {
      productos: [],
      ciudades: [],
      clientes: [],
      formasPago: [],
      button: false,
      fechaEmision: null,
      check: false,
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
      empresa: {
        id: "",
        razonSocial: "",
      },
      form: {
        fechaEmision: "",
        fechaVencimiento: "",
        formaPago: "",
        formaPagoPersonalizada: "",
        ciudad: "",
        cliente: "",
      },
      cliente: {
        nombre_tdocumento: "",
        num_documento: "",
        nit: "",
        direccion: "",
        telefono: "",
      },
      open: false,
      isEdit: false,
      disable: true,
      showConfirm: false,
      rows: [],
      asesor: "",
      textarea: ""
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
    this.completarInformacionEmpresa();
    this.consultarCiudades();
    this.consultarClientes();
    this.consultarLogo();
    this.consultarFormasPago();
    this.consultarUsuarioLogueado();
  };

  numero = (numero) => {
    const conversor = require('conversor-numero-a-letras-es-ar');
    let ClaseConversor = conversor.conversorNumerosALetras;
    let miConversor = new ClaseConversor();
    var numeroEnLetras = miConversor.convertToText(25631545);    
    this.setState({
      textarea: numeroEnLetras.charAt(0).toUpperCase() + numeroEnLetras.slice(1)+" "+"pesos Mcte"
    });
  }

  consultarUsuarioLogueado = () => {
    let informacionLocalStorage=JSON.parse(localStorage.getItem("user"));
    this.setState({
        asesor: "Factura creada por: "+informacionLocalStorage.nombre
    });
    this.numero();
  }
  
  consultarProductos = async () => {
    let respuesta = null;
    respuesta = await service.consultarProductos(this.state.empresa.id);
    if (respuesta !== null) {
      this.setState({
        productos: respuesta.data,
      });
    }
  };

  consultarCiudades = async () => {
    let respuesta = null;
    respuesta = await service.consultarCiudades();
    this.setState({
      ciudades: respuesta.data,
    });
  };

  consultarClientes = async () => {
    let respuesta = null;
    respuesta = await service.consultarClits(this.state.empresa.id);
    if (respuesta !== null) {
      this.setState({
        clientes: respuesta.data,
      });
    }
  };

  consultarFormasPago = async () => {
    let respuesta = null;
    respuesta = await service.consultarFormasPago();
    var f = new Date();
    if (respuesta !== null) {
      this.setState({
        formasPago: respuesta.data,
        fechaEmision:
          f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
      });
      document.getElementById("formaPagoPersonalizada").disabled = true;
    }
  };

  consultarLogo = async () => {
    let respuesta = null;
    respuesta = await service.consultarLogo(this.state.empresa.id);
    if (respuesta !== null) {
      document.getElementById("logoPyme").src =
        "data:" +
        respuesta.data.contentType +
        ";base64," +
        respuesta.data.bytes;
    }
  };

  completarInformacionEmpresa = async () => {
    let respuesta = null;
    respuesta = await service.buscarPorId(this.state.empresa.id);
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

  handleChangeCiudad = async (e, v) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        ciudad: v,
      },
    });
  };

  handleChangeCliente = async (e, v) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        cliente: v,
      },
    });
    let cliente = this.state.clientes.find((cliente) => cliente.nombre === v);
    if (v !== "" && cliente != undefined) {
      this.setState({
        cliente: {
          nombre_tdocumento:
            cliente.nombre_tdocumento + " " + cliente.num_documento,
          direccion: cliente.direccion,
          telefono: cliente.telefono,
        },
      });
    } else {
      this.setState({
        cliente: {
          nombre_tdocumento: "",
          direccion: "",
          telefono: "",
        },
      });
    }
  };

  handleChangeFormaPago = async (e, v) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        formaPago: v,
      },
    });
    let formap = this.state.formasPago.find(
      (formaPago) => formaPago.nombre === v
    );
    if (v !== "" && formap != undefined) {
      document.getElementById("check").disabled = true;
    } else if (v === "") {
      document.getElementById("check").disabled = false;
    }
  };

  handleChangeCheck = async (cb) => {
    await this.setState({
      check: cb.target.checked,
    });
    if (this.state.check) {
      document.getElementById("formaPago").disabled = true;
      this.setState({
        form: {
          ...this.state.form,
          formaPago: "",
        },
      });

      document.getElementById("formaPagoPersonalizada").disabled = false;
    } else if (!this.state.check) {
      this.setState({
        form: {
          ...this.state.form,
          formaPagoPersonalizada: "",
        },
      });
      document.getElementById("formaPago").disabled = false;
      document.getElementById("formaPagoPersonalizada").disabled = true;
    }
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    //this.validarCampos();
  };

  handleClose = async (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: false,
    });
  };

  handleAdd = () => {
    this.setState({
      rows: [
        ...this.state.rows,
        {
          cantidad: "",
          productoNombre: "",
          valorUnitario: "",
          valorTotal: "",
        },
      ],
      isEdit: true,
    });
  };

  handleEdit = (i) => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  handleSave = () => {
    this.setState({
      isEdit: !this.state.isEdit,
      rows: this.state.rows,
      disable: true,
      open: true,
    });
  };

  handleInputChange = (e, index) => {
    const list = [...this.state.rows];

    if (e.target.value > 0) {
      let nombreP = this.state.rows[index]["productoNombre"];
      let producto = this.state.productos.find(
        (producto) => producto.nombre === nombreP
      );
      list[index][e.target.name] = e.target.value;
      if (producto !== undefined) {
        list[index]["valorTotal"] =
          e.target.value * list[index]["valorUnitario"];
        this.setState({
          rows: list,
        });
      }
    } else {
      list[index][e.target.name] = e.target.value;
      list[index]["valorTotal"] = 0;
      this.setState({
        rows: list,
      });
    }
    if (
      this.state.rows[index]["productoNombre"] === "" ||
      this.state.rows[index]["cantidad"] === ""
    ) {
      this.setState({
        disable: true,
      });
    } else {
      this.setState({
        disable: false,
      });
    }
  };

  handleInputChangeProducto = (e, v, index) => {
    let producto = this.state.productos.find(
      (producto) => producto.nombre === v
    );
    if (producto !== undefined) {
      const list = [...this.state.rows];
      list[index]["productoNombre"] = v;
      list[index]["valorUnitario"] = producto.valor;
      if (list[index]["cantidad"] != undefined) {
        list[index]["valorTotal"] =
          list[index]["cantidad"] * list[index]["valorUnitario"];
      }
      this.setState({
        rows: list,
      });
    }
    if (
      this.state.rows[index]["productoNombre"] === "" ||
      this.state.rows[index]["cantidad"] === ""
    ) {
      this.setState({
        disable: true,
      });
    } else {
      this.setState({
        disable: false,
      });
    }
  };

  handleConfirm = () => {
    this.setState({
      showConfirm: true,
    });
  };

  handleRemoveClick = (i) => {
    const list = [...this.state.rows];
    list.splice(i, 1);
    this.setState({
      rows: list,
      showConfirm: false,
    });
  };

  handleNo = () => {
    this.setState({
      showConfirm: false,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="facturasFondo">
          <div
            id="formFactura"
            className="mx-auto"
            style={{ width: "95%", marginTop: "4%" }}
          >
            <div>
              <div className="sub1Factura" align="left">
                <img
                  className="logoPyme"
                  id="logoPyme"
                  src=""
                  height="130"
                  width="170"
                  alt="Cargando..."
                />
              </div>

              <div className="titulosFactura" align="center">
                <label
                  style={{
                    fontSize: "21px",
                    color: "rgb(4, 9, 32)",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.empresaCompleta.razonSocial}
                </label>
                <br />
                <label
                  style={{
                    fontSize: "14px",
                    color: "rgb(4, 9, 32)",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                    marginBottom: "1%",
                  }}
                >
                  {this.state.empresaCompleta.slogan}
                </label>
                <br />
                <label
                  style={{
                    fontSize: "14px",
                    color: "rgb(4, 9, 32)",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                  }}
                >
                  {this.state.empresaCompleta.nit}
                </label>
                <br />
                <hr />
                <label
                  style={{
                    fontSize: "13px",
                    color: "rgb(4, 9, 32)",
                    fontFamily: "Segoe UI",
                    textAlign: "center",
                  }}
                >
                  {this.state.empresaCompleta.direccion}&nbsp;-&nbsp;
                  {this.state.empresaCompleta.ciudad}&nbsp;&nbsp;•&nbsp;&nbsp;
                  {this.state.empresaCompleta.correoElectronico}
                  &nbsp;&nbsp;•&nbsp;&nbsp;{this.state.empresaCompleta.telefono}
                </label>
              </div>
              <div
                className="titulosFactura2"
                align="center"
                style={{
                  backgroundColor: "red",
                }}
              >
                <label>hola</label>
              </div>
            </div>
            <hr />
            <br />
            <AvForm id="registros">
              <Row style={{ marginTop: "1%" }}>
                <Col md="2">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="fechaEmision">
                      Fecha emisión
                    </Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="fechaEmision"
                      name="fechaEmision"
                      value={this.state.fechaEmision}
                      readOnly
                    />
                  </AvGroup>
                </Col>
                <Col md="2">
                  <AvGroup>
                    <Label
                      className="label-registroF"
                      htmlFor="fechaVencimiento"
                    >
                      Fecha vencimiento
                    </Label>
                    <InputGroup>
                      <AvInput
                        type="date"
                        className="form-control"
                        id="fechaVencimiento"
                        name="fechaVencimiento"
                        value={this.state.form.fechaVencimiento}
                        onChange={this.handleChange}
                        validate={{
                          required: {
                            value: true,
                          },
                        }}
                      />
                      <AvFeedback>
                        La fecha de vencimiento es requerida
                      </AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="ciudad">
                      Ciudad
                    </Label>
                    <Autocomplete
                      className="form-control"
                      sx={{
                        display: "inline-block",
                        "& input": {
                          width: 360,
                          bgcolor: "rgba(206, 206, 206, 0.397)",
                          color: (theme) =>
                            theme.palette.getContrastText(
                              theme.palette.background.paper
                            ),
                        },
                      }}
                      options={this.state.ciudades}
                      getOptionLabel={(option) => option.nombre}
                      filterSelectedOptions
                      id="custom-input-demo"
                      selectOnFocus
                      onInputChange={this.handleChangeCiudad}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                          <input
                            style={{
                              lineHeight: "100%",
                              border: "0",
                              background: "none",
                            }}
                            type="text"
                            {...params.inputProps}
                          />
                        </div>
                      )}
                    />
                  </AvGroup>
                </Col>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="cliente">
                      Cliente
                    </Label>
                    <Autocomplete
                      className="form-control"
                      sx={{
                        display: "inline-block",
                        "& input": {
                          width: 360,
                          bgcolor: "rgba(206, 206, 206, 0.397)",
                          color: (theme) =>
                            theme.palette.getContrastText(
                              theme.palette.background.paper
                            ),
                        },
                      }}
                      options={this.state.clientes}
                      getOptionLabel={(option) => option.nombre}
                      filterSelectedOptions
                      id="custom-input-demo"
                      selectOnFocus
                      onInputChange={this.handleChangeCliente}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                          <input
                            style={{
                              lineHeight: "100%",
                              border: "0",
                              background: "none",
                            }}
                            type="text"
                            {...params.inputProps}
                          />
                        </div>
                      )}
                    />
                  </AvGroup>
                </Col>
              </Row>
              <Row style={{ marginTop: "2%" }}>
                <Col md="3">
                  <AvGroup>
                    <Label
                      className="label-registroF"
                      htmlFor="nombre_tdocumento"
                    >
                      Tipo y número documento cliente
                    </Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="nombre_tdocumento"
                      name="nombre_tdocumento"
                      value={this.state.cliente.nombre_tdocumento}
                      readOnly
                    />
                  </AvGroup>
                </Col>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="direccion">
                      Dirección cliente
                    </Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="direccion"
                      name="direccion"
                      value={this.state.cliente.direccion}
                      readOnly
                    />
                  </AvGroup>
                </Col>
                <Col md="3">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="telefono">
                      Teléfono cliente
                    </Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      value={this.state.cliente.telefono}
                      readOnly
                    />
                  </AvGroup>
                </Col>
                <Col md="2"></Col>
              </Row>
              <Row style={{ marginTop: "2%" }}>
                <Col md="4">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="formaPago">
                      Forma de Pago
                    </Label>
                    <Autocomplete
                      className="form-control"
                      sx={{
                        display: "inline-block",
                        "& input": {
                          width: 360,
                          bgcolor: "rgba(206, 206, 206, 0.397)",
                          color: (theme) =>
                            theme.palette.getContrastText(
                              theme.palette.background.paper
                            ),
                        },
                      }}
                      options={this.state.formasPago}
                      getOptionLabel={(option) => option.nombre}
                      filterSelectedOptions
                      id="formaPago"
                      selectOnFocus
                      onInputChange={this.handleChangeFormaPago}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                          <input
                            style={{
                              lineHeight: "100%",
                              border: "0",
                              background: "none",
                            }}
                            type="text"
                            {...params.inputProps}
                          />
                        </div>
                      )}
                    />
                  </AvGroup>
                </Col>
                <Col md="2" style={{ marginTop: "2%" }}>
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="fechaEmision">
                      ¿F.Pago personalizada?&nbsp;&nbsp;
                    </Label>
                    <input
                      type="checkbox"
                      id="check"
                      name="check"
                      value={this.state.check}
                      onChange={this.handleChangeCheck.bind(this)}
                    />
                  </AvGroup>
                </Col>
                <Col md="6">
                  <AvGroup>
                    <Label className="label-registroF" htmlFor="fechaEmision">
                      Forma de pago personalizada
                    </Label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="formaPagoPersonalizada"
                      name="formaPagoPersonalizada"
                      value={this.state.form.formaPagoPersonalizada}
                      onChange={this.handleChange}
                    />
                  </AvGroup>
                </Col>
              </Row>
              <br />
              <br />
              <hr />
            </AvForm>

            <div className="parte2Facturas">
              <Snackbar
                open={this.state.open}
                autoHideDuration={2000}
                onClose={this.handleClose}
              >
                <Alert onClose={this.handleClose} severity="success">
                  ¡Registro(s) guardado con éxito!
                </Alert>
              </Snackbar>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {this.state.isEdit ? (
                  <div>
                    <Button onClick={this.handleAdd}>
                      <AddBoxIcon onClick={this.handleAdd} />
                      &nbsp;Agregar
                    </Button>
                    {this.state.rows.length !== 0 && (
                      <div>
                        {this.state.disable ? (
                          <Button
                            disabled
                            align="right"
                            onClick={this.handleSave}
                          >
                            <DoneIcon />
                            &nbsp;Guardar
                          </Button>
                        ) : (
                          <Button align="right" onClick={this.handleSave}>
                            <DoneIcon />
                            &nbsp;Guardar
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Button onClick={this.handleAdd}>
                      <AddBoxIcon onClick={this.handleAdd} />
                      &nbsp;Agregar
                    </Button>
                    <Button onClick={this.handleEdit}>
                      <CreateIcon />
                      &nbsp;Editar
                    </Button>
                  </div>
                )}
              </div>
              <br />
              <Table border="1" className="tableFactura" striped>
                <thead>
                  <tr align="center" textalign="center">
                    <th scope="col">Cantidad</th>
                    <th colSpan="2">Producto</th>
                    <th scope="col">Valor Unitario</th>
                    <th scope="col">Valor Total</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                {this.state.rows.map((row, i) => {
                  return (
                    <tbody align="center" textalign="center">
                      {this.state.isEdit ? (
                        <tr>
                          <td>
                            <input
                              type="number"
                              id="cantidad"
                              className="form-control"
                              value={row.cantidad}
                              name="cantidad"
                              onChange={(e) => this.handleInputChange(e, i)}
                            />
                          </td>
                          <td colSpan="2">
                            <Autocomplete
                              className="form-control"
                              sx={{
                                display: "inline-block",
                                "& input": {
                                  width: 480,
                                  bgcolor: "rgba(214, 214, 214, 0.555)",
                                  color: (theme) =>
                                    theme.palette.getContrastText(
                                      theme.palette.background.paper
                                    ),
                                },
                              }}
                              selectOnFocus
                              filterSelectedOptions
                              onInputChange={(e, v) =>
                                this.handleInputChangeProducto(e, v, i)
                              }
                              getOptionLabel={(option) => option.nombre}
                              name="productoNombre"
                              options={this.state.productos}
                              renderInput={(params) => (
                                <div ref={params.InputProps.ref}>
                                  <input
                                    style={{
                                      lineHeight: "100%",
                                      border: "0",
                                      background: "none",
                                    }}
                                    type="text"
                                    {...params.inputProps}
                                    value={row.productoNombre || undefined}
                                  />
                                </div>
                              )}
                            />
                          </td>
                          <td>
                            <input
                              value={row.valorUnitario}
                              name="valorUnitario"
                              className="form-control"
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              value={row.valorTotal}
                              name="valorTotal"
                              className="form-control"
                              readOnly
                            />
                          </td>
                          <td>
                            {this.state.isEdit ? (
                              <Button
                                className="mr10"
                                onClick={this.handleConfirm}
                              >
                                <ClearIcon />
                              </Button>
                            ) : (
                              <Button
                                className="mr10"
                                onClick={this.handleConfirm}
                              >
                                <DeleteOutlineIcon />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td>{row.cantidad}</td>
                          <td colSpan="2">{row.productoNombre}</td>
                          <td>{row.valorUnitario}</td>
                          <td>{row.valorTotal}</td>
                          <td component="th" scope="row">
                            {this.state.isEdit ? (
                              <Button
                                className="mr10"
                                onClick={this.handleConfirm}
                              >
                                <ClearIcon />
                              </Button>
                            ) : (
                              <Button
                                className="mr10"
                                onClick={this.handleConfirm}
                              >
                                <DeleteOutlineIcon />
                              </Button>
                            )}
                          </td>
                        </tr>
                      )}
                      {this.state.showConfirm && (
                        <div>
                          <Dialog
                            open={this.state.showConfirm}
                            onClose={this.handleNo}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Confirmar Eliminación"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                ¿Estas seguro de borrar el registro?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={() => this.handleRemoveClick(i)}
                                color="primary"
                                autoFocus
                              >
                                Sí
                              </Button>
                              <Button
                                onClick={this.handleNo}
                                color="primary"
                                autoFocus
                              >
                                No
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      )}
                    </tbody>
                  );
                })}
              </Table>
            </div>
          <br/><hr/>
            <div>
              <div className="footerFactura1" align="left">
                <Input
                style={{
                  fontSize: "0.9rem",
                  fontFamily: "sans-serif",
                  color: "rgb(65, 65, 65)",
                  fontWeight: "bold"
                }}
                  readOnly
                  id="valorLetras"
                  name="text"
                  type="textarea"
                  className="form-control"
                  rows="2"
                  value={this.state.textarea || ""}
                />
              </div>
              <div className="footerFactura2"></div>
              <div
                className="footerFactura3"
                align="right"
              >
                <Form>
                  <FormGroup row>
                  <Label className="labelsFooter" for="subtotal" sm={5}>Sub-Total: </Label>
                    <Col sm={7}>
                      <Input
                        id="sinBorde"
                        name="subtotal"
                        type="text"
                        readOnly
                        value={this.state.subtotal || ""}
                      />
                    </Col>
                  </FormGroup>
                  <br/>
                  <FormGroup row>
                  <Label check className="labelsFooter" for="subtotal" sm={5}>¿Incluye IVA?</Label>
                  <Col sm={1}><Input type="checkbox" /></Col>
                    <Col sm={6}>
                      <Input
                        id="sinBorde"
                        name="iva"
                        type="text"
                        readOnly
                        value={this.state.iva || ""}
                      />
                    </Col>
                  </FormGroup>
                  <br/>
                  <FormGroup row>
                  <Label className="labelsFooter" for="total" sm={5}>Total: </Label>
                    <Col sm={7}>
                      <Input
                        id="sinBorde"
                        name="total"
                        type="text"
                        readOnly
                        value={this.state.total || ""}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </div>
            </div>
            <br/><hr/>
            <div>
                <div
                  className="foot1"
                  align="left"
                >
                  <Label style={{ fontWeight: "bold", marginLeft: "4%", marginTop:"2%"}} >{this.state.asesor || ""}</Label>
                </div>
                <div
                  className="foot2"
                  align="center"
                >
                  <Button
                    id="botonValidar"
                    size="md"
                    outline
                    color="primary"
                    disabled={this.state.button === false}
                    style={{ fontWeight: "bold"}}
                  >
                    Crear
                  </Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

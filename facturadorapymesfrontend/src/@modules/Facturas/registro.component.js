import React from "react";
import service from "./factura.service";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import {
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Col,
} from "reactstrap";


import CreateIcon from "@material-ui/icons/Create";
import {
    Box, Button, Snackbar, Table,
    TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
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
      open:false,
      isEdit:false,
      disable:true,
      showConfirm:false,
      rows:[]
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
    this.completarInformacionEmpresa();
    this.consultarCiudades();
    this.consultarClientes();
    this.consultarLogo();
    this.consultarFormasPago();
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
      open: false
    });

  };

  handleAdd = () => {
    this.setState({
      
      rows: [
        ...this.state.rows,
        {
  
        id: this.state.rows.length + 1, 
        firstname: "",
        lastname: "", 
        city: ""
      }],
      isEdit: true
    });
  };

  handleEdit = (i) => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  };

  handleSave = () => {
    this.setState({
      isEdit: !this.state.isEdit,
      rows: this.state.rows,
      disable: true,
      open:true
    });
  };

  handleInputChange = (e, index) => {
    this.setState({
      disable: false
    });
    const list = [...this.state.rows];
    list[index][e.target.name]= e.target.value;

    this.setState({
      rows: list
    });
  };

  handleConfirm = () => {
    this.setState({
      showConfirm: true
    });
  };

  handleRemoveClick = (i) => {
    const list = [...this.state.rows];
    list.splice(i, 1);

    this.setState({
      rows: list,
      showConfirm: true
    });
  };

  handleNo = () => {
    this.setState({
      showConfirm: false
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
                    color: "#000227",
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
                    color: "#000227",
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
                    color: "#000227",
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
                    color: "#000227",
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
              <Row>
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
                    <Autocomplete
                      style={{ marginTop: "3%" }}
                      options={this.state.ciudades}
                      getOptionLabel={(option) => option.nombre}
                      filterSelectedOptions
                      id="select-on-focus"
                      selectOnFocus
                      sx={{ width: 300 }}
                      onInputChange={this.handleChangeCiudad}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Ciudad"
                          variant="standard"
                          required
                        />
                      )}
                    />
                  </AvGroup>
                </Col>
                <Col md="4">
                  <Autocomplete
                    style={{ marginTop: "3%" }}
                    options={this.state.clientes}
                    getOptionLabel={(option) => option.nombre}
                    filterSelectedOptions
                    id="select-on-focus"
                    selectOnFocus
                    sx={{ width: 300 }}
                    onInputChange={this.handleChangeCliente}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cliente"
                        variant="standard"
                        required
                      />
                    )}
                  />
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
                  <Autocomplete
                    style={{ marginTop: "3%" }}
                    options={this.state.formasPago}
                    getOptionLabel={(option) => option.nombre}
                    filterSelectedOptions
                    id="formaPago"
                    selectOnFocus
                    sx={{ width: 300 }}
                    onInputChange={this.handleChangeFormaPago}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Forma de Pago"
                        variant="standard"
                        value={this.state.form.formaPago || null}
                      />
                    )}
                  />
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





            <TableBody         style={{ backgroundColor:"red" }}>
      <Snackbar
        open={this.state.open}
        autoHideDuration={2000}
        onClose={this.handleClose}
      >
        <Alert onClose={this.handleClose} severity="success">
          ¡Registro guardado con éxito!
        </Alert>
      </Snackbar>
      <Box>
        <div>
          <div>
            {this.state.isEdit ? (
              <div>
                <Button onClick={this.handleAdd}>
                  <AddBoxIcon onClick={this.handleAdd} />
                  Agregar
                </Button>
                {this.state.rows.length !== 0 && (
                  <div>
                    {this.state.disable ? (
                      <Button disabled align="right" onClick={this.handleSave}>
                        <DoneIcon />
                        Guardar
                      </Button>
                    ) : (
                      <Button align="right" onClick={this.handleSave}>
                        <DoneIcon />
                        Guardar
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Button onClick={this.handleAdd}>
                  <AddBoxIcon onClick={this.handleAdd} />
                  Agregar
                </Button>
                <Button align="right" onClick={this.handleEdit}>
                  <CreateIcon />
                  Editar
                </Button>
              </div>
            )}
          </div>
        </div>
        <TableRow align="center"> </TableRow>
  
        <Table
          //className={classes.table}
          size="medium"
        >
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row, i) => {
              return (
                <div>
                  <TableRow>
                    {this.state.isEdit ? (
                      <div>
                        <TableCell padding="none">
                          <input
                            value={row.firstname}
                            name="firstname"
                            onChange={(e) => this.handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <input
                            value={row.lastname}
                            name="lastname"
                            onChange={(e) => this.handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <select
                            name="city"
                            value={row.city}
                            onChange={(e) => this.handleInputChange(e, i)}
                          >
                            <option value=""></option>
                            <option value="Karanja">Karanja</option>
                            <option value="Hingoli">Hingoli</option>
                            <option value="Bhandara">Bhandara</option>
                            <option value="Amaravati">Amaravati</option>
                            <option value="Pulgaon">Pulgaon</option>
                          </select>
                        </TableCell>
                      </div>
                    ) : (
                      <div>
                        <TableCell component="th" scope="row">
                          {row.firstname}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.lastname}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.city}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                        ></TableCell>
                      </div>
                    )}
                    {this.state.isEdit ? (
                      <Button className="mr10" onClick={this.handleConfirm}>
                        <ClearIcon />
                      </Button>
                    ) : (
                      <Button className="mr10" onClick={this.handleConfirm}>
                        <DeleteOutlineIcon />
                      </Button>
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
                  </TableRow>
                </div>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </TableBody>


          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import Connection from "../Connection/Consume";
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import "../Styles/Consultas.css";
import Logo from '../Images/LogoITS2-Sinfondo.png';


export default class ConsultarClientes extends React.Component {
    constructor() {
        super();
        this.state = {
            clientes: [],
            clientes2: [],
            busqueda: '',
            costumers: []
        }
    }

    definirDoc(documento){
        let abreviacion;
        if(documento==="Cédula de ciudadanía"){
            abreviacion="CC";
        }
        else if(documento==="Cédula de extranjería"){
            abreviacion="CE";
        }
        else if(documento==="Pasaporte"){
            abreviacion="PA";
        }
        else if(documento==="Número de identificación tributaria"){
            abreviacion="NIT";
        }
        else if(documento==="Registro único tributario"){
            abreviacion="RUT";
        }
        return abreviacion;
    }

    componentDidMount = async () => {
        let respuesta = null;
        respuesta = await Connection.consultar('cliente/consultarCustomersSaldo');
        this.setState({
            clientes: respuesta.data
        });
        
        this.setState({
            clientes2: this.state.clientes.map((c) => {
                return {
                    id: c.id,
                    documento: this.definirDoc(c.documento.nombre),
                    numeroDocumento: c.numeroDocumento,
                    nombres: c.nombres,
                    apellidos: c.apellidos,
                    ciudad: c.ciudad.nombre,
                    telefono: c.telefono,
                    email: c.email,
                    valorfacts: c.valorfacts
                };
            })
        });
    }

    onChange = async e => {
        e.persist();
        await this.setState({ busqueda: e.target.value });
        this.filtrarElementos();
    }

    filtrarElementos = () => {
        var search = this.state.clientes2.filter(item => {
            if (item.id.toString().includes(this.state.busqueda) ||
                item.numeroDocumento.toString().includes(this.state.busqueda) ||
                item.nombres.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.nombres.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.apellidos.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.apellidos.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.ciudad.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.ciudad.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.email.toLowerCase().includes(this.state.busqueda) ||
                item.email.toUpperCase().includes(this.state.busqueda)) {
                return item;
            }
            return null;
        });
        this.setState({ costumers: search });
    }
    
    render() {
        const columnas = [
            {
                name: 'ID',
                selector: 'id',
                sortable: true,
                width: "10%"
            },
            {
                name: 'Tipo documento',
                selector: 'documento',
                sortable: true
            },
            {
                name: 'Num. Documento',
                selector: 'numeroDocumento',
                sortable: true
            },
            {
                name: 'Nombres',
                selector: 'nombres',
                sortable: true
            },
            {
                name: 'Apellidos',
                selector: 'apellidos',
                sortable: true
            },
            {
                name: 'Ciudad',
                selector: 'ciudad',
                sortable: true
            },
            {
                name: 'Teléfono',
                selector: 'telefono',
                sortable: true
            },
            {
                name: 'E-mail',
                selector: 'email',
                sortable: true,
                width: "15%"
            },
            {
                name: 'Saldo en facturas',
                selector: 'valorfacts',
                sortable: true
            }
        ];
        const paginacionOpc = {
            rowsPerPageText: 'Filas por página',
            rangeSeparatorText: 'de',
            selectAllRowsItem: true,
            selectAllRowsItemText: 'Todos'
        }
        return (
                <div className="table-responsive">
                    <img src={Logo} height="75" width="220" style={{marginLeft:"30px",
                                                                    marginTop:"20px"}} alt="Logo ITS"/>
                    <div style={{
                    color: "#03083E",
                    fontSize:"35px",
                    fontFamily:"Segoe UI",
                    textAlign:"center",
                    fontWeight:"bold"}}><label>Clientes registrados ITS</label></div>
                    
                    <div style={{color: "#000227",
                    fontSize:"14px",
                    fontFamily:"Segoe UI",
                    textAlign:"center",
                    fontWeight:"bold"}}><label>Puedes consultar a traves del identificador, el número de identificación, nombres,apellidos, ciudad o e-mail</label></div>

                    <div className="barraBusqueda" align="center">
                        <input autocomplete="off" type="text" placeholder="🔍 Buscar" className="textField" name="Busqueda" value={this.state.busqueda} onChange={this.onChange} />
                    </div>
                    <DataTable
                        columns={columnas}
                        data={this.state.costumers}
                        title="Clientes"
                        pagination
                        paginationComponentOptions={paginacionOpc}
                        fixedHeader
                        fixedHeaderScrollHeight="900px"
                        noDataComponent={<span>No se encontró ningún registro</span>}
                    />
                    
                </div>
           
        );
    }
} 

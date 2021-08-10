import React from 'react';
import Logo from '../Images/LogoITS2-Sinfondo.png';
import Connection from "../Connection/Consume";
import DataTable from 'react-data-table-component';


export default class ConsultUsers extends React.Component{
    constructor(){
        super();
        this.state={
            usuarios:[],
            usuarios2:[],
            busqueda:'',
            users:[]
        }
    }

    definirNivel(nivel){
        let nombreNivel;
        if(nivel===0){
            nombreNivel="Administrador-Todos los permisos";
        }
        else if(nivel===1){
            nombreNivel="Permisos sobre facturas y clientes";
        }
        return nombreNivel;
    }

    componentDidMount =async() => {
        let respuesta=null;
        respuesta = await Connection.consultar('user/consultar');
        this.setState({
            usuarios: respuesta.data
        });

        this.setState({
            usuarios2: this.state.usuarios.map((user) => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    correo: user.correo,
                    telefono: user.telefono,
                    nivel: this.definirNivel(user.nivel)
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
        var search = this.state.usuarios2.filter(item => {
            if (item.id.toString().includes(this.state.busqueda) ||
                item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.correo.toLowerCase().includes(this.state.busqueda) || 
                item.correo.toUpperCase().includes(this.state.busqueda) || 
                item.telefono.toString().includes(this.state.busqueda) || 
                item.nivel.toLowerCase().includes(this.state.busqueda) ||
                item.nivel.toUpperCase().includes(this.state.busqueda)) {
                return item;
            }
            return null;
        });
        this.setState({ users: search });
    }

    render(){
        const columnas = [
            {
                name: 'Identificación',
                selector: 'id',
                sortable: true
            },
            {
                name: 'Nombre',
                selector: 'nombre',
                sortable: true
            },
            {
                name: 'E-mail',
                selector: 'correo',
                sortable: true
            },
            {
                name: 'Teléfono',
                selector: 'telefono',
                sortable: true
            },
            {
                name: 'Nivel',
                selector: 'nivel',
                sortable: true
            }
        ];
        const paginacionOpc = {
            rowsPerPageText: 'Filas por página',
            rangeSeparatorText: 'de',
            selectAllRowsItem: true,
            selectAllRowsItemText: 'Todos'
        }
        return(
            <div className="table-responsive">
                    <img src={Logo} height="75" width="220" style={{marginLeft:"30px",
                                                                    marginTop:"20px"}} alt="Logo ITS"/>
                    <div style={{
                    color: "#03083E",
                    fontSize:"35px",
                    fontFamily:"Segoe UI",
                    textAlign:"center",
                    fontWeight:"bold"}}><label>Usuarios registrados ITS</label></div>
                    
                    <div style={{color: "#000227",
                    fontSize:"14px",
                    fontFamily:"Segoe UI",
                    textAlign:"center",
                    fontWeight:"bold"}}><label>Puedes consultar a traves del identificador,el nombre, e-mail,teléfono o nivel</label></div>

                    <div className="barraBusqueda" align="center">
                        <input autocomplete="off" type="text" placeholder="🔍 Buscar" className="textField" name="Busqueda" value={this.state.busqueda} onChange={this.onChange} />
                    </div>
                    <DataTable
                        columns={columnas}
                        data={this.state.users}
                        title="Usuarios"
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
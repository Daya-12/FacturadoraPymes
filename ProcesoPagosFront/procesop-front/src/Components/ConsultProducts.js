import React from 'react';
import Connection from "../Connection/Consume";
import DataTable from 'react-data-table-component';
import Logo from '../Images/LogoITS2-Sinfondo.png';


export default class ConsultProducts extends React.Component{
    constructor(){
        super();
        this.state={
            productos:[],
            productos2:[],
            busqueda: '',
            prods:[]
        }
    }

    componentDidMount = async () => {
        let respuesta = null;
        respuesta = await Connection.consultar('producto/consultarProdsC');
        this.setState({
            productos: respuesta.data
        });
        this.setState({
            productos2: this.state.productos.map((p) => {
                return {
                    id: p.id,
                    descripcion: p.nombre,
                    valor: "$ "+p.valor,
                    categoria: p.categoria.nombre,
                    cantclientes: p.cantclientes
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
        var search = this.state.productos2.filter(item => {
            if (item.id.toString().includes(this.state.busqueda) ||
                item.descripcion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.descripcion.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.categoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ||
                item.categoria.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda) ) {
                return item;
            }
            return null;
        });
        this.setState({ prods: search });
    }
    
    render(){
        const columnas = [
            {
                name: 'Identificador',
                selector: 'id',
                sortable: true
            },
            {
                name: 'Descripción',
                selector: 'descripcion',
                sortable: true,
                width: "40%"
            },
            {
                name: 'Categoria',
                selector: 'categoria',
                sortable: true
            },
            {
                name: 'Valor',
                selector: 'valor',
                sortable: true
            },
            {
                name: 'Cant. clientes con este producto',
                selector: 'cantclientes',
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
                    fontWeight:"bold"}}><label>Productos registrados ITS</label></div>
                    
                    <div style={{color: "#000227",
                    fontSize:"14px",
                    fontFamily:"Segoe UI",
                    textAlign:"center",
                    fontWeight:"bold"}}><label>Puedes consultar a traves del identificador, la descripción o la categoría</label></div>

                    <div className="barraBusqueda" align="center">
                        <input autocomplete="off" type="text" placeholder="🔍 Buscar" className="textField" name="Busqueda" value={this.state.busqueda} onChange={this.onChange} />
                    </div>
                    <DataTable
                        columns={columnas}
                        data={this.state.prods}
                        title="Productos"
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
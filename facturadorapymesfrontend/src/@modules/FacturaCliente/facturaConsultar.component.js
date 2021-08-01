import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import service from "./facturaConsultar.service";
import Loading from "../Loagind/loading";
export default class ConsultarFactura extends React.Component{
    constructor(){
        super();
        this.state={
            refFactura:'',
            loading:false
        }
    }
    componentDidMount(){
        let refFactura = this.props.match.params.refFactura;
        this.setState({ refFactura: refFactura });
        this.consultarFactura();
        
    }
    consultarFactura = async () =>{
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
        let respuesta = null;
        //respuesta = await service.consultarFactura(this.refFactura);
    }
    render(){
        const f=this.state.refFactura;
        while(this.state.loading===true){
            return(<Loading/>);
        }
        return(
            <div className="container">
                <h1>hola, recibi tu factura con ref {f}</h1>
            </div>
        );
    }
}
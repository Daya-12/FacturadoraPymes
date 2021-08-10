import React, {Component} from 'react';

class BancoScreen extends Component {
    constructor() {
        super();

        this.state = {
            bancos: null
        };
    }

    componentDidMount() {
        //fetch or axios
        fetch('http://localhost:8080/bancos')
        .then(response => response.json())
        .then(bancosRecods => {
            console.log(bancosRecods);
            this.setState({
                bancos:bancosRecods
            });
        })
        .catch(error => console.error(error));
    }

    render(){ 
        /*
        const bancos = [{
            "id":1,
            "nombre":'Banco1'
        }];
        */

       let bancos;

        if (this.state.bancos === null) {
            bancos = [];
        } else {
            bancos = this.state.bancos;
        }

        //TODO: si nohay bancos pintar no hay bancos
        let bancotags = 
            bancos
            .map((banco) => (<tr><td>{banco.id_banco}</td><td>{banco.nombre_banco}</td></tr>));

        //TODO: remplacen todfos los table por un componente funcional

        //JSX
        return (
            <div>
                <h1>Banco</h1>
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                    </tr>
                    <tbody>
                        {bancotags}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BancoScreen;
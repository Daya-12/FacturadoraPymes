import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Menu extends React.Component{

    render(){
        return(
            <div className="container">
                <h1>Hola, este es el menu</h1>
                <a href="/Logout">Cerrar sesion</a>
            </div>
        );
    }
}
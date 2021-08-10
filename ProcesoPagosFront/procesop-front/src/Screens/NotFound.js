import React from 'react';
import Cabecera from "../Components/cabecera";
export default class NotFound extends React.Component {
    render() {
        return (
            <div class="container">
                <Cabecera></Cabecera>
                <div class="NotFound" style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold"
                }}>
                    <label style={{ fontSize: "75px", fontFamily: "Segoe UI", marginTop: "270px" }}>Página no encontrada</label>
                    <br></br>
                    <label style={{ fontSize: "20px", fontFamily: "Segoe UI" }}>404 Not Found</label>
                </div>
            </div>
        );
    }
}
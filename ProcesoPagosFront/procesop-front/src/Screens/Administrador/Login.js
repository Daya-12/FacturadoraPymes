import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import "../../Styles/LoginAdmin.css"
import { auhtUser } from "./utils";
import Swal from 'sweetalert2';
import bienvenido from '../../Images/bienvenido.png'
import bienvenido2 from '../../Images/bienvenido2.PNG'
class LoginAdmin extends React.Component {
    constructor() {
        super();
        this.state = {
            form: {
                correo: '',
                pass: '',
                nivel: ''
            }
        }

    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    validarEmail = () => {
        //eslint-disable-next-line
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(this.state.form.correo) && this.state.form.correo !== '') {
            return false;
        }
    }
    validarCampos = () => {
        if (this.state.form.correo === '' || this.state.form.pass === '') {
            return false;
        }
    }

    validarUsu = async () => {
        if (this.validarCampos() === false) {
            window.alert("¡Completa los campos vacios!");
        }
        else if (this.validarEmail() === false) {
            window.alert("¡Diligencia un correo valido!");
        }
        else {
            const result = await auhtUser(this.state.form.correo, this.state.form.pass);
            if (result.data.nivel === 0) {
                Swal.fire({
                    imageUrl: bienvenido,
                    imageWidth: 350,
                    imageHeight: 210,
                    imageAlt: 'Custom image',
                    timer: "3000"
                })

                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("user", JSON.stringify(result.data));
                const isAuthenticated = localStorage.getItem("isAuthenticated");
                isAuthenticated ? this.props.history.replace('/Menu') : window.alert("Error");
            }
            else if (result.data.nivel === 1) {
                Swal.fire({
                    imageUrl: bienvenido2,
                    imageWidth: 350,
                    imageHeight: 210,
                    imageAlt: 'Custom image',
                    timer: "3000"
                })
            }
            else {
                window.alert("Usuario o contraseña incorrecto");
            }


        }
    }

    render() {
        return (
            <div class="container">
                <div class="background-image">
                    <div class="row justify-content-center pt-5 mt-5 m-1">
                        <div class="col-md-4 formulario">
                            <form>
                                <div class="form-group text-center pt-4 pb-4">
                                    <h3 class="text-light">INICIAR SESIÓN</h3>
                                </div>
                                <div class="form-group mx-sm-4">
                                    <input autocomplete="off" type="email" class="form-control" placeholder="Correo electronico" name='correo' onChange={this.handleChange} required />
                                </div>
                                <br></br>
                                <div class="form-group mx-sm-4">
                                    <input autocomplete="off" type="password" class="form-control" placeholder="Contraseña" name='pass' onChange={this.handleChange} required />
                                </div>
                                <br></br><br></br>
                                <div class="form-row">
                                    <div class="form-group col-md-4">
                                        <br />
                                    </div>
                                    <div class="form-group col-md-4">
                                        <Button color="primary" onClick={() => this.validarUsu()}>INGRESAR</Button>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <br />
                                    </div>
                                </div>
                                <br></br>
                                <div class="form-group mx-sm-4 text-center pb-3">
                                    <span><a href="!#" class="recuperarpass">¿Olvidaste tu contraseña?</a></span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                </div>
            </div>
        );
    }
}
export default LoginAdmin;

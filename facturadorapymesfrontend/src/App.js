import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from "./@routes/index";
import Home from './@modules/Home/home.component';
import Login from './@modules/Login/login.component';
import NotFound from './@modules/NotFound/notFound.component';
import ConsultarFactura from './@modules/FacturaCliente/facturaConsultar.component';
import Logout from './@modules/Login/logout';
import MenuAdministrador from './@modules/Menu/menuAdministrador.component';
import RegistroPyme from './@modules/Pymes/registro.component';
import RegistroNuevoUsuario from './@modules/Usuarios/registroNuevo.component';
import ActualizarEliminarUsuarios from './@modules/Usuarios/actualElimin.component';
import ConsultarUsuarios from './@modules/Usuarios/consultar.component';
import RegistroProducto from './@modules/Productos/registro.component';
export default function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <PrivateRoute exact path="/Menu/registrarProductos" component={RegistroProducto}/>
          <PrivateRoute exact path="/Menu/consultarUsuarios" component={ConsultarUsuarios}/>
          <PrivateRoute exact path="/Menu/actualizarEliminarUsuarios" component={ActualizarEliminarUsuarios}/>
          <PrivateRoute exact path="/Menu/registrarUsuarios" component={RegistroNuevoUsuario}/>
          <PrivateRoute exact path="/MenuAdministrador/:idEmpresa" component={MenuAdministrador}/>
          <PrivateRoute exact path="/Logout" component={Logout}/>
          <Route exact path="/Registrarse" component={RegistroPyme}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/consultaFactura/:refFactura" component={ConsultarFactura}/>
          <Route exact path="/" component={Home}/>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}
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
import ConsultarProductos from './@modules/Productos/consultar.component';
import RegistroProducto from './@modules/Productos/registro.component';
import ActualizarEliminarProductos from './@modules/Productos/actualElimin.component';
import ConsultarClientes from './@modules/Clientes/consultar.component';
import RegistroClientes from './@modules/Clientes/registro.component';
import ActualizarEliminarClientes from './@modules/Clientes/actualElimin.component';
import RegistroFactura from './@modules/Facturas/registro.component';
import ConsultarAnularFacturas from './@modules/Facturas/consultarAnular.component';

export default function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <PrivateRoute exact path="/Menu/consultarAnularFacturas" component={ConsultarAnularFacturas}/>
          <PrivateRoute exact path="/Menu/crearFacturas" component={RegistroFactura}/>
          <PrivateRoute exact path="/Menu/consultarClientes" component={ConsultarClientes}/>
          <PrivateRoute exact path="/Menu/actualizarEliminarClientes" component={ActualizarEliminarClientes}/> 
          <PrivateRoute exact path="/Menu/registrarClientes" component={RegistroClientes}/>
          <PrivateRoute exact path="/Menu/consultarProductos" component={ConsultarProductos}/>
          <PrivateRoute exact path="/Menu/actualizarEliminarProductos" component={ActualizarEliminarProductos}/> 
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
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from "./@routes/index";
import Home from './@modules/Home/home.component';
import Login from './@modules/Login/login.component';
import NotFound from './@modules/NotFound/notFound.component';
import ConsultarFactura from './@modules/FacturaCliente/facturaConsultar.component';
import Logout from './@modules/Login/logout';
import MenuAdministrador from './@modules/Menu/menuAdministrador.component';

export default function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <PrivateRoute exact path="/MenuAdministrador/:idEmpresa" component={MenuAdministrador}/>
          <PrivateRoute exact path="/Logout" component={Logout}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/consultaFactura/:refFactura" component={ConsultarFactura}/>
          <Route exact path="/" component={Home}/>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}
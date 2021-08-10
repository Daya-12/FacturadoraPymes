import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from "./Components/Routes/PrivateRouter"
import Principal from './Screens/Principal/Principal';
import LoginAdmin from './Screens/Administrador/Login';
import MenuAdmin from './Screens/Administrador/MenuAdmin';
import createUser from './Components/CreateUsers';
import createProductos from './Components/CreateProducts';
import createClientes from './Components/CreateCustomers';
import consultarClientes from './Components/ConsultCustomers';
import consultarProductos from './Components/ConsultProducts';
import consultarUsers from './Components/ConsultUsers';
import Logout from './Screens/Administrador/Logout';
import NotFound from './Screens/NotFound'
import UpdateDeleteUsers from './Components/UpdateDeleteUsers';
import UpdateDeleteProducts from './Components/UpdateDeleteProducts';
import UpdateDeleteCustomers from './Components/UpdateDeleteCustomers';

export default function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <PrivateRoute exact path="/Menu" component={MenuAdmin}/>
          <PrivateRoute exact path="/Menu/createProducts" component={createProductos} />
          <PrivateRoute exact path="/Menu/createUser" component={createUser}/>
          <PrivateRoute exact path="/Menu/consultCustomers" component={consultarClientes}/>
          <PrivateRoute exact path="/Menu/consultProducts" component={consultarProductos}/>
          <PrivateRoute exact path="/Menu/consultUsers" component={consultarUsers}/>
          <PrivateRoute exact path="/Menu/createCustomers" component={createClientes} />
          <PrivateRoute exact path="/Menu/updateordeleteU" component={UpdateDeleteUsers} />
          <PrivateRoute exact path="/Menu/updateordeleteP" component={UpdateDeleteProducts}/>
          <PrivateRoute exact path="/Menu/updateordeleteC" component={UpdateDeleteCustomers}/>
          <PrivateRoute exact path="/Logout" component={Logout}/>
          <Route exact path="/Login" component={LoginAdmin}/>
          <Route exact path="/" component={Principal}/>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}



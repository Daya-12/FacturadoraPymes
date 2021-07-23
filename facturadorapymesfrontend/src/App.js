import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './@modules/Home/home.component';
import NotFound from './@modules/NotFound/notFound.component';

export default function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}
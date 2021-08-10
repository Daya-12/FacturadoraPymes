import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Appnavegation extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <BrowserRouter>
              <Switch>
                <Route path='/Principal' exact>
                  <Principal></Principal>
                </Route>
                <Route exact path='/' render={({history})=> {
                  <LoginAdmin history={history} ></LoginAdmin>
                }} />
              </Switch>
            </BrowserRouter>
        );
    }


}export default Appnavegation;
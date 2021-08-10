import {Route,Redirect} from 'react-router-dom';
export default function PrivateRoute({
    component:Component,
    logout,
    ...routerProps
}){
    const isAuthenticated = localStorage.getItem("isAuthenticated"); 
    return (
        <Route {...routerProps} render={(props)=>{
            if(isAuthenticated){
                return <Component logout={logout}/>
            }else{
                return <Redirect to={{pathname : '/Login', state:{from: props.location}} }/>
            }
        }}/>
    );
};


import react from "react";
import {useHistory} from "react-router-dom";

export default function Logout (){
    const history=useHistory();
    react.useEffect(()=>{
        localStorage.removeItem('user');
        localStorage.removeItem("isAuthenticated");
        history.replace("/");
    },[]);
    return null;
}
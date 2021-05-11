import {Redirect} from "react-router-dom";
import { getToken } from "../../utils/localStorage";


const renderPublicRoute = (Component) => (params)  => {
    const token = getToken();
    if(!token) {
        return <Component {...params}/>
    }
    return <Redirect to='/'/>
}

export default renderPublicRoute;

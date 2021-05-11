import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Chat from "./components/chat/index";
import SignUp from "./components/register/index";
import Login from "./components/login/index";
import renderPublicRoute from "./components/publicRoute/index";
import renderPrivateRoute from "./components/privateRoute/index";
import PasswordRecovery from "./components/passwordRecovery/index";

import './normalize.css'
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path='/' exact render={renderPrivateRoute(Chat)}/>
                    <Route path='/register' exact render={renderPublicRoute(SignUp)}/>
                    <Route path='/login' exact render={renderPublicRoute(Login)}/>
                    <Route path='/recovery' exact render={renderPublicRoute(PasswordRecovery)}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;

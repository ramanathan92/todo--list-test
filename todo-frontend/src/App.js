import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";


function App() {

  const logOut = () => {
    localStorage.setItem("sessionUserName","");
    document.getElementById("navbar-elements").style.display = "flex";
    document.getElementById("navbar-elements-log-out").style.display = "none";
  }

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>TODO - FRONTEND</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul id="navbar-elements" className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
            <ul id="navbar-elements-log-out" className="navbar-nav ml-auto">
              <li className="nav-item" onClick={() => logOut()}>
                <Link className="nav-link" to={"/sign-in"}>Log out</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={Login} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
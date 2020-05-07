import React, { Component } from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import Employees from "./pages/Employees";
import Offices from "./pages/Offices";
import Equipment from "./pages/Equipment";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import "./App.css";
import SideNavBar from "./components/SideNav/SideNav";
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import Admin  from './pages/Admin';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Register}/>
          <SideNavBar />
          <UnPrivateRoute path="/admin" roles={["admin"]} component={Admin}/>
          <UnPrivateRoute path="/catsolutions" component={Home} />
          <UnPrivateRoute path="/offices" component={Offices} />
          <UnPrivateRoute path="/employees" component={Employees} />
          <UnPrivateRoute path="/equipment" component={Equipment} />
          <UnPrivateRoute path="/contact" component={Contact} />
      </BrowserRouter>      
    );
  }
}

export default App;

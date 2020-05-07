import React, { Component } from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import Employees from "./pages/Employees";
import Offices from "./pages/Offices";
import Equipment from "./pages/Equipment";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import "./App.css";
import SideNavBar from "./components/SideNav/SideNav";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
            <SideNavBar />
          <Route path="/catsolutions" component={Home} />
          <Route path="/offices" component={Offices} />
          <Route path="/employees" component={Employees} />
          <Route path="/equipment" component={Equipment} />
          <Route path="/contact" component={Contact} />
      </BrowserRouter>      
    );
  }
}

export default App;

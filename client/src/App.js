import React, { Component } from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import Employees from "./pages/Employees";
import Offices from "./pages/Offices";
import Equipment from "./pages/Equipment";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Nav />
          <Route path="/catsolutions" component={Home} />
          <Route path="/offices" component={Offices} />
          <Route path="/employees" component={Employees} />
          <Route path="/equipment" component={Equipment} />
          <Route path="/contact" component={Contact} />
          <Footer />
      </BrowserRouter>
    );
  }
}

export default App;

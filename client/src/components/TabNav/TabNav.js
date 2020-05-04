import React from 'react'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"
import { useLocation } from "react-router-dom";
import "./TabNav.css"
export default function TabNav() {
    const location = useLocation();
    return (
        <Navbar bg="white" expand="lg" className="mr-2 ml-5">
            <Navbar.Brand href="#home" className="ml-3"> CAT-Solutions</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/catsolutions"
                        className={location.pathname === "/catsolutions" ? "active" : ""}>
                        Home
                    </Nav.Link>
                    <Nav.Link href="/offices"
                        className={location.pathname === "/offices" ? "active" : ""}>
                        Offices
                    </Nav.Link>
                    <Nav.Link href="/employees"
                        className={location.pathname === "/employees" ? "active" : ""}>
                        Employees
                    </Nav.Link>
                    <Nav.Link href="/equipment"
                        className={location.pathname === "/equipment" ? "active" : ""}>
                        Equipment
                    </Nav.Link>
                    <Nav.Link href="/contact"
                        className={location.pathname === "/contact" ? "active" : ""}>
                        Contact
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
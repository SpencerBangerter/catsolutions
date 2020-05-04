import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import SideNavBar from "../components/SideNav/SideNav";
import "./page.css";
export default function HomePage() {
    return (
        <div>
            <Navbar expand="lg" className="mr-5 pt-3">
                <Navbar.Brand href="#home" className="ml-auto mr-5"> CAT-Solutions
            </Navbar.Brand>
            </Navbar>
            <div className="container shadow-sm">
                <Row>
                    <Col className="ml-5">
                        <hr />
                        <div className="page-header">
                            <h1 className="ml-3">Home</h1>
                        </div>
                        <hr />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

import React from 'react'
import { Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./page.css";
export default function HomePage() {
    return (
        <div>
            <Navbar className="mr-5 pt-3 shadow">
                <Navbar.Brand className="ml-auto">
                    <i className="fas fa-cat mr-5" style={{ color: "#ffffff", fontSize: "1.6em" }}></i>
                </Navbar.Brand>
            </Navbar>
            <div className="container shadow-sm">
                <Row>
                    <Col>
                        <div className="page-header">
                            <h1 className=" mb-5 pb-3 page-headerText">
                                Dashboard
                            </h1>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

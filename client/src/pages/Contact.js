import React from "react";
import { Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./page.css";
import SideNavBar from "../components/SideNav/SideNav";

export default function ContactPage() {
  return (
    <div>
      <SideNavBar />

      <Navbar className="mr-5 pt-3 shadow">
        <Navbar.Brand className="ml-auto">
          <i
            className="fas fa-cat"
            style={{ color: "#ffffff", fontSize: "1.6em" }}
          ></i>
        </Navbar.Brand>
      </Navbar>
      <div className="container shadow-sm">
        <Row>
          <Col>
            <div className="page-header">
              <h1 className=" mb-5 pb-3 page-headerText">Contact</h1>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

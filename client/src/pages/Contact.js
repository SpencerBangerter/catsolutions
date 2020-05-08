import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./page.css";
import SideNavBar from "../components/SideNav/SideNav";
import {useHistory} from "react-router-dom";
import AuthService from '../Services/AuthService';

export default function ContactPage() {
  let history = useHistory();

  function handleLogout(){
    AuthService.logout().then(history.push("/"));
  }
  
  return (
    <div>
      <SideNavBar />
      <Navbar className="mr-5 pt-3 shadow">
        <Navbar.Text onClick={handleLogout} className="ml-auto">
        <i className="fas fa-sign-out-alt mr-1" style={{ color: "#ffffff" }} />
          logout
        </Navbar.Text>
        <Navbar.Brand>
          <i
            className="fas fa-cat mr-5 ml-5"
            style={{ color: "#ffffff", fontSize: "1.6em" }}
          ></i>
        </Navbar.Brand>
      </Navbar>
      <div className="container-fluid shadow-sm">
        <div className="mainbodycontainer">
          <Row>
            <Col>
              <div className="page-header">
                <h1 className=" mb-5 pb-3 page-headerText">Contact Us</h1>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">

            <Col sm={6}>
              <Card className="mb-5">
                <Card.Header as="h1" className="text-center contact-header">
                  <i className="fas fa-user-tag float-left" style={{color: "#ffffff"}}></i>
                  Thyago Volpatto
                  </Card.Header>
                <Card.Text style={{background: "#F2F2F2"}} as="h4" className="text-center pt-2 pb-2">
                  - Backend and dashboard -
                </Card.Text>
                <Card.Body>
                  <Button
                    variant="outline-info"
                    size="lg"
                    className="mt-1"
                    href="https://github.com/tvolpatto"
                    target="_blank"
                  >
                    <i className="fab fa-github mr-3"></i>
                    Github
                  </Button>
                  <Button
                    variant="outline-info"
                    size="lg"
                    className="mt-1 float-right"
                    href="mailto:tvolpatto@gmail.com?"
                    target="_blank"
                  >
                    <i className="far fa-envelope mr-3"></i>
                    Email
                  </Button>
                  <hr />
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6}>
              <Card className="mb-5">
                <Card.Header as="h1" className="text-center contact-header">
                  <i className="fas fa-user-cog float-left" style={{color: "#ffffff"}}></i>
                  Spencer Bangerter
                </Card.Header>
                <Card.Text style={{background: "#F2F2F2"}} as="h4" className="text-center pt-2 pb-2">
                  - Backend and front-end fuctionality -
                </Card.Text>
                <Card.Body>
                  {/* <Card.Title as="h2" className="text-center">Developer</Card.Title> */}
                  <Button
                    variant="outline-info"
                    size="lg"
                    className="mt-1"
                    href="https://github.com/SpencerBangerter"
                    target="_blank"
                  >
                    <i className="fab fa-github mr-3"></i>
                    Github
                  </Button>
                  <Button
                    variant="outline-info"
                    size="lg"
                    className="mt-1 float-right"
                    href="mailto:bangerter.spencer@gmail.com?"
                    target="_blank"
                  >
                    <i className="far fa-envelope mr-3"></i>
                    Email
                  </Button>
                  <hr />
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6}>
              <Card className="mb-5">
                <Card.Header as="h1" className="text-center contact-header">
                  <i className="fas fa-user-shield float-left" style={{color: "#ffffff"}}></i>
                  Weston Meier
                </Card.Header>
                <Card.Text style={{background: "#F2F2F2"}} as="h4" className="text-center pt-2 pb-2">
                  - Backend and authentication -
                </Card.Text>
                <Card.Body>
                  {/* <Card.Title as="h2" className="text-center">Developer</Card.Title> */}
                  <Button
                    variant="outline-info"
                    size="lg"
                    className="mt-1"
                    href="https://github.com/westonbmeier"
                    target="_blank"
                  >
                    <i className="fab fa-github mr-3"></i>
                    Github
                  </Button>
                  <Button
                    variant="outline-info"
                    size="lg"
                    className="mt-1 float-right"
                    href="mailto:westonbrigmeier@gmail.com?"
                    target="_blank"
                  >
                    <i className="far fa-envelope mr-3"></i>
                    Email
                  </Button>
                  <hr />
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6}>
              <Card className="mb-5">
                <Card.Header as="h1" className="text-center contact-header">
                  <i className="fas fa-user-edit float-left" style={{color: "#ffffff"}}></i>
                  Matthew Grimes
                </Card.Header>
                <Card.Text style={{background: "#F2F2F2"}} as="h4" className="text-center pt-2 pb-2">
                  - Front-end functionality and styling -
                </Card.Text>
                <Card.Body>
                  {/* <Card.Title as="h2" className="text-center">Developer</Card.Title> */}
                  <Button
                    variant="outline-info"
                    size="lg"
                    className="mt-1"
                    href="https://github.com/matthewlgrimes94"
                    target="_blank"
                  >
                    <i className="fab fa-github mr-3"></i>
                    Github
                  </Button>
                  <Button
                    variant="outline-info"
                    size="lg"
                    className="mt-1 float-right"
                    href="mailto:matthewlgrimes94@gmail.com?"
                    target="_blank"
                  >
                    <i className="far fa-envelope mr-3"></i>
                    Email
                  </Button>
                  <hr />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

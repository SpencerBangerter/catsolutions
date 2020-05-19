import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import SideNavBar from "../components/SideNav/SideNav";
import AuthService from "../Services/AuthService";
import API from "../utils/API";
import { Navbar, Row, Col, Button, Form } from "react-bootstrap";


export default function Admin() {
    let history = useHistory();
    const [usersList, setUsersList] = useState({});

    function handleLogout() {
        AuthService.logout().then(history.push("/"));
    }

    function loadUsers() {
        API.getUsers().then(response => setUsersList(response.data));

    }

    const handleInputChange = (event, user) => {
        const selectedRole = event.target.value;
        if (user) {
            user.role = selectedRole
            API.updateUsers(user._id, user).then(
                setUsersList(
                    usersList.map((u) => {
                        if (u._id === user._id) {
                            return { ...u, role: selectedRole };
                        }
                        return u;
                    })
                )
            );
        }
    };

    useEffect(() => {
        loadUsers();
    }, [])


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
                            <div className="page-header shadow-sm">
                                <h1 className="mb-5 pb-3 page-headerText">Admin</h1>
                            </div>
                            {usersList.length ? (usersList.map(
                                (user) => <div key={user._id + "box"} className="userBox mb-3 ml-3">
                                    <div className="ml-3 mt-3">
                                        <h4 style={{ fontFamily: 'Arvo, serif' }}> Account: {user.username} </h4>
                                        <hr />
                                        <Form>
                                            <Form.Group controlId={user._id}>
                                                <Form.Control as="select" value={user.role} custom onChange={(e) => handleInputChange(e, user)}>
                                                    <option value="user"> user </option>
                                                    <option value="admin"> admin </option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </div>))

                                : <div></div>}
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
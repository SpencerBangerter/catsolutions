import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import {MessageRegister} from '../components/Message';
import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
import "./page.css";

const Register = props => {
    const [user, setUser] = useState({ username: "", password: "", role: "user" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setUser({ username: "", password: "", role: "" });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
        });
    }



    return (
        <div>
            <Navbar className="mr-5 pt-3 shadow">
                <Navbar.Text>
                    <h4 style={{ fontFamily: "Arvo, serif", color: "#ffffff" }}>
                        CAT-Solutions
                    </h4>
                </Navbar.Text>
                <Navbar.Brand className="ml-auto">
                    <i
                        className="fas fa-cat mr-5"
                        style={{ color: "#ffffff", fontSize: "1.6em" }}>
                    </i>
                </Navbar.Brand>
            </Navbar>
            <div className="page-header text-center">
                <h1 className="page-header-text ml-5 pb-2">Create Account</h1>
            </div>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <form onSubmit={onSubmit}>
                            <label htmlFor="username" className="sr-only">Username: </label>
                            <input type="text"
                                name="username"
                                value={user.username}
                                onChange={onChange}
                                className="form-control mb-4"
                                placeholder="Username"
                                />
                            <label htmlFor="password" className="sr-only">Password: </label>
                            <input type="password"
                                name="password"
                                value={user.password}
                                onChange={onChange}
                                className="form-control mb-4"
                                placeholder="Password"
                                />
                            <label htmlFor="role" className="sr-only">Role: </label>
                            <div className="mt-3">
                                <Button
                                    size="lg"
                                    variant="outline-success"
                                    type="submit"
                                    disabled={(user.username && user.password ? false : true)}
                                    >
                                    <i className="far fa-user mr-2"></i>
                                    Create Account
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline-info float-right"
                                    onClick={() => props.history.push("/")}
                                    >
                                    <i className="far fa-arrow-alt-circle-left mr-2"></i>
                                    Go to Login
                                    </Button>
                                {message ? <MessageRegister message={message} /> : null}
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div >

    )
}

export default Register;
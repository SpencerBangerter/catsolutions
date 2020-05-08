import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../components/Message';
import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
import { AuthContext } from '../Context/AuthContext';

const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/catsolutions');
            }
            else
                setMessage(message);
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
                <h1 className="page-header-text ml-5 pb-2">Log In</h1>
            </div>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <form onSubmit={onSubmit}>
                            <label htmlFor="username" className="sr-only">Username: </label>
                            <input type="text"
                                name="username"
                                onChange={onChange}
                                className="form-control mb-4"
                                placeholder="Enter Username" />
                            <label htmlFor="password" className="sr-only">Password: </label>
                            <input type="password"
                                name="password"
                                onChange={onChange}
                                className="form-control mb-4"
                                placeholder="Enter Password" />
                            <div className="mt-3">
                                <Button
                                    size="lg"
                                    variant="outline-success"
                                    type="submit"
                                    disabled={(user.username && user.password ? false : true)}
                                    >
                                    <i className="far fa-user mr-2"></i>
                                    Log in
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline-info float-right"
                                    onClick={() => props.history.push("/register")}
                                    >
                                    <i className="far fa-arrow-alt-circle-right mr-2"></i>
                                    Create Account
                                    </Button>
                                    {message ? <Message message={message} /> : null}
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Login;
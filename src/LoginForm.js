import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import LoginContext from "./contexts/LoginContext";
import { Card, CardBody, Form, FormGroup, Row, Label, Input, Button } from "reactstrap";


function LoginForm() {
    const INITIAL_STATE = {
        username: "",
        password: ""
    };

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState(INITIAL_STATE);

    const handleLogin = useContext(LoginContext)

    const handleChange = e => {
        const { name, value } = e.target;
        setLoginData(loginData => ({
            ...loginData,
            [name]: value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        handleLogin(loginData);
        setLoginData(INITIAL_STATE);
        navigate("/");
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h4 className="display-4 mb-5 mt-5 text-center">Login</h4>
            <Card>
                <CardBody>
                    <Form className="custom-form" onSubmit={handleSubmit}>
                        <Row>
                            <FormGroup>
                                <Label htmlFor="username">Username: </Label>
                                <Input 
                                    onChange={handleChange}
                                    type="text"
                                    name="username"
                                    value={loginData.username}
                                    id="username"
                                />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label htmlFor="password">Password: </Label>
                                <Input 
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    id="password"
                                />
                            </FormGroup>
                        </Row>
                        <FormGroup>
                            <Button>Login</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
            <div>
                <h4 className="mt-5 text-center">Don't have an account? Sign up <Link to="/signup">here</Link></h4>
            </div>
        </div>
    );
}

export default LoginForm;
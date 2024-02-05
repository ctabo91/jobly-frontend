import React, {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import SignupContext from "./contexts/SignupContext";
import { Card, CardBody, Form, FormGroup, Row, Label, Input, Button } from "reactstrap";


function SignUpForm() {
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };

    const navigate = useNavigate();

    const [signupData, setSignupData] = useState(INITIAL_STATE);

    const handleSignup = useContext(SignupContext)

    const handleChange = e => {
        const { name, value } = e.target;
        setSignupData(signupData => ({
            ...signupData,
            [name]: value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        handleSignup(signupData);
        setSignupData(INITIAL_STATE);
        navigate("/");
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h4 className="display-4 mb-3 mt-3 text-center">Sign Up</h4>
            <Card>
                <CardBody>
                    <Form className="custom-form" onSubmit={handleSubmit}>
                        <Row>
                            <FormGroup>
                                <Label htmlFor="firstName">First Name: </Label>
                                <Input 
                                    onChange={handleChange}
                                    type="text"
                                    name="firstName"
                                    value={signupData.firstName}
                                    id="firstName"
                                />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label htmlFor="lastName">Last Name: </Label>
                                <Input 
                                    onChange={handleChange}
                                    type="text"
                                    name="lastName"
                                    value={signupData.lastName}
                                    id="lastName"
                                />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label htmlFor="email">Email: </Label>
                                <Input 
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={signupData.email}
                                    id="email"
                                />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label htmlFor="username">Username: </Label>
                                <Input 
                                    onChange={handleChange}
                                    type="text"
                                    name="username"
                                    value={signupData.username}
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
                                    value={signupData.password}
                                    id="password"
                                />
                            </FormGroup>
                        </Row>
                        <FormGroup>
                            <Button>Signup</Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
            <div>
                <h4 className="mt-4 text-center">Already have an account? Login <Link to="/login">here</Link></h4>
            </div>
        </div>
    );
}

export default SignUpForm;
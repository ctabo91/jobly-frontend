import React, { useState, useContext } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import JoblyApi from "./api";
import { Card, CardBody, Form, FormGroup, Row, Label, Input } from "reactstrap";
import "./Card.css";


function Profile() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const INITIAL_STATE = {
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: "",
    };

    const [ userData, setUserData ] = useState(INITIAL_STATE);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let updatedData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
        }

        let username = userData.username;
        let updatedUser;
        
        try{
            updatedUser = await JoblyApi.update(username, updatedData);
        } catch (err) {
            console.error("Error updating user profile:", err);
        }

        setUserData(INITIAL_STATE);

        setCurrentUser(updatedUser);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setUserData(userData => ({
            ...userData,
            [name]: value
        }));
    };

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h4 className="display-4 text-center mb-5 mt-5">Update Profile</h4>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <FormGroup>
                                <Label className="mb-0"><strong>Username</strong></Label>
                                <Input 
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    id="username"
                                />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label className="mb-0" htmlFor="firstName"><strong>First Name</strong></Label>
                                <Input 
                                    onChange={handleChange}
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
                                    id="firstName"
                                />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label className="mb-0" htmlFor="lastName"><strong>Last Name</strong></Label>
                                <Input 
                                    onChange={handleChange}
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName}
                                    id="lastName"
                                />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label className="mb-0" htmlFor="email"><strong>Email</strong></Label>
                                <Input 
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    id="email"
                                />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label className="mb-0" htmlFor="password"><strong>Confirm password to make changes:</strong></Label>
                                <Input 
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    id="password"
                                />
                            </FormGroup>
                        </Row>
                        <FormGroup>
                            <button className="btn btn-primary btn-block mt-3">Update User</button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default Profile;
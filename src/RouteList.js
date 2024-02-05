import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Profile from "./Profile";
import CurrentUserContext from "./contexts/CurrentUserContext";


function RouteList() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Home />} />

                <Route path="/login" element={<LoginForm />} />

                <Route path="/signup" element={<SignUpForm />} />

                {currentUser ? (
                    <>
                        <Route exact path="/companies" element={<CompanyList />} />

                        <Route path="/companies/:handle" element={<JobList />} />

                        <Route path="/jobs" element={<JobList />} />

                        <Route path="/profile" element={<Profile />} />
                    </>
                ) : (
                    <>
                        <Route path="/companies" element={<Navigate to="/login" replace />} />

                        <Route path="/companies/:handle" element={<Navigate to="/login" replace />} />

                        <Route path="/jobs" element={<Navigate to="/login" replace />} />

                        <Route path="/profile" element={<Navigate to="/login" replace />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default RouteList;
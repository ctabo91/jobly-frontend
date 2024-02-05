import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import CurrentUserContext from "./contexts/CurrentUserContext";


function NavBar({ onLogout }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const logout = () => onLogout()

    return (
        <div>
            <Navbar expand="md">
                <NavLink to="/" className="navbar-brand">
                Home
                </NavLink>

                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink to="/companies">Companies</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/jobs">Jobs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/profile">Profile</NavLink>
                    </NavItem>
                    <NavItem>
                    {!currentUser ? <NavLink to="/login">Login</NavLink>   
                                   :
                                    <NavLink to="/" onClick={logout} className="nav-link">Logout</NavLink>
                    }
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;
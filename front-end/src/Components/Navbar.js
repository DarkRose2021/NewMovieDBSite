import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../App.scss";
import { Navbar, Container } from "react-bootstrap";

const NavBar = ({ siteName, contentComponent }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const hasToken = localStorage.getItem('token');

    const openNav = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSignOut = () => {
        localStorage.removeItem('token')
        window.location.reload()
      }
    
    // Function to determine if the link should be disabled based on the current route
    const isLinkDisabled = (pathname) => {
        return pathname === "/";
    };

    //To check if there is a token in rhw storage

    return (
        <>
            <div id="mySidebar" className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <a href="/login">Login</a>
                <a href="/signup">Sign Up</a>
                <a href="/review">Review</a>
            </div>

            <Navbar className="navBar" >
                <Container>
                    <Navbar.Brand
                        className="openbtn"
                        onClick={openNav}>
                        <div>
                            {sidebarOpen ? (
                                <i className="bi bi-x-lg h2"></i>
                                    ) : (
                                <i className="bi bi-list h2"></i>
                                    )}
                                </div>
                    </Navbar.Brand>

                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-between">
                        <Navbar.Text className="mx-auto">
                            <h2>
                                {isLinkDisabled(location.pathname) ? (
                                    <span>{siteName}</span>
                                ) : (
                                    <a href="/" className="homeLink">{siteName}</a>
                                )}
                            </h2>
                        </Navbar.Text>
                      {hasToken ? (
                        <Navbar.Text>
                            {/* Change to a toggle to show login   signup when not logged in */}
                            <h1>Your In</h1>
                            <i className="bi bi-person-circle h1"></i>
                            <a onClick={handleSignOut} >Log Out</a>
                        </Navbar.Text>
                      ) : (
                        <Navbar.Text>
                        <NavLink to='/login'>
                            Login
                        </NavLink>
                        </Navbar.Text>
                      )

                      }  
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div id="main" >
                {/* Content */}
                {contentComponent}
            </div>
        </>
    );
};

export default NavBar;
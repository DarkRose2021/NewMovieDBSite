import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.scss";
import { Navbar, Container } from "react-bootstrap";

const NavBar = ({ siteName, contentComponent }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const openNav = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Function to determine if the link should be disabled based on the current route
    const isLinkDisabled = (pathname) => {
        return pathname === "/";
    };

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
                                {/* Conditionally render the href attribute */}
                                {isLinkDisabled(location.pathname) ? (
                                    <span>{siteName}</span>
                                ) : (
                                    <a href="/">{siteName}</a>
                                )}
                            </h2>
                        </Navbar.Text>
                        
                        <Navbar.Text>
                            {/* Change to a toggle to show login   signup when not logged in */}
                            <i className="bi bi-person-circle h1"></i>
                        </Navbar.Text>
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
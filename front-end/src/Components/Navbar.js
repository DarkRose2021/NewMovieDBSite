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
        localStorage.removeItem('user')
        localStorage.removeItem('role')

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
                <a href="/">Movies</a>
                <a href="/search">Search</a>
                <a href="/reviews">Reviews</a>
               
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
                                    <span className="homeLink">{siteName}</span>
                                ) : (
                                    <a href="/" className="homeLink">{siteName}</a>
                                )}
                            </h2>
                        </Navbar.Text>
                    <Navbar.Text>
                      {hasToken ? (
                          <>
                          <div className="d-flex align-items-center">
                              <i className="bi bi-person-circle h1 navIcon"></i>
                              <span className="mx-2"></span>
                          </div>
                          <a onClick={handleSignOut} className="homeLink" >Log Out</a>
                      </>
                        ) : (
                                <NavLink to='/login' className="homeLink">
                                    Login
                                </NavLink>
                        )
                      }  
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
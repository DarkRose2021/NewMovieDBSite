import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const NavBar = () => {
  return (
   <Navbar bg= 'dark' expand="lg">
    <Container>
    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
    </Container>
    </Navbar>
  )
}

export default NavBar

//The bar that goes across the screen 
import React from 'react';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const BasicForm = () => {


    return (
        <>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand href="#home">Proctor Portal</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
            <Nav>
                <NavDropdown title="Not Signed In" id="collasible-nav-dropdown">
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        <div id="loginbox">
            <div id="login-button"></div>
        </div>    
        </>
    )
}

export default BasicForm;
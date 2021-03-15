import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './../logo_accexible.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Header() {
    const [logeado, setLogeado] = useState(localStorage.getItem("user") ? true : false)
    const [expanded, setExpanded] = useState(false);

    function collapseNav() {
        setTimeout(() => { setExpanded(false) }, 150);
    }

    function logout() {
        collapseNav();
        localStorage.removeItem("user");
        setLogeado(false);
    }

    function ControlPanel() {
        if (!logeado) {
            return (
                <Nav className="ml-auto">
                    <Link onClick={collapseNav} className="nav-link" to="/login">Iniciar sesión</Link>
                    <Link onClick={collapseNav} className="nav-link" to="/register">Registrarse</Link>
                </Nav>
            )
        }
        return (
            <Nav className="ml-auto">
                <Link onClick={collapseNav} className="nav-link" to="#">Test</Link>
                <Link onClick={collapseNav} className="nav-link" to="#">Chatbot</Link>
                <Link onClick={collapseNav} className="nav-link" to="#">Ver perfil</Link>
                <Link onClick={collapseNav} className="nav-link" to="#">Resultados</Link>
                <Link onClick={logout} className="nav-link" to="/">Cerrar sesión</Link>
            </Nav>
        )
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" expanded={expanded}>
                <Link onClick={collapseNav} to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ControlPanel />
                </Navbar.Collapse>
            </Navbar>
        </header >
    )
}

export default Header;
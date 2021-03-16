import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './../logo_accexible.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { getCookie, deleteCookie } from './Functions';

function Header() {
    //const [logeado, setLogeado] = useState(localStorage.getItem("user") ? true : false)
    const [cookieUser, setCookieUser] = useState(getCookie("userId"))
    const [cookieToken, setCookieToken] = useState(getCookie("loginToken"))
    const [expanded, setExpanded] = useState(false);

    function collapseNav() {
        setTimeout(() => { setExpanded(false) }, 150);
    }

    function logout() {
        collapseNav();
        setCookieUser(undefined);
        setCookieToken(undefined);
        deleteCookie("userId")
        deleteCookie("loginToken")
    }

    function ControlPanel() {
        if (!cookieUser || !cookieToken) {
            return (
                <Nav className="ml-auto">
                    <Link onClick={collapseNav} className="nav-link" to="/login">Iniciar sesión</Link>
                    <Link onClick={collapseNav} className="nav-link" to="/register">Registrarse</Link>
                </Nav>
            )
        }
        return (
            <Nav className="ml-auto">
                <Link onClick={collapseNav} className="nav-link" to="/test">Test</Link>
                <Link onClick={collapseNav} className="nav-link" to="#">Chatbot</Link>
                <Link onClick={collapseNav} className="nav-link" to="/profile">Ver perfil</Link>
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
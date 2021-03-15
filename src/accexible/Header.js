import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './../logo_accexible.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';


function Header() {
    const logeado = false;

    function ControlPanel() {
        if (!logeado) {
            return (
                <Nav className="ml-auto">
                    <Link className="nav-link" to="/login">Iniciar sesión</Link>
                    <Link className="nav-link" to="/register">Registrarse</Link>
                </Nav>
            )
        }
        return (
            <Nav className="ml-auto">
                <Link to="#">Ver resultados</Link>
                <Link to="#">Test</Link>
                <Link to="#">Chatbot</Link>
                <Link to="#">Ver perfil</Link>
                <Link to="/logout">Cerrar sesión</Link>
            </Nav>
        )
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ControlPanel />
                </Navbar.Collapse>
            </Navbar>
        </header >
    )
}

export default Header;
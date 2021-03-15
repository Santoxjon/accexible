import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './../logo_accexible.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Header() {
    const logeado = false;

    function ControlPanel() {
        if (!logeado) {
            return (
                <Nav className="ml-auto">
                    <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
                    <Nav.Link href="/register">Registrarse</Nav.Link>
                </Nav>
            )
        }
        return (
            <Nav className="ml-auto">
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        )
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
                <Navbar.Brand href="#home">
                    <img src={logo} alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ControlPanel />
                </Navbar.Collapse>
            </Navbar>
        </header >
    )
}

export default Header;
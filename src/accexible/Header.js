import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './../logo_accexible.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Header() {
    const logeado = true;

    function ControlPanel() {
        if (!logeado) {
            return (
                <Nav className="ml-auto">
                    <Nav.Link href="/login">Iniciar sesión</Nav.Link>
                    <Nav.Link href="/register">Registrarse</Nav.Link>
                </Nav>
            )
        }
        return (
            <Nav className="ml-auto">
                <Nav.Link href="#">Ver resultados</Nav.Link>
                <Nav.Link href="#">Test</Nav.Link>
                <Nav.Link href="#">Chatbot</Nav.Link>
                <Nav.Link href="#">Ver perfil</Nav.Link>
                <Nav.Link href="/logout">Cerrar sesión</Nav.Link>
            </Nav>
        )
    }

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
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
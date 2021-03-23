import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { getCookie, setCookie } from '../Functions';
import { API_URL } from './../Consts';
import { Link, Redirect } from 'react-router-dom';

function Login() {
    const [newUsername, setNewUsername] = useState("");
    const [newUsernamePassword, setNewUsernamePassword] = useState("");
    const [loginMessageAlert, setLoginMessageAlert] = useState("");
    const [cookieTime, setCookieTime] = useState(1);
    const [keepLogged, setKeepLogged] = useState(false);

    function readUsername(e) {
        setNewUsername(e.target.value)
    }

    function readUsernamePassword(e) {
        setNewUsernamePassword(e.target.value)
    }

    function keepUserLoggedIn() {
        setKeepLogged(!keepLogged);
        setCookieTime(6000)
    }


    function insertNewUser(e) {
        e.preventDefault();

        var addNewUser = {
            email: newUsername,
            password: newUsernamePassword
        }

        var fetchNewUser = {
            method: 'POST',
            body: JSON.stringify(addNewUser),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch(`${API_URL}/users/login`, fetchNewUser)
            .then(respuesta => respuesta.json())
            .then(data => {
                if (data.status === 0) {
                    const _id = data.user._id;
                    const email = data.user.email;

                    const headers = {
                        body: JSON.stringify({ _id, email }),
                        method: "PUT",
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    };

                    fetch(`${API_URL}/users/updateToken`, headers)
                        .then(res => res.json())
                        .then(res => {
                            setCookie("userId", res._id, cookieTime);
                            setCookie("loginToken", res.loginToken, cookieTime);
                        })
                        .then(() => window.location = "/")
                } else if (data.status === 1) {
                    setLoginMessageAlert("Contraseña incorrecta")
                } else {
                    setLoginMessageAlert("Usuario no existente")
                }
            })
    }

    if (!getCookie("userId")) {
        return (
            <Form id="loginForm" onSubmit={insertNewUser}>
                <h1>Iniciar Sesión</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Dirección de correo</Form.Label>
                    <Form.Control
                        required
                        name="email"
                        value={newUsername}
                        onChange={readUsername}
                        type="email"
                        placeholder="Introduce tu correo electrónico"
                    />
                    <Form.Text className="text-alert">
                        {loginMessageAlert}
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Introduce tu contraseña</Form.Label>
                    <Form.Control
                        required
                        name="password"
                        value={newUsernamePassword}
                        type="password"
                        placeholder="Contraseña"
                        onChange={readUsernamePassword}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        checked={keepLogged}
                        label="Mantener la sesión iniciada"
                        onChange={keepUserLoggedIn}
                    />
                </Form.Group>
                <Form.Group className="formSubmitGroup">
                    <Link to="/register">No tengo cuenta</Link>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Entrar
                </Button>
                </Form.Group>

            </Form>
        )
    }
    else {
        return (
            <Redirect to="/" />
        )
    }
}

export default Login;
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { setCookie } from '../Functions';


function Login() {
    const [newUsername, setNewUsername] = useState("");
    const [newUsernamePassword, setNewUsernamePassword] = useState("");
    const [loginMessageAlert, setLoginMessageAlert] = useState("");

    function readUsername(event) {
        setNewUsername(event.target.value)
    }

    function readUsernamePassword(event) {
        setNewUsernamePassword(event.target.value)
    }

    function introduceNewUser(e) {
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

        fetch('http://localhost:9000/users/login', fetchNewUser)
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

                    fetch(`http://localhost:9000/users/updateToken`, headers)
                        .then(res => res.json())
                        .then(res => {
                            setCookie("userId", res._id, 1);
                            setCookie("loginToken", res.loginToken, 1);
                        })
                        .then(() => window.location = "/")
                } else if (data.status === 1) {
                    setLoginMessageAlert("Contraseña incorrecta")
                } else {
                    setLoginMessageAlert("Usuario no existente")
                }
            })
    }

    return (
        // <Form method="POST" action="http://localhost:9000/users/login">
        <Form id="loginForm" onSubmit={introduceNewUser}>
            <h1>Iniciar Sesión</h1>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Dirección de correo</Form.Label>
                <Form.Control required name="email" value={newUsername} onChange={readUsername} type="email" placeholder="Introduce tu correo electrónico" />
                <Form.Text className="text-alert">
                    {loginMessageAlert}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Introduce tu contraseña</Form.Label>
                <Form.Control required name="password" value={newUsernamePassword} onChange={readUsernamePassword} type="password" placeholder="Contraseña" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Entrar
            </Button>
        </Form>
    )
}

export default Login;
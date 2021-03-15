import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';


function Login() {
    const [newUsername, setNewUsername] = useState("");
    const [newUsernamePassword, setNewUsernamePassword] = useState("");

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
                alert(data.mensaje)
            })
    }


    return (
        // <Form method="POST" action="http://localhost:9000/users/login">
        <Form id="loginForm" onSubmit={introduceNewUser}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Dirección de correo</Form.Label>
                <Form.Control required name="email" value={newUsername} onChange={readUsername} type="email" placeholder="Introduce tu correo electrónico" />
                <Form.Text className="text-muted">

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
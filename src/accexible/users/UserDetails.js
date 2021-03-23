import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import React, { useState, useEffect } from 'react';
import { checkEmail, getCookie } from '../Functions';
import { Redirect, Link } from 'react-router-dom';
import { API_URL, EMAIL_REGEX, FULLNAME_REGEX } from './../Consts';

function UserDetails() {
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [oldEmail, setOldEmail] = useState("")

    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");

    const [updateMessage, setUpdateMessage] = useState("");
    const [alertVisibility, setAlertVisibility] = useState(true);

    const btnStatus = emailError === "" && nameError === "" ? false : true;

    useEffect(() => {
        fetch(`${API_URL}/users/checkToken?id=${userCookie.userId}&token=${userCookie.loginToken}`)
            .then(res => res.json())
            .then(res => {
                setNewName(res.name);
                setOldEmail(res.email);
                setNewEmail(res.email);
            });
    }, []);

    useEffect(() => {
        if (newName === "" || FULLNAME_REGEX.test(newName)) {
            setNameError("");
        }
        else {
            setNameError("Nombre no válido, solo letras");
        }
    }, [newName])

    useEffect(() => {
        if (newEmail === "" || EMAIL_REGEX.test(newEmail.toLowerCase())) {
            if (checkSameEmail()) {
                setEmailError("");
            }
            else {
                checkEmail(newEmail)
                    .then(user => {
                        if (user) {
                            setEmailError("Email en uso")
                        }
                        else {
                            setEmailError("")
                        }
                    });
            }
        }
        else {
            setEmailError("Email no válido!")
        }
    }, [newEmail])

    function updateUser(e) {
        e.preventDefault();
        var editOldUser = {
            name: newName,
            email: newEmail,
            id: userCookie.userId
        }

        var fetchOldUser = {
            method: 'PUT',
            body: JSON.stringify(editOldUser),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch(`${API_URL}/users/updateUser`, fetchOldUser)
            .then(res => res.json())
            .then(() => {
                setAlertVisibility(true);
                setUpdateMessage("Datos actualizados con éxito!")
            });
    }

    function checkSameEmail() {
        if (oldEmail === newEmail) {
            return true;
        }
        return false;
    }

    function AlertMessage() {
        if (updateMessage !== "") {
            if (alertVisibility) {
                return (
                    <Alert variant="success" onClose={() => setAlertVisibility(false)} dismissible>
                        Datos actualizados con éxito!
                    </Alert>
                );
            }
        }
        return (<></>)
    }

    if (userCookie.userId && userCookie.loginToken) {
        return (
            <>
                <Form
                    id="updateForm"
                    onSubmit={updateUser}
                >
                    <h1>Detalles del perfil</h1>
                    <AlertMessage />
                    <Form.Group>
                        <Form.Label>Nombre y apellidos</Form.Label>
                        <Form.Control
                            type="text"
                            value={newName}
                            id="inputname"
                            name="name"
                            minLength="6"
                            maxLength="20"
                            onChange={(e) => setNewName(e.target.value)}
                            required
                        />
                        <Form.Text className="text-alert" >
                            {nameError}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={newEmail}
                            id="inputemail"
                            name="email"
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                        />
                        <Form.Text className="text-alert" >
                            {emailError}
                        </Form.Text>
                    </Form.Group>
                    <Link to="/changePassword">¿Quieres cambiar tu contraseña?</Link>
                    <Button
                        type="submit"
                        disabled={btnStatus}
                    >
                        Actualizar
                    </Button>
                </Form>
            </>
        )
    } else {
        return (
            <Redirect to="/login" />
        )
    }

}

export default UserDetails;
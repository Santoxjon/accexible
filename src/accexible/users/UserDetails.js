import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import React, { useState, useEffect } from 'react';
import { getCookie } from '../Functions';
import { Redirect } from 'react-router-dom';

function UserDetails() {
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [newUsername, setNewUsername] = useState(undefined);
    const [newEmail, setNewEmail] = useState(undefined);
    const [oldEmail, setOldEmail] = useState("")

    const [emailError, setEmailError] = useState("");

    const [updateMessage, setUpdateMessage] = useState("");
    const [alertVisibility, setAlertVisibility] = useState(true);

    const inputStatus = !(newUsername && newEmail);
    const btnStatus = emailError === "" ? false : true;

    useEffect(() => {
        fetch(`http://localhost:9000/users/checkToken?id=${userCookie.userId}&token=${userCookie.loginToken}`)
            .then(res => res.json())
            .then(res => {
                setNewUsername(res.name);
                setOldEmail(res.email);
                setNewEmail(res.email);
            });
    }, []);

    useEffect(() => {
        checkEmail();
    }, [newEmail])

    function updateUser(e) {
        e.preventDefault();
        var editOldUser = {
            name: newUsername,
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

        fetch(`http://localhost:9000/users/updateUser`, fetchOldUser)
            .then(res => res.json())
            .then(() => {
                setAlertVisibility(true);
                setUpdateMessage("Datos actualizados con éxito!")
            });
    }

    function checkEmail(e) {
        if (oldEmail === newEmail) {
            setEmailError("");
        }
        else {
            fetch(`http://localhost:9000/users/checkEmail?email=${newEmail}`)
                .then(res => res.json())
                .then((user) => {
                    if (user) {
                        setEmailError("Email en uso")
                    }
                    else {
                        setEmailError("")
                    }
                });
        }
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
                <Form id="updateForm" onSubmit={updateUser}>
                    <h1>Detalles del perfil</h1>
                    <AlertMessage />
                    <Form.Group>
                        <Form.Label>Nombre y apellidos</Form.Label>
                        <Form.Control disabled={inputStatus} type="text" value={newUsername} id="inputname" name="name" onChange={(e) => setNewUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control disabled={inputStatus} type="email" value={newEmail} id="inputemail" name="email" onChange={(e) => setNewEmail(e.target.value)} />
                        <Form.Text className="text-alert" >
                            {emailError}
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" disabled={btnStatus}>
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
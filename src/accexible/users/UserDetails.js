import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { getCookie, deleteCookie } from '../Functions';
import { Redirect } from 'react-router-dom';

function UserDetails() {

    let [userCookie, setUserCookie] = useState({ userId: getCookie("userId"), loginToken: getCookie("loginToken") });
    let [usernameEdit, setUsernameEdit] = useState("");
    let [userEmailEdit, setUserEmailEdit] = useState("");
    let [usernameChange, setUsernameChange] = useState("");
    let [userEmailChange, setUserEmailChange] = useState("");
    let [userIdEdit, setUserIdEdit] = useState("");
    let [userPasswordEdit, setUserPasswordEdit] = useState("");
    let [userPasswordChange, setUserPasswordChange] = useState("");
    
function readUsernameEdit(event) {
    setUsernameChange(event.target.value)
}

function readUserEmailEdit(event) {
    setUserEmailChange(event.target.value)
}

function readUserPasswordEdit(event) {
    setUserPasswordChange(event.target.value)
}

function editUser(e) {
    e.preventDefault();
    console.log(usernameChange, userEmailChange)
    var editOldUser = {
        name: usernameChange,
        email: userEmailChange,
        password: userPasswordChange,
        id: userIdEdit
    }

    var fetchOldUser = {
        method: 'PUT',
        body: JSON.stringify(editOldUser),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }

    fetch(`http://localhost:9000/users/updateuser?userId=${userCookie.userId}&loginToken=${userCookie.loginToken}`, fetchOldUser)
    .then(respuesta => respuesta.json())
    .then((data => console.log(data)))
}

    useEffect(() => {
        console.log(userCookie)
        fetch(`http://localhost:9000/users/checkloggeduser?userId=${userCookie.userId}&loginToken=${userCookie.loginToken}`)
            .then(res => res.json())
            .then(res => {
                setUsernameEdit(res.name)
                setUserEmailEdit(res.email)
                setUserIdEdit(res._id)
                setUserPasswordEdit(res.password)
            }
            )
    }, [])

    if (userCookie.userId && userCookie.loginToken) {

        return (
            <>
            <Form id="updateForm" onSubmit={editUser}>
                <Form.Group>
                    <Form.Label>Nombre y apellidos</Form.Label>
                    <Form.Control type="text" placeholder={usernameEdit} id="inputname" name="name" onChange={readUsernameEdit}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder={userEmailEdit} id="inputemail" name="email" onChange={readUserEmailEdit} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" id="inputpassword" name="password" onChange={readUserPasswordEdit} />
                </Form.Group>
                <Button type="submit" >
                    Enviar
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
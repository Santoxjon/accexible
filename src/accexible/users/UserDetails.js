import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { getCookie, deleteCookie } from '../Functions';
import { Redirect } from 'react-router-dom';

function UserDetails() {

    const [userCookie, setUserCookie] = useState({ userId: getCookie("userId"), loginToken: getCookie("loginToken") });
    const [usernameEdit, setUsernameEdit] = useState("");
    const [userEmailEdit, setUserEmailEdit] = useState("");
    const [usernameChange, setUsernameChange] = useState("");
    const [userEmailChange, setUserEmailChange] = useState("");
    const [userIdEdit, setUserIdEdit] = useState("");
    const [userPasswordEdit, setUserPasswordEdit] = useState("");
    const [userPasswordChange, setUserPasswordChange] = useState("");

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

    useEffect(() => {

        let regExNumber = new RegExp(/[0-9]/, 'g')  //must contain one digit from 0-9
        let regExCapital = new RegExp(/[A-Z]/, 'g') //must contain 1 character from A-Z

        if ((userPasswordEdit.length > 7 && userPasswordEdit.length < 21) && regExNumber.test(userPasswordEdit) && regExCapital.test(userPasswordEdit)) {

        }
        else {

            if (!(userPasswordEdit.length > 7 && userPasswordEdit.length < 21)) {

            }
            else {

            }
            if (!regExNumber.test(userPasswordEdit)) {

            }
            else {

            }
            if (!regExCapital.test(userPasswordEdit)) {

            }
            else {

            }
        }
    }, [userPasswordEdit])

    if (userCookie.userId && userCookie.loginToken) {

        return (
            <>
                <Form id="updateForm" onSubmit={editUser}>
                    <Form.Group>
                        <Form.Label>Nombre y apellidos</Form.Label>
                        <Form.Control required type="text" placeholder={usernameEdit} id="inputname" name="name" onChange={readUsernameEdit} />
                      
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder={userEmailEdit} id="inputemail" name="email" onChange={readUserEmailEdit} />
                       
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control required type="password" id="inputpassword" name="password" onChange={readUserPasswordEdit} />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
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
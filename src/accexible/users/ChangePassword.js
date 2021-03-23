import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
import { Link, Redirect } from 'react-router-dom';
import { API_URL } from './../Consts';

function ChangePassword() {

    const userCookie = { userId: getCookie("userId") };
    const [newPass, setPass] = useState("");
    const [passRep, setPassRep] = useState("");
    const [errorLength, setErrorLength] = useState("");
    const [errorNumber, setErrorNumber] = useState("");
    const [errorMayus, setErrorMayus] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const buttonStatus = !(passwordsMatch && passwordIsValid);

    function setValues(event) {
        switch (event.target.id) {
            case "inputpassword":
                setPass(event.target.value);
                break;
            case "inputreppassword":
                setPassRep(event.target.value);
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        if (passRep === newPass) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }, [passRep, newPass])

    useEffect(() => {
        let regExNumber = new RegExp(/\d/)
        let regExCapital = new RegExp(/[A-Z]/);
        let regExLength = new RegExp(/^([a-zA-Z0-9_-]){8,20}$/);
        let regExFull = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)

        if (regExFull.test(newPass)) {
            setPasswordIsValid(true);
            setErrorLength("");
            setErrorNumber("");
            setErrorMayus("");
        }
        else {
            setPasswordIsValid(false);
            if (!regExLength.test(newPass)) {
                setErrorLength("Contraseña entre 8 y 20 caracteres.");
            }
            else {
                setErrorLength("");
            }
            if (!regExNumber.test(newPass)) {
                setErrorNumber("Mínimo 1 número");
            }
            else {
                console.log("Ya hay un número");
                setErrorNumber("");
            }
            if (!regExCapital.test(newPass)) {
                setErrorMayus("Mínimo 1 mayúscula");
            }
            else {
                setErrorMayus("");
            }
        }
    }, [newPass])



    function updatePassword(e) {
        e.preventDefault();
        var editOldPassword = {
            password: newPass,
            id: userCookie.userId
        }

        var fetchEditOldPassword = {
            method: 'PUT',
            body: JSON.stringify(editOldPassword),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        fetch(`${API_URL}/users/changePassword`, fetchEditOldPassword)
            .then(res => res.json())
            .then(() => {
                window.location = "/profile"
            });
    }

    if (userCookie.userId) {
        return (
            <>
                <Form
                    id="passwordForm"
                    onSubmit={updatePassword}
                >
                    <h1>Cambio de contraseña</h1>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nueva contraseña"
                            required
                            value={newPass}
                            id="inputpassword"
                            name="password"
                            onChange={setValues}
                        />
                        <Form.Text className="text-alert" >
                            {errorLength}
                        </Form.Text>
                        <Form.Text className="text-alert">
                            {errorMayus}
                        </Form.Text>
                        <Form.Text className="text-alert">
                            {errorNumber}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Repetir Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repetir contraseña"
                            required
                            id="inputreppassword"
                            value={passRep}
                            onChange={setValues}
                        />
                    </Form.Group>
                    <Form.Group className="formSubmitGroup">
                        <Link to="/profile">Volver al perfil</Link>
                        <Button
                            type="submit"
                            disabled={buttonStatus}
                        >
                            Enviar
                        </Button>
                    </Form.Group>
                </Form>
            </>
        )
    } else {
        return (
            <Redirect to="/login" />
        )
    }
}


export default ChangePassword;
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { API_URL, EMAIL_REGEX, FULLNAME_REGEX } from './../Consts';
import { checkEmail, getCookie } from '../Functions';
import { Link, Redirect } from 'react-router-dom';

function Register() {

    const [newName, setName] = useState("");
    const [newEmail, setEmail] = useState("");
    const [newPass, setPass] = useState("");
    const [passRep, setPassRep] = useState("");
    const [errorLength, setErrorLength] = useState("");
    const [errorNumber, setErrorNumber] = useState("");
    const [errorMayus, setErrorMayus] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorName, setErrorName] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [nameIsValid, setNameIsValid] = useState(false)
    const buttonStatus = !(passwordsMatch && passwordIsValid && emailIsValid && nameIsValid);

    function setValues(e) {
        switch (e.target.id) {
            case "inputName":
                setName(e.target.value);
                break;
            case "inputEmail":
                setEmail(e.target.value);
                break;
            case "inputPassword":
                setPass(e.target.value);
                break;
            case "inputRepPassword":
                setPassRep(e.target.value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (newName === "" || FULLNAME_REGEX.test(newName)) {
            setErrorName("");
            setNameIsValid(true);
        }
        else {
            setErrorName("Nombre no válido, solo letras");
            setNameIsValid(false);
        }
    }, [newName])

    useEffect(() => {
        if (newEmail === "" || EMAIL_REGEX.test(newEmail.toLowerCase())) {
            checkEmail(newEmail)
                .then(user => {
                    if (!user) {
                        setErrorEmail("");
                        setEmailIsValid(true);
                    }
                    else {
                        setErrorEmail("Ese email ya está en uso");
                        setEmailIsValid(true);
                    }
                })
        }
        else {
            setErrorEmail("El email no es válido!");
            setEmailIsValid(false);
        }
    }, [newEmail])

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
                setErrorLength("Contraseña entre 8 y 20 caracteres");
            }
            else {
                setErrorLength("");
            }
            if (!regExNumber.test(newPass)) {
                setErrorNumber("Mínimo 1 número");
            }
            else {
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

    if (!getCookie("userId")) {
        return (
            <>
                <Form
                    id="registerForm"
                    action={`${API_URL}/users/register`}
                    method="POST"
                >
                    <h1>Registro</h1>
                    <Form.Group>
                        <Form.Label htmlFor="inputName">Nombre completo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Andoni Martínez"
                            required
                            value={newName}
                            id="inputName"
                            name="name"
                            onChange={setValues}
                            minLength="6"
                            maxLength="20"
                        />
                        <Form.Text className="text-alert" >
                            {errorName}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="inputEmail">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="prueba@mail.com"
                            required
                            value={newEmail}
                            id="inputEmail"
                            name="email"
                            onChange={setValues}
                        />
                        <Form.Text className="text-alert" >
                            {errorEmail}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="inputPassword">Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            required
                            value={newPass}
                            id="inputPassword"
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
                        <Form.Label htmlFor="inputRepPassword">Repetir Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repetir contraseña"
                            required
                            id="inputRepPassword"
                            value={passRep}
                            onChange={setValues}
                        />
                    </Form.Group>
                    <Form.Group className="formSubmitGroup">
                        <Link to="/login">Ya tengo cuenta</Link>
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
    }
    else {
        <Redirect to="/" />
    }
}
export default Register;
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { API_URL } from './../Consts';

function Register() {

    const [newName, setName] = useState("");
    const [newEmail, setEmail] = useState("");
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
            case "inputname":
                setName(event.target.value);
                break;
            case "inputemail":
                setEmail(event.target.value);
                break;
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

    return (
        <>
            <Form id="registerForm" action={`${API_URL}/users/register`} method="POST">
                <h1>Registro</h1>
                <Form.Group>
                    <Form.Label>Nombre y apellidos</Form.Label>
                    <Form.Control type="text" placeholder="Andoni Martínez de la Pera" required value={newName} id="inputname" name="name" onChange={setValues} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="prueba@mail.com" required value={newEmail} id="inputemail" name="email" onChange={setValues} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" required value={newPass} id="inputpassword" name="password" onChange={setValues} />
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
                    <Form.Control type="text" placeholder="Repetir contraseña" required id="inputreppassword" value={passRep} onChange={setValues} />
                </Form.Group>

                <Button type="submit" disabled={buttonStatus} >
                    Enviar
                </Button>
            </Form>
        </>
    )
}
export default Register;
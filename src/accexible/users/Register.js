import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

function Register() {

    let [newName, setName] = useState("");
    let [newEmail, setEmail] = useState("");
    let [newPass, setPass] = useState("");
    let [passRep, setPassRep] = useState("");
    let [buttonStatus, setButtonStatus] = useState()
    let [errorLength, setErrorLength] = useState("")
    let [errorNumber, setErrorNumber] = useState("")
    let [errorMayus, setErrorMayus] = useState("")

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
            setButtonStatus(false);
        } else {
            setButtonStatus(true)
        }
    }, [passRep])

    useEffect(() => {

        let regExNumber = new RegExp(/[0-9]/, 'g')  //must contain one digit from 0-9
        let regExCapital = new RegExp(/[A-Z]/, 'g') //must contain 1 character from A-Z

        if ((newPass.length > 7 && newPass.length < 21) && regExNumber.test(newPass) && regExCapital.test(newPass)) {
            setButtonStatus(false);
            setErrorLength("");
        }
        else {
            setButtonStatus(true);
            if (!(newPass.length > 7 && newPass.length < 21)) {
                setErrorLength("Contraseña entre 8 y 20 caracteres.");
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

    return (
        <>
            <Form id="registerForm" action="http://localhost:9000/users/register" method="POST">

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
                    <Form.Text className="text-muted" >
                        {errorLength}
                    </Form.Text>
                    <Form.Text className="text-muted">
                        {errorMayus}
                    </Form.Text>
                    <Form.Text className="text-muted">
                        {errorNumber}
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Repetir Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Repetir contraseña" required id="inputreppassword" value={passRep} onChange={setValues} />
                </Form.Group>

                <Button type="submit" disabled={buttonStatus} >
                    Enviar
                </Button>
            </Form>
        </>
    )
}
export default Register;
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

function Register() {

    let [newName, setName] = useState("");
    let [newEmail, setEmail] = useState("");
    let [newPass, setPass] = useState("");
    let [passRep, setPassRep] = useState("");
    let [buttonStatus, setButtonStatus] = useState()

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
                    <Form.Text className="text-muted">
                        Mínimo 8 caracteres.
                    </Form.Text>
                    <Form.Text className="text-muted">
                        Máximo 20 caracteres.
                    </Form.Text>
                    <Form.Text className="text-muted">
                        Mínimo 1 número.
                    </Form.Text>
                    <Form.Text className="text-muted">
                        Mínimo 1 mayúscula.
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
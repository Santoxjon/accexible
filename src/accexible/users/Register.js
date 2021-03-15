import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

function Register() {

    let [newName, setName] = useState("");
    let [newSurname, setSurname] = useState("");
    let [newEmail, setEmail] = useState("");
    let [newPass, setPass] = useState("");
    let [passRep, setPassRep] = useState("");
    let [newAddress, setAddress] = useState("");
    let [newCity, setCity] = useState("");
    let [buttonStatus, setButtonStatus] = useState(true)

    function setValues(event) {
        switch (event.target.name) {
            case "name":
                // console.log(event.target.value);
                setName(event.target.value);
                break;
            case "surname":
                // console.log(event.target.value);
                setSurname(event.target.value);
                break;
            case "email":
                // console.log(event.target.value);
                setEmail(event.target.value);
                break;
            case "password":
                // console.log(event.target.value);
                setPass(event.target.value);
                break;
            case "passwordrep":
                // console.log(event.target.value);
                setPassRep(event.target.value);
                break;
            case "address":
                // console.log(event.target.value);
                setAddress(event.target.value);
                break;
            case "city":
                // console.log(event.target.value);
                setCity(event.target.value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        // console.log("Pass " + newPass);
        // console.log("PassRep " + passRep);
        if (passRep === newPass) {
            setButtonStatus(false);
        } else {
            setButtonStatus(true)
        }
    }, [passRep])

    return (
        <>
            <Form action="http://localhost:9000/users/register" method="POST">

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Andoni" required value={newName} name="name" onChange={setValues} />
                </Form.Group>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Fernández" required value={newSurname} name="surname" onChange={setValues} />
                </Form.Group>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="prueba@mail.com" required value={newEmail} name="email" onChange={setValues} />
                </Form.Group>
                <Form.Group controlId="formGridPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" required value={newPass} name="password" onChange={setValues} />
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
                    <Form.Label>Repetir Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Repetir contraseña" required value={passRep} name="passwordrep" onChange={setValues} />
                </Form.Group>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control placeholder="Uribitarte Kalea" name="address" value={newAddress} onChange={setValues} />
                </Form.Group>

                <Form.Group controlId="formGridCity" >
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control name="city" value={newCity} onChange={setValues} />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={buttonStatus} >
                    Enviar
                </Button>
            </Form>
        </>
    )
}
export default Register;
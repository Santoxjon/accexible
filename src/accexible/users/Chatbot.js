import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
import { Redirect } from 'react-router-dom';

function Chatbot() {
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [answer, setAnswer] = useState("");

    function setValues(event) {
        setAnswer(event.target.value)
    }

    if (userCookie.userId && userCookie.loginToken) {

        return (
            <>
                <Form id="chatbotForm">
                    <h1>Chatbot</h1>
                    <Form.Group>
                        <Form.Label>Chatbot pregunta...</Form.Label>
                        <Form.Control type="textarea" value="Hola userName ¿qué tal estás?" readonly />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>"userName" contesta...</Form.Label>
                        <Form.Control type="textarea" placeholder="Tu respuesta" required value={answer} id="inputAnswer" name="answer" onChange={setValues} />
                        <Form.Text className="text" >
                            <span>Escribe aquí tu respuesta.</span>
                        </Form.Text>
                    </Form.Group>

                    {/* <Button type="submit" disabled={buttonStatus} >
                        Enviar
                </Button> */}
                </Form>
            </>
        )
    } else {
        return (
            <Redirect to="/login" />
        )
    }
}

export default Chatbot;
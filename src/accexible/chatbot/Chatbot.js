import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
import { Link, Redirect } from 'react-router-dom';
import { API_URL } from './../Consts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Chatbot() {
    const [userInp, setUserInp] = useState("");
    const [chat, setChat] = useState();
    const [messages, setMessages] = useState(["Hola! Soy el chatbot 😄 ¿Por qué no empiezas contándome qué tal estás?"])
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setChat(messages.map((message, index) => {
            return (
                <Message author={index % 2 === 1 ? "Tú" : "Chatbot"} authorClass={index % 2 === 1 ? "msgUser" : "msgBot"} text={message} />
            )
        }));
        if (messages.length % 2 === 0) {
            let messageObj = { message: messages[messages.length - 1] };
            var fecthHeaders = {
                method: 'POST',
                body: JSON.stringify(messageObj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }
            fetch(`${API_URL}/chatbot/checkMessage`, fecthHeaders)
                .then(res => res.json())
                .then(data => {
                    let mArray = [...messages];
                    mArray.push(data);
                    setMessages(mArray);
                })
        }
    }, [messages]);


    useEffect(() => {
        document.querySelector("#chatContainer").scrollTo(0, document.querySelector("#chatContainer").scrollHeight);
    }, [chat])

    function Message(props) {
        return (
            <div className={`chatMessage ${props.authorClass}`}>
                <small><FontAwesomeIcon icon={props.author === "Chatbot" ? faRobot : faUserAlt} /> {props.author}</small>
                <hr />
                <p>{props.text}</p>
            </div>
        )
    }

    function addMessage(e) {
        if (e) e.preventDefault();
        let mArray = [...messages];
        mArray.push(userInp);
        setUserInp("");
        setMessages(mArray);
    }

    function submitForm(e) {
        if (e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            addMessage();
        }
    }

    if (userCookie.userId && userCookie.loginToken) {

        return (
            <>

                <div id="chatbotContainer">
                    <div id="modalContainer">
                        <h1>Chatbot</h1>
                        <Button id="readmeButton" onClick={handleShow}>
                            Leer antes <FontAwesomeIcon icon={faInfoCircle} />
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Antes de nada...</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Aunque puedes hablar con el <b>Chatbot</b> en cualquier momento, desde LiteApp recomendamos realizar primero el <b>Test</b> para ayudar a darte un mejor consejo.
                            El Chatbot te contestará según tus respuestas. Si le respondes con más detalle, la valoración será más rápida. Si no, realizará más preguntas para poder hacer una valoración más efectiva.
                            </Modal.Body>
                            <Modal.Footer>
                                <Link to="/Test" class="btn btn-dark">
                                    Llévame al test
                                </Link>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div id="chatContainer">
                        {chat}
                    </div>
                    <Form onSubmit={addMessage}>
                        <Form.Group id="userInputContainer">
                            <Form.Control
                                as="textarea"
                                id="chatTextarea"
                                value={userInp}
                                onChange={(e) => setUserInp(e.target.value)}
                                onKeyPress={submitForm}
                            />
                            <Button type="submit">
                                <span id="sendTextButton">Enviar</span><FontAwesomeIcon icon={faPaperPlane} />
                            </Button>
                        </Form.Group>
                    </Form>
                </div>

            </>
        )
    } else {
        return (
            <Redirect to="/login" />
        )
    }
}

export default Chatbot;
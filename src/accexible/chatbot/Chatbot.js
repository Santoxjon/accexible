import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import { getCookie } from '../Functions';

import { Link, Redirect } from 'react-router-dom';

import ChatBot from 'react-simple-chatbot';
import styled from 'styled-components'


import { API_URL } from './../Consts';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

function Chatbot() {
    const userCookie = { userId: getCookie("userId") };
    const [userInp, setUserInp] = useState("");
    const [chat, setChat] = useState();
    const [messages, setMessages] = useState(["Hola! Soy el chatbot 😄 ¿Por qué no empiezas contándome qué tal estás?"])


function ChatbotApp() {
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [answer, setAnswer] = useState("");
    const [chatbotUsername, setChatbotUsername] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const centered = () => setShow(true);

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


                <Form id="chatbotForm">
                    <div className="botonModal">
                        <Button variant="primary" onClick={handleShow}>
                            Leer antes de usar el chatbot
      </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Consejos para usar el chatbot</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Aunuqe puedes usar el chatbot en cualquier momento, desde LiteApp recomendamos realizar primero el test para ayudar a darte un mejor consejo.
                            El chatbot te contestará según tus respuestas. Si le respondes con más detalle, la valoración será más rápida. Si no, el chatbot realizará más preguntas para poder hacer una valoración más efectiva.
                            </Modal.Body>
                            <Modal.Footer>
                                <Link to="/Test"><Button variant="secondary" onClick={handleClose}>
                                    Llévame al test
          </Button></Link>
                                <Button variant="primary" onClick={handleClose}>
                                    Cerrar
          </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <ChatBot
                        headerTitle="LiteApp Chat"
                        recognitionEnable={true}

                        let steps={[
                            {
                                id: '1',
                                message: '¿Has salido las últimas dos semanas de casa?',
                                trigger: '2',
                            },
                            {
                                id: '2',
                                options: [
                                    { value: 1, label: 'Sí.', trigger: '4' },
                                    { value: 2, label: 'No.', trigger: '3' },

                                ],
                            },
                            {
                                id: '3',
                                message: '¿Por qué no?',
                                trigger: '5',
                            },
                            {
                                id: '4',
                                message: 'Muy bien.',
                                end: true,
                            },
                            {
                                id: '5',
                                user: true,
                                validator: (value) => {
                                    if (value == "estoy feliz") {
                                        return 'Me alegro';
                                    } else {
                                        return true;
                                    }
                                },
                                trigger: '6',
                            },
                            {
                                id: '6',
                                message: 'Quizá deberías hablar con un médico especializado.',
                                end: true,
                            }

                        ]}
                    />
                </Form>

                <div id="chatbotContainer">
                    <h1>Chatbot</h1>
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
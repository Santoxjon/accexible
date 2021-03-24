import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
import { Link, Redirect } from 'react-router-dom';

import ChatBot from 'react-simple-chatbot';
import styled from 'styled-components'

import { API_URL } from './../Consts';


function ChatbotApp() {
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [answer, setAnswer] = useState("");
    const [chatbotUsername, setChatbotUsername] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const centered = () => setShow(true);

    useEffect(() => {
        fetch(`${API_URL}/users/checkToken?id=${userCookie.userId}&token=${userCookie.loginToken}`)
            .then(res => res.json())
            .then(res => {
                setChatbotUsername(res.name);
            });
    }, []);

    function setValues(event) {
        setAnswer(event.target.value)
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
            </>
        )
    } else {
        return (
            <Redirect to="/login" />
        )
    }
}

export default ChatbotApp;
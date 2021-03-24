import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
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

    if (userCookie.userId) {
        return (
            <>
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
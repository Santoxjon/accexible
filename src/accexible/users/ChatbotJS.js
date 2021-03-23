import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
import { Redirect } from 'react-router-dom';
import ChatBot from 'react-simple-chatbot';
import { API_URL } from './../Consts';

function ChatbotJS() {
    const userCookie = { userId: getCookie("userId") };
    const [userInp, setUserInp] = useState("");
    const [chat, setChat] = useState();
    const [messages, setMessages] = useState(["Kaixo!"])

    useEffect(() => {
        setChat(messages.map((message, index) => {
            return (
                <Message author={index % 2 === 1 ? "Tú" : "Chatbot"} authorClass={index % 2 === 1 ? "msgUser" : "msgBot"} text={message} />
            )
        }));
        setTimeout(() => {
            if (messages.length % 2 === 0) {
                let mArray = [...messages];
                mArray.push("Yo que sé");
                setMessages(mArray);
            }
        }, 1000)
    }, [messages]);

    function Message(props) {
        return (
            <div className={`chatMessage ${props.authorClass}`}>
                <small>{props.author}</small>
                <hr />
                <p>{props.text}</p>
            </div>
        )
    }

    function addMessage(e) {
        e.preventDefault();
        let mArray = [...messages];
        mArray.push(userInp);
        setUserInp("");
        setMessages(mArray);
    }

    if (userCookie.userId) {
        return (
            <>
                <div id="chatbotJs">
                    <h1>Chatbot</h1>
                    <div id="chatContainer">
                        {chat}
                    </div>
                    <Form onSubmit={addMessage}>
                        <Form.Group id="userInputContainer">
                            <Form.Control
                                type="text"
                                value={userInp}
                                onChange={(e) => setUserInp(e.target.value)}
                            />
                            <Button type="submit">Enviar</Button>
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

export default ChatbotJS;
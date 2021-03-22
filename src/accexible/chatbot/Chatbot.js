import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
import { Redirect } from 'react-router-dom';
import ChatBot from 'react-simple-chatbot';
import styled from 'styled-components'
import { API_URL } from './../Consts';

function ChatbotApp() {
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [answer, setAnswer] = useState("");
    const [chatbotUsername, setChatbotUsername] = useState("");
    const lorca = require('lorca-nlp')


    useEffect(() => {
        fetch(`${API_URL}/users/checkToken?id=${userCookie.userId}&token=${userCookie.loginToken}`)
            .then(res => res.json())
            .then(res => {
                setChatbotUsername(res.name);
            });
    }, []);

    function setValues(event) {
        setAnswer(event.target.value)
        var doc = lorca(answer)
        console.log(doc.words().get())
    }

    if (userCookie.userId && userCookie.loginToken) {
        return (
            <>
                <Form id="chatbotForm">
                    <Form.Group>
                        <Form.Label>Habla con nuestro Chatbot</Form.Label>
                        <Form.Control type="text" id="inputname" name="name" onChange={setValues} />
                    </Form.Group>
                </Form>
            </>
        )
    }
}

export default ChatbotApp;
// function ChatbotApp() {
//     const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
//     const [answer, setAnswer] = useState("");
//     const [chatbotUsername, setChatbotUsername] = useState("")

//     useEffect(() => {
//         fetch(`${API_URL}/users/checkToken?id=${userCookie.userId}&token=${userCookie.loginToken}`)
//             .then(res => res.json())
//             .then(res => {
//                 setChatbotUsername(res.name);
//             });
//     }, []);

//     function setValues(event) {
//         setAnswer(event.target.value)
//     }

//     if (userCookie.userId && userCookie.loginToken) {

//         return (
//             <>
//                 <Form id="chatbotForm">
//                     <ChatBot
//                     headerTitle="LiteApp Chat"
//                     recognitionEnable={true}
//                         steps={[
//                             {
//                                 id: '1',
//                                 message: '¿Has salido las últimas dos semanas de casa?',
//                                 trigger: '2',
//                             },
//                             {
//                                 id: '2',
//                                 options: [
//                                     { value: 1, label: 'Sí.', trigger: '4' },
//                                     { value: 2, label: 'No.', trigger: '3' },

//                                 ],
//                             },
//                             {
//                                 id: '3',
//                                 message: '¿Por qué no?',
//                                 trigger: '5',
//                             },
//                             {
//                                 id: '4',
//                                 message: 'Muy bien.',
//                                 end: true,
//                             },
//                             {
//                                 id: '5',
//                                 user: true,
//                                 validator: (value) => {
//                                     if (value == "estoy feliz") {
//                                         return 'Me alegro';
//                                     } else {
//                                         return true;
//                                     }
//                                 },
//                                 trigger: '6',
//                             },
//                             {
//                                 id: '6',
//                                 message: 'Quizá deberías hablar con un médico especializado.',
//                                 end: true,
//                             }

//                         ]}
//                     />
//                 </Form>
//             </>
//         )
//     } else {
//         return (
//             <Redirect to="/login" />
//         )
//     }
// }

// export default ChatbotApp;
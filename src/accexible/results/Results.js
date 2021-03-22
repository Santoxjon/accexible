import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
import { Redirect } from 'react-router-dom';
import { API_URL } from '../Consts';


import ResultTest from './ResultTest';
import ResultChatbot from './ResultChatbot';


function Results() {
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [username, setUsername] = useState("")

    useEffect(() => {
        fetch(`${API_URL}/users/checkToken?id=${userCookie.userId}&token=${userCookie.loginToken}`)
            .then(res => res.json())
            .then(res => {
                setUsername(res.name);
            });
    }, []);

    if (userCookie.userId && userCookie.loginToken) {

        return (
            <div id="resultsContainer">
                <h1>Resultados {username}</h1>

                <ResultTest />
                <ResultChatbot />

            </div>
        )
    } else {
        return (
            <Redirect to="/login" />
        )
    }
}
export default Results;
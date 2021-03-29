import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
import { Redirect, Link } from 'react-router-dom';
import { API_URL } from '../Consts';
import { Button } from 'react-bootstrap'
import ResultTestFinal from './ResultTestFinal';
import ResultTest from './ResultTest';

function Results() {
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/users/checkToken?id=${userCookie.userId}&token=${userCookie.loginToken}`)
            .then(res => res.json())
            .then(res => {
                setUsername(res.name);
            });
    }, []);

    if (userCookie.userId) {

        return (
            <div id="resultsContainer">
                <h1>Resultados {username}</h1>
                <ResultTestFinal />
                <ResultTest />
                <div className="botonConsultas">
                <Button href='https://www.google.com/maps/search/consulta+psicologica' target="_blank">Muéstrame las consultas psicológicas cercanas.</Button>
                </div>
            </div>
        )
    } else {
        return (
            <Redirect to="/login" />
        )
    }
}
export default Results;
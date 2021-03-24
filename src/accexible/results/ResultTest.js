import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
import Form from 'react-bootstrap/Form';
import { API_URL } from '../Consts';
import ResultTestTable from './ResultTestTable';
import ResultTestLine from './ResultTestLine';
import ResultTestDonut from './ResultTestDonut';


function ResultTest() {
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [userTestResults, setUserTestResults] = useState([]);


    /* GET ALL RESULTS FROM THE USER */

    useEffect(() => {
        fetch(`${API_URL}/test/resultsuser/${userCookie.userId}`)
            .then(res => res.json())
            .then(allTestResults => {
                setUserTestResults(allTestResults);
            });


    }, []);

    useEffect(() => {

        console.log(userTestResults);
        // <ResultTest />
    }, [userTestResults]);


    return (
        <div id="testResultsContainer">
            <h2>- Test</h2>
            <div id="textTestResults">
                <p>Explicacion gral acorde a los resultados 4 posibles resultados? con diferentes orientaciones sobre como seguir</p>
                <p>El resultado es obtenido a través de la valoración del test de preguntas cerradas realizado anteriormente. Tras su estudio por medio de un algoritmo, se le ofrece al usuario unos resultados e indicaciones personalizadas, correspondientes con el análisis realizado a través de las respuestas señaladas. </p>
                {/* meter tabla con los resultados obtenidos del ultimo test */}
                <ResultTestTable tableTestRes={userTestResults}/>
            </div>

            <div id="graphicsTestResults">
                <ResultTestLine userTestRes={userTestResults}/>
                <ResultTestDonut />
            </div>

            {/* map al array que contenga todos los resultados de test realizados */}
            <div id="formTestResults">
                <Form.Group controlId="selectTestResult">
                    <Form.Label>Mostrar resultados test</Form.Label>
                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>

                    </Form.Control>
                </Form.Group>
            </div>

        </div>

    )
}
export default ResultTest;
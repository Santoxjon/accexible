import { useEffect, useState } from "react";
import { getCookie } from '../Functions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../Consts';
import ResultTestTable from './ResultTestTable';
import ResultTestDonut from './ResultTestDonut';
import ResultFinalMixed from './ResultFinalMixed';

function ResultTestFinal() {
    const userCookie = { userId: getCookie("userId"), loginToken: getCookie("loginToken") };
    const [userTestResults, setUserTestResults] = useState([]);
    let [resultsList, setResultsList] = useState("");
    const [currentTest, setCurrentTest] = useState("");
    let [fullDate, setFullDate] = useState("");
    let [showTest, setShowTest] = useState("");
    let finalScore; 
    let [recommend, setRecommend] = useState("");
    let [showDetails, setShowDetails] = useState("none");

    /* GET ALL RESULTS FROM THE USER */
    useEffect(() => {
        fetch(`${API_URL}/test/resultsuser/${userCookie.userId}/`)
            .then(res => res.json())
            .then(allTestResults => {
                setUserTestResults(allTestResults);
            });
    }, []);

    /* Modify Date Format */
    function modifyDate(dateTest) {
        let date = new Date(dateTest);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();
        let h = date.getHours();
        let min = date.getMinutes();
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (min < 10) {
            min = '0' + min;
        }
        fullDate = `${dt}-${month}-${year}/ ${h}:${min}`;
        // console.log(fullDate);
        setFullDate(fullDate);
    }

    useEffect(() => {
        setResultsList(userTestResults.map(function (test, i) {
            modifyDate(test.date);
            // console.log(test);
            return (
                <option key={i} name={`test${i}`} value={test._id}>Test {i + 1}- Fecha: {fullDate}</option>
            )
        }))
    }, [userTestResults]);

    /* Click select options */
    function getTestShow(e) {
        setCurrentTest(e.target.value);
        // alert(e.target.value)
        fetch(`${API_URL}/test/resultsuser/${userCookie.userId}/${e.target.value}`)
            .then(res => res.json())
            .then(testShow => {
                setShowTest(testShow);
            });
    }

    /* Recommendations attending final score*/
    finalScore = parseFloat(Math.round((showTest.scoreTest + showTest.scoreChat+showTest.pronounScoring + showTest.rumination + showTest.responseTimeScoring)* 100) / 100).toFixed(2);

    useEffect(() => {
        setRecommend("");
        if (finalScore < 5) {
            setRecommend("No se aprecian rasgos depresivos.");
        } else if (finalScore >= 5 && finalScore < 10) {
            setRecommend("Se recomienda consultar con un especialista.")
        } else {
            setRecommend("Es necesaria la consulta urgente con un especialista.");
        }
        setShowDetails("none");
    }, [showTest]);

    /* Manage the details display by the button */ 
    function showDetailsButt() {
        if (showDetails === "none") {
            setShowDetails("block");
        } else if (showDetails === "block") {
            setShowDetails("none");
        }
    }

    return (
        <div id="chooseResultsContainer">
            <div id="formTestResults">
                <Form.Group controlId="selectTestResult">
                    <Form.Label>Mostrar resultados</Form.Label>
                    <Form.Control as="select" name="testSel" onChange={getTestShow} value={currentTest}>
                        <option hidden>Elige test</option>
                        {resultsList}
                    </Form.Control>
                </Form.Group>
            </div>
            <div id="disclaimerContainer" style={{ display: showTest ? "none" : "block" }}>
                <h3>Advertencia</h3>
                <p>Los resultados obtenidos a traves de LiteApp son meramente informativos y aproximados, en ningún caso concluyentes o vinculantes.</p>
                <p>Para un resultado óptimo le recomendamos que se ponga en contacto con un especialista</p>
            </div>

            <div id="globalScoreRecommendations" style={{ display: showTest ? "block" : "none" }}>
                <div id="globalScore">
                    <h2>Valoracion Global</h2>
                    <h3>{finalScore} pts</h3>
                </div>
                <div id="globalRecommendations">
                    <h2>Recomendaciones</h2>
                    <p>{recommend}</p>
                </div>
            </div>

            <div id="showDetailsButton">
                <Button variant="outline-primary" style={{ display: showTest ? "block" : "none" }} onClick={showDetailsButt}>Mostrar Detalles</Button>
            </div>

            <div id="showResultsContainer" style={{ display: showDetails }}>
                <div id="resultsTest">
                    <h2>- Test</h2>
                    <div id="tableTestResults" >
                        <div id="textTestResults">
                            <ResultTestTable showTable={showTest} />
                        </div>
                        <div id="graphicsTestResults">
                            <ResultTestDonut userTestDonut={showTest} />
                        </div>
                    </div>
                </div>
                <div id="resultsFinal">
                    <h2>- Final</h2>
                    <div id="graphicsFinalResults">
                        <ResultFinalMixed userTestLine={userTestResults} />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ResultTestFinal;
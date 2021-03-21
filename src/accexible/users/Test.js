import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { API_URL } from './../Consts';

function Test() {
    const [allQuestions, setAllQuestions] = useState([""]); // todas las preguntas
    const [allAnswers, setAllAnswers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [backBtn, setBackBtn] = useState(false);
    const [nextBtn, setNextBtn] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [testSubmitBtnStatus, setTestSubmitBtnStatus] = useState(true);
    const questionBeginning = "¿Durante las últimas 2 semanas, ¿con qué frecuencia ";

    useEffect(() => {
        function getQuestions() {
            fetch(`${API_URL}/questions`)
                .then(respuesta => respuesta.json())
                .then(dataQuestions => {
                    setAllQuestions(dataQuestions);
                })
        }

        function getAnswers() {
            fetch(`${API_URL}/answers`)
                .then(respuesta => respuesta.json())
                .then(dataAnswers => {
                    setAllAnswers(dataAnswers);
                })
        }

        getAnswers()
        getQuestions()
    }, [])

    useEffect(() => {
        setCurrentQuestion(allQuestions[questionIndex].text)
        setUserAnswers(new Array(allQuestions.length))
    }, [allQuestions])

    useEffect(() => {
        setCurrentQuestion(allQuestions[questionIndex].text)
        if (questionIndex === 0) {
            setBackBtn(true);
        }
        else if (questionIndex >= allQuestions.length - 1) {
            setNextBtn(true);
        }
        else {
            setNextBtn(false);
            setBackBtn(false);
        }
    }, [questionIndex])

    useEffect(() => {
        if (userAnswers.length > 0) {
            console.log(userAnswers);
        }
        console.log(Object.values(userAnswers).length, userAnswers.length);
        setTestSubmitBtnStatus(userAnswers.includes(undefined));
    }, [userAnswers])

    function goBack() {
        setQuestionIndex(questionIndex - 1)
    }
    function goNext() {
        setQuestionIndex(questionIndex + 1)
    }

    function Answers() {
        let listAnswers = allAnswers.map((answer, index) => {
            return (
                <Form.Check
                    className={userAnswers[questionIndex] === answer.option ? "checkedRadio" : "uncheckedRadio"}
                    id={`radio-${answer.option}`}
                    type="radio" name={questionIndex}
                    value={answer.option}
                    label={answer.text}
                    onChange={radioChange}
                    checked={userAnswers[questionIndex] === answer.option}
                />
            )
        })
        return (
            listAnswers
        )
    }

    function HiddenInputs() {
        let listInputs = allQuestions.map((question, index) => {
            return (
                <Form.Control type="hidden" value={userAnswers[index] === undefined ? "" : userAnswers[index]} required />
            )
        })
        return (
            listInputs
        )
    }

    function radioChange(e) {
        // if (questionIndex < allQuestions.length-1) {
        //     goNext();
        // }
        let array = [...userAnswers];
        array[questionIndex] = e.target.value;
        setUserAnswers(array);
    }

    return (
        <>
            <div id="testContainer">
                <h1>Test</h1>
                <div id="questionContainer">
                    <p>
                        <span id="questionBeginning">{questionBeginning}</span>
                        <span id="questionEnding">{currentQuestion}</span>
                    </p>
                </div>
                <div id="testOptionContainer">
                    <Answers />
                </div>
                <div id="moveTestBtns">
                    <button id="btnBack" disabled={backBtn} onClick={goBack}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} />
                    </button>
                    <button id="btnNext" disabled={nextBtn} onClick={goNext}>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </button>
                </div>
                <Form id="mainTestForm" method="POST">
                    <HiddenInputs />
                    <hr />
                    <Button id="submitTestBtn" type="submit" disabled={testSubmitBtnStatus}>Enviar resultados</Button>
                </Form>
            </div>

        </>
    )
}
export default Test;
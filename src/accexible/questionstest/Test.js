import { getCookie } from '../Functions';
import { Redirect } from 'react-router-dom';
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { API_URL } from '../Consts';
import { Container, ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Test() {

    const userCookie = { userId: getCookie("userId") };

    const [allQuestions, setAllQuestions] = useState([""]); // todas las preguntas
    const [allAnswers, setAllAnswers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [backBtn, setBackBtn] = useState(false);
    const [nextBtn, setNextBtn] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [testSubmitBtnStatus, setTestSubmitBtnStatus] = useState(true);
    const questionBeginning = "¿Durante las últimas 2 semanas, ¿con qué frecuencia ";
    const [progress, setProgress] = useState(100);
    

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


        // if (userAnswers.length === allQuestions.length) {
        //     setProgress(progress+12)
        // }
    }, [userAnswers])

    function goBack() {
        setQuestionIndex(questionIndex - 1)
        setProgress(progress - 13)
    }
    function goNext() {
        setQuestionIndex(questionIndex + 1)
        setProgress(progress + 13)
    }

    // function BarraProgreso() {
    //     useEffect(() => {
    //         if (questionIndex++) {
    //             setProgress(progress + 100)
    //             return (
    //                 <ProgressBar className="contenedorProgreso" now={progress} animated />
    //             )
    //         } else if (questionIndex--) {
    //             setProgress(progress - 100)
    //         }
    //     }, [])

    // }


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
                <Form.Control name={`question${index}`} type="hidden" value={userAnswers[index] === undefined ? "" : userAnswers[index]} required />
            )
        })
        // console.log(listInputs);
        return (
            listInputs
        )
    }

    function radioChange(e) {
        let array = [...userAnswers];
        array[questionIndex] = e.target.value;
        setUserAnswers(array);
    }

    function relocateToChatbot() {
        <Redirect to="/chatbot" />
    }

    if (userCookie.userId) {
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
                        <Container className="contenedorBarra">
                            <ProgressBar className="contenedorProgreso" now={progress} label={`${questionIndex + 1}/9 preguntas`}/>
                        </Container>
                        <button id="btnNext" disabled={nextBtn} onClick={goNext}>
                            <FontAwesomeIcon icon={faArrowCircleRight} />
                        </button>
                    </div>
                    <Form id="mainTestForm" action={`${API_URL}/test/newresult`} method="POST">
                        <HiddenInputs />
                        <input type="hidden" name="userId" value={userCookie.userId}></input>
                        <hr />
                        <Button id="submitTestBtn" type="submit" disabled={testSubmitBtnStatus} onClick={relocateToChatbot()}>Enviar resultados</Button>
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

export default Test;
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Test() {
    const [allQuestions, setAllQuestions] = useState([""]); // todas las preguntas
    const [allAnswers, setAllAnswers] = useState(["","","",""])
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [backBtn, setBackBtn] = useState(false);
    const [nextBtn, setNextBtn] = useState(false);
    const questionBeginning = "¿Durante las últimas 2 semanas, ¿con qué frecuencia ";

    useEffect(() => {
        function getQuestions() {
            fetch(`http://localhost:9000/questions`)
                .then(respuesta => respuesta.json())
                .then(dataQuestions => {
                    console.log(dataQuestions);
                    setAllQuestions(dataQuestions);
                })
        }

        function getAnswers(){
            fetch(`http://localhost:9000/answers`)
                .then(respuesta => respuesta.json())
                .then(dataAnswers => {
                    console.log(dataAnswers);
                    setAllAnswers(dataAnswers);
                })
        }

        getAnswers()
        getQuestions()
    }, [])

    useEffect(() => {
        setCurrentQuestion(allQuestions[questionIndex].text)
    }, [allQuestions])

    useEffect(() => {
        console.log(questionIndex);
        setCurrentQuestion(allQuestions[questionIndex].text)
        if (questionIndex == 0) {
            setBackBtn(true);
        }
        else if (questionIndex >= allQuestions.length -1) {
            setNextBtn(true);
        }
        else{
            setNextBtn(false);
            setBackBtn(false);
        }
    }, [questionIndex])

    function goBack() {
        setQuestionIndex(questionIndex - 1)
    }
    function goNext() {
        setQuestionIndex(questionIndex + 1)
    }

    return (
        <>
            <div id="testContainer">
                <h1>Test</h1>
                <div>
                    <p>
                        <span id="questionBeginning">{questionBeginning}</span>
                        <span>{currentQuestion}</span>
                    </p>
                </div>
                <div id="testOptionContainer">
                    <Button type="button" data-option={allAnswers[0].option}>{allAnswers[0].text}</Button>
                    <Button type="button" data-option={allAnswers[1].option}>{allAnswers[1].text}</Button>
                    <Button type="button" data-option={allAnswers[2].option}>{allAnswers[2].text}</Button>
                    <Button type="button" data-option={allAnswers[3].option}>{allAnswers[3].text}</Button>
                   
                </div>
                <Form id="mainTestForm" method="POST">

                </Form>
                <div id="moveTestBtns">
                    <Button id="btnBack" disabled={backBtn} onClick={goBack}>Anterior</Button>
                    <Button id="btnNext" disabled={nextBtn} onClick={goNext}>Siguiente</Button>
                </div>
                
            </div>

        </>
    )
}
export default Test;
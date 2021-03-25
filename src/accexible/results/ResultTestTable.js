import { useEffect, useState } from "react";

import Table from 'react-bootstrap/Table';

function ResultTestTable(props) {

    let [arrayAnswers, setArrayAnswers] = useState(props.tableTestRes);
    let lastResult = props.tableTestRes;
    // let arrayAnswers = lastResult[0];
    // let arrayAllAnswers = arrayAnswers.answers;

    useEffect(() => {
        console.log(arrayAnswers);

        // console.log("*****");
        // console.log(arrayAllAnswers);
        // console.log("*****");

        // console.log(arrayAnswers.answers);
        // console.log(arrayAnswers.answers[0]);
    }, []);


    // let showTable = arrayAnswers.map((answer, index) => {
    //     return (
    //         <td key={index}>{answer ? answer : "Cargando resultados"}</td>
    //     )
    // })


    return (
        <div>
            <p>Respuestas Tabla (borrar): {lastResult[0] ? lastResult[0].answers : "Cargando resultados"}</p>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th >#Pregunta</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Respuesta</td>
                        {/* <td>{showTable ? showTable : "Cargando resultados"}</td> */}

                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
export default ResultTestTable;
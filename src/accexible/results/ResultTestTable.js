import { useEffect, useState } from "react";

import Table from 'react-bootstrap/Table';

function ResultTestTable(props) {

    let data = props.showTable;
    let [arrayData, setArrayData] = useState([]);
    let [arrayTableQuestShow, setArrayTableQuestShow] = useState([]);
    let [arrayTableAnswShow, setArrayTableAnswShow] = useState([]);

    useEffect(() => {
        // console.log(data);
        setArrayData(data.answers);
    }, [data]);

    useEffect(() => {
        // console.log(arrayData);
        if (arrayData !== "" && arrayData !== undefined) {
            setArrayTableQuestShow(arrayData.map(function (test, index) {
                return (
                    <td key={index}>{index + 1}</td>
                )
            }))
            setArrayTableAnswShow(arrayData.map(function (test, index) {
                return (
                    <td key={index}>{test}</td>
                )
            }))
        }
    }, [arrayData]);


    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Nº Pregunta</th>
                        {arrayTableQuestShow}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Respuesta</td>
                        {arrayTableAnswShow}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
export default ResultTestTable;
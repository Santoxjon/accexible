import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

function ResultTestDonut(props) {
    let donutData = props.userTestDonut.answers;
    let [countA, setCountA] = useState(0);
    let [countB, setCountB] = useState(0);
    let [countC, setCountC] = useState(0);
    let [countD, setCountD] = useState(0);

    useEffect(() => {
        // countA, countB, countC, countD = 0; /*reinicializar a 0 cada vez q cambia donutData!*/
        if (donutData !== "" && donutData !== undefined) {
            let contA = 0
            let contB = 0
            let contC = 0
            let contD = 0
            donutData.forEach(element => {

                switch (element) {

                    case "a":
                        contA++
                        break;
                    case "b":
                        contB++
                        break;
                    case "c":
                        contC++
                        break;
                    case "d":
                        contD++
                        break;
                    default:
                        break;
                }
            });
            setCountA(contA);
            setCountB(contB);
            setCountC(contC);
            setCountD(contD);
            // console.log(`a ${contA}/ b ${contB}/ c ${contC}/ d ${contD}`);
        }
    }, [donutData]);

    const data = {
        labels: ["A", "B", "C", "D"],
        datasets: [{
            label: 'Respuestas test',
            data: [countA, countB, countC, countD],
            backgroundColor: ['blue', 'green', 'yellow', 'orange'],
            borderColor: ['blue', 'green', 'yellow', 'orange']
        }]
    }
    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Proporción Respuestas Test',
            fontColor: 'black',
            fontSize: 15
        },
        legend: {
            position: 'bottom'
        }
    }

    return (
        <div id="graphicDonutContainer">
            <div id="donutGraphic">
                <Doughnut data={data} options={options} />
            </div>
        </div>

    )
}
export default ResultTestDonut;
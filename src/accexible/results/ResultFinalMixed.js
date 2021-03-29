import { useEffect, useState } from 'react';
import { Bar, defaults } from 'react-chartjs-2';

defaults.global.legend.position = 'bottom';

function ResultFinalMixed(props) {

    let graphData = props.userTestLine;
    let [arrayData, setArrayData] = useState([]);
    let [arrayLabels, setArrayLabels] = useState([]);
    let [arrayDataValue, SetArrayDataValue] = useState([]);
    let [arrayRandomAvgData, setArrayRandomAvgData] = useState([]);
    /* Random entre 3 y 10 para la media y hasta 255 para el color de la media*/
    const randAverageData = () => Math.floor(Math.random() * (10 - 3 + 1) + 3);
    const rand = () => Math.floor(Math.random() * 255);

    useEffect(() => {
        //console.log(graphData);
        setArrayData(graphData);
    }, [graphData]);

    useEffect(() => {
        // console.log(arrayData);
        setArrayLabels(arrayData.map(function (test, index) {
            return (
                `Test${index + 1}`
            )
        }))
        SetArrayDataValue(arrayData.map(function (test, index) {
            return (
                parseFloat(Math.round((test.scoreTest + test.scoreChat + test.pronounScoring + test.rumination + test.responseTimeScoring)* 100) / 100).toFixed(2)
            )
        }))
        setArrayRandomAvgData(arrayData.map(function (test, index) {
            return (
                randAverageData()
            )
        }))

    }, [arrayData])

    // useEffect(() => {
    //     console.log(arrayLabels);
    //     console.log(arrayDataValue);
    //     console.log(arrayRandomAvgData);
    // }, [arrayLabels])

    const data = {
        labels: arrayLabels, // nº tests se sabe al conocer la cantidad de test!
        datasets: [
            {
                type: 'line',
                label: 'Media usuarios',
                borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
                borderWidth: 2,
                fill: false,
                data: arrayRandomAvgData,
            },
            {
                type: 'bar',
                label: 'Valoración test',
                backgroundColor: "blue",
                data: arrayDataValue,
                borderColor: 'white',
                borderWidth: 3,
            },

        ],
    }

    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Media usuarios - Resultados Test',
            fontColor: 'black',
            fontSize: 15
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        max: 15,
                        stepSize: 1,
                    },
                },
            ],
        },
    }

    return (
        <div id="graphicLineContainer">

            <div id="lineGraphic">
                <Bar data={data} options={options} />
            </div>

        </div>

    )

}
export default ResultFinalMixed;
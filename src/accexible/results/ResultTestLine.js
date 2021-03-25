import { Line } from 'react-chartjs-2'

function ResultTestLine(props) {
    const data = {
        labels: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"],
        datasets: [{
            label: 'Respuestas test',
            // data: ["A", "C", "B", "A", "D", "A", "C", "B", "A"]
            data: [1, 3, 4, 1, 1, 2, 2, 1, 3],
            borderColor: ['rgba(255, 99, 132, 0.2)'],
            backgroundColor: ['rgba(255, 99, 132)'],
            pointBackgroundColor: ['rgba(255, 99, 132)', 'rgba(255, 99, 132)'],
            pointBorderColor: ['rgba(255, 99, 132)', 'purple']
        },
        {
            label: 'Respuesta más repetida',
            data: [1, 1, 1, 2, 4, 4, 2, 1, 2],
            fill: false,
            borderColor: ['red'],
            backgroundColor: ['red'],
            pointBackgroundColor: ['red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red'],
            pointBorderColor: ['red', 'white']
        }
        ]
    }
    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Respuestas al test',
            fontColor: 'black',
            fontSize: 15
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: "#535356"
                    },
                    ticks: {
                        fontColor: "#87889C"
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        color: "#535356"
                    },
                    ticks: {
                        min: 0,
                        max: 5,
                        stepSize: 1,
                        fontColor: "#87889C"
                    }
                }
            ]
        },
        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'black',
            }
        }
    }

    return (
        <div id="graphicLineContainer">

            <div id="lineGraphic">
                <Line data={data} options={options} />
                <p>Puntuacion Test (borrar): {props.userTestRes[0] ? props.userTestRes[0].scoreTest : "Cargando resultados"}</p> 
            </div>

        </div>

    )
}
export default ResultTestLine;
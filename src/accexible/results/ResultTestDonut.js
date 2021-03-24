import { Doughnut } from 'react-chartjs-2'

function ResultTestDonut(props) {
    const data = {
        labels: ["A", "B", "C", "D"],
        datasets: [{
            label: 'Respuestas test',
            data: [1, 3, 4, 1],
            backgroundColor: ['blue', 'green', 'yellow', 'orange'],
            borderColor: ['blue', 'green', 'yellow', 'orange']
        }
        ]
    }
    const options = {
        title: {
            display: true,
            text: 'Proporción Respuestas'
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
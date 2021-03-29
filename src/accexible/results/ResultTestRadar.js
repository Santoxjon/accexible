import { Radar, defaults } from 'react-chartjs-2';


function ResultTestRadar(props) {
    let radarData = props.userTestRadar;


    const data = {
        labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
        datasets: [
            {
                label: '# of a',
                data: [1, 2, 3, 4, 4, 3, 2, 1, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: '# of b',
                data: [4, 1, 2, 3, 1, 4, 2, 2, 1],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: '# of c',
                data: [4, 3, 1, 2, 4, 2, 1, 3, 2],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Respuestas Opción-Test',
            fontColor: 'black',
            fontSize: 15
        },
        scale: {
            ticks: { beginAtZero: true },
        },
    }

    return (
        <div id="graphicRadarContainer">

            <div id="radarGraphic">
                <Radar data={data} options={options} />
            </div>

        </div>
    )

}
export default ResultTestRadar;
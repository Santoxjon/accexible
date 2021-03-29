import { Polar } from 'react-chartjs-2';

function ResultTestPolar(props) {
    let polarData = props.userTestPolar;

    const data = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',                    
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        title: {
            display: true,
            text: 'Frecuencia Respuestas Total',
            fontColor: 'black',
            fontSize: 15
        },
    }

    return (
        <div id="graphicPolarContainer">
            <div id="polarGraphic">
                <Polar data={data} options={options} />
            </div>
        </div>
    )
}
export default ResultTestPolar;
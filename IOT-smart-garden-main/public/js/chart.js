export const CHART_CONFIG = (label,bgColor, borderColor,dataInit) => ({
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            spanGaps: true,
            label: label,
            data: dataInit || [],
            backgroundColor: [
                bgColor,
            ],
            borderColor: [
                borderColor,
            ],
            borderWidth: 1.5,
            pointHoverRadius: 10,
            borderJoinStyle: 'miter',
            lineTension: 0,
        }]
    },
    options: {
        layout: {
            padding: {
                left: 10
            }
        },
        scales: {
            x: {
                display: true,
                ticks: {
                    color: '#b4c0beFF'
                }
            },
            y: {
                display: true,
                ticks: {
                    color: '#b4c0beFF'
                }
            }
        }
    },
    scales: {
        x: {
            display: true
        },
        y: {
            display: true
        }
    },
});
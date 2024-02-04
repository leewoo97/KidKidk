import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    plugins: {
        title: {
            display: true,
            text: '투자 이익률 그래프',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['월', '화', '수', '목', '금', '토', '일'];

export const data = {
    labels,
    datasets: [
        {
            label: '이익률',
            data: [-3, 2, 3, 4, -2, 4, -4],
            backgroundColor: 'rgb(255, 99, 132)',
        },
    ],
};
export default function ParentFundProfitGraph() {
    return (
        <>
            <Bar options={options} data={data} />
        </>
    );
}

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: '투자 계좌 그래프',
        },
    },
};

const labels = ['월', '화', '수', '목', '금', '토', '일'];

export const data = {
    labels,
    datasets: [
        {
            label: '투좌 계좌 금액',
            data: [100, 200, 300, 200, 500, 700, 120],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};
export default function ParentFundAccountGraph() {
    return (
        <>
            <Line options={options} data={data} />
        </>
    );
}

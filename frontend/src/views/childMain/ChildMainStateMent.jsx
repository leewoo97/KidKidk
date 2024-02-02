import styles from "./ChildMainStatement.module.css";
import ChildMainStatementTable from "./ChildMainStatementTable.jsx";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChildMainStateMent() {
  const labels = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];

  const data = {
    labels,
    datasets: [
      {
        label: "React",
        data: [32, 42, 51, 60, 51, 95, 97],
        backgroundColor: "#5FB776",
        borderColor: "#5FB776",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const Canvas = () => {
    return <Line options={options} data={data} />;
  };

  const statementdata = [
    {
      id: 1,
      date: "2024.01.16 오전 10:39",
      type: "적금 만기",
      state: "입금",
      coin: 20300,
    },
    {
      id: 2,
      date: "2024.01.16 오전 10:38",
      type: "투자",
      state: "매수",
      coin: 20300,
    },
    {
      id: 3,
      date: "2024.01.16 오전 09:23",
      type: "주급",
      state: "입금",
      coin: 20300,
    },
    {
      id: 4,
      date: "2024.01.16 오전 09:23",
      type: "주급",
      state: "입금",
      coin: 20300,
    },
    {
      id: 5,
      date: "2024.01.16 오전 09:23",
      type: "주급",
      state: "입금",
      coin: 20300,
    },
    {
      id: 6,
      date: "2024.01.16 오전 09:23",
      type: "주급",
      state: "입금",
      coin: 20300,
    },
    {
      id: 7,
      date: "2024.01.16 오전 09:23",
      type: "주급",
      state: "입금",
      coin: 20300,
    },
    {
      id: 8,
      date: "2024.01.16 오전 09:23",
      type: "주급",
      state: "입금",
      coin: 20300,
    },
    {
      id: 9,
      date: "2024.01.16 오전 09:23",
      type: "주급",
      state: "입금",
      coin: 20300,
    },

    {
      id: 10,
      date: "2024.01.16 오전 09:23",
      type: "주급",
      state: "입금",
      coin: 20300,
    },
    {
      id: 11,
      date: "2024.01.16 오전 09:23",
      type: "주급",
      state: "입금",
      coin: 20300,
    },
    {
      id: 12,
      date: "2024.01.16 오전 09:23",
      type: "주급",
      state: "입금",
      coin: 20300,
    },
  ];

  return (
    <div className={styles.stateContainer}>
      <div className={styles.card}>
        <div className={styles.title}>나의 주머니 변동 그래프</div>
        <div className={styles.lineChart}>
          <Canvas />
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.title}>나의 주머니 내역</div>
        <div className={styles.scrollContainer}>
          <div className={styles.scrollContent}>
            <ChildMainStatementTable data={statementdata} />
          </div>
        </div>
      </div>
    </div>
  );
}

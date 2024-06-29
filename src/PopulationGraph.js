import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './PopulationGraph.css';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const PopulationGraph = ({ selectedPrefectures, prefectureNames }) => {
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        const fetchPopulationData = async () => {
            if (selectedPrefectures.length === 0) return;

            let newGraphData = {
                labels: [],
                datasets: []
            };

            try {
                // 各選択された都道府県のデータを取得
                for (let prefCode of selectedPrefectures) {
                    const response = await axios.get(
                        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
                        {
                            headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY }
                        }
                    );
                    // RESAS APIのレスポンスから総人口データを取得
                    const populationData = response.data.result.data.find(d => d.label === '総人口');
                    if (!populationData) {
                        console.warn(`総人口データが見つかりませんでした: ${prefCode}`);
                        continue;
                    }
                     // 年次をラベルに設定
                    if (!newGraphData.labels.length) {
                        newGraphData.labels = populationData.data.map(item => item.year);
                    }
                    // データセットに人口データを追加
                    newGraphData.datasets.push({
                        label: prefectureNames[prefCode], // 都道府県名をラベルに設定
                        data: populationData.data.map(item => item.value),
                        borderColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                        backgroundColor: `hsla(${Math.random() * 360}, 100%, 50%, 0.5)`,
                        fill: false
                    });
                }
                setGraphData(newGraphData);

            } catch (error) {
                console.error('人口構成データの取得エラー:', error);
            }
        };

        fetchPopulationData();

    }, [selectedPrefectures, prefectureNames]); // prefectureNames を依存配列に追加

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '都道府県別人口推移'
            }
        },
    };

    return (
        <div className = "graph-size">
            <h2>人口推移グラフ</h2>
            {graphData ? (
                <Line data={graphData} options={options} />
            ) : (
                <p>都道府県を選択してください</p>
            )}
        </div>
    );
};

export default PopulationGraph;

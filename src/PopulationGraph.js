import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const PopulationGraph = ({ selectedPrefectures }) => {
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        const fetchPopulationData = async () => {
            const apiKey = 'UoaRyICGToHSOwCaUvGvpzrCp8MdChcBmpnq8QXI';
            const newGraphData = {
                labels: [],
                datasets: []
            };

            for (const prefCode of selectedPrefectures) {
                try {
                    const response = await axios.get(
                        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
                        { headers: { 'X-API-KEY': apiKey } }
                    );

                    const totalPopulationData = response.data.result.data.find(d => d.label === '総人口');
                    const years = totalPopulationData.data.map(d => d.year);
                    const populationValues = totalPopulationData.data.map(d => d.value);

                    newGraphData.labels = years;
                    newGraphData.datasets.push({
                        label: `都道府県コード ${prefCode}`,
                        data: populationValues,
                        fill: false,
                        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
                        tension: 0.1
                    });
                } catch (error) {
                    console.error(`人口構成データの取得エラー (${prefCode}):`, error);
                }
            }

            setGraphData(newGraphData);
        };

        if (selectedPrefectures.length > 0) {
            fetchPopulationData();
        }
    }, [selectedPrefectures]);

    return (
        <div>
            {graphData ? (
                <Line data={graphData} />
            ) : (
                <p>データを取得中...</p>
            )}
        </div>
    );
};

export default PopulationGraph;

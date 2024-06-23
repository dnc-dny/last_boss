import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const prefNames = {
    1: '北海道',
    2: '青森県',
    3: '岩手県',
    4: '宮城県',
    5: '秋田県',
    6: '山形県',
    7: '福島県',
    8: '茨城県',
    9: '栃木県',
    10: '群馬県',
    11: '埼玉県',
    12: '千葉県',
    13: '東京都',
    14: '神奈川県',
    15: '新潟県',
    16: '富山県',
    17: '石川県',
    18: '福井県',
    19: '山梨県',
    20: '長野県',
    21: '岐阜県',
    22: '静岡県',
    23: '愛知県',
    24: '三重県',
    25: '滋賀県',
    26: '京都府',
    27: '大阪府',
    28: '兵庫県',
    29: '奈良県',
    30: '和歌山県',
    31: '鳥取県',
    32: '島根県',
    33: '岡山県',
    34: '広島県',
    35: '山口県',
    36: '徳島県',
    37: '香川県',
    38: '愛媛県',
    39: '高知県',
    40: '福岡県',
    41: '佐賀県',
    42: '長崎県',
    43: '熊本県',
    44: '大分県',
    45: '宮崎県',
    46: '鹿児島県',
    47: '沖縄県'
};

const PopulationGraph = ({ selectedPrefectures }) => {
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        const fetchPopulationData = async () => {
            if (selectedPrefectures.length === 0) return;

            const apiKey = 'UoaRyICGToHSOwCaUvGvpzrCp8MdChcBmpnq8QXI';
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
                            headers: { 'X-API-KEY': apiKey }
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
                        label: prefNames[prefCode], // 都道府県名をラベルに設定
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

    }, [selectedPrefectures]);

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
        <div>
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

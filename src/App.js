import React, { useState } from 'react';
import './App.css';
import PrefectureSelect from './PrefectureSelect';
import PopulationGraph from './PopulationGraph';

// const prefecture_names = {
//     1: '北海道',
//     2: '青森県',
//     3: '岩手県',
//     4: '宮城県',
//     5: '秋田県',
//     6: '山形県',
//     7: '福島県',
//     8: '茨城県',
//     9: '栃木県',
//     10: '群馬県',
//     11: '埼玉県',
//     12: '千葉県',
//     13: '東京都',
//     14: '神奈川県',
//     15: '新潟県',
//     16: '富山県',
//     17: '石川県',
//     18: '福井県',
//     19: '山梨県',
//     20: '長野県',
//     21: '岐阜県',
//     22: '静岡県',
//     23: '愛知県',
//     24: '三重県',
//     25: '滋賀県',
//     26: '京都府',
//     27: '大阪府',
//     28: '兵庫県',
//     29: '奈良県',
//     30: '和歌山県',
//     31: '鳥取県',
//     32: '島根県',
//     33: '岡山県',
//     34: '広島県',
//     35: '山口県',
//     36: '徳島県',
//     37: '香川県',
//     38: '愛媛県',
//     39: '高知県',
//     40: '福岡県',
//     41: '佐賀県',
//     42: '長崎県',
//     43: '熊本県',
//     44: '大分県',
//     45: '宮崎県',
//     46: '鹿児島県',
//     47: '沖縄県'
// };

function App() {
    const [selectedPrefectures, setSelectedPrefectures] = useState([]);

    const handlePrefectureChange = (prefCode, isChecked, prefName) => {
        setSelectedPrefectures(prevSelected => {
            if (isChecked) {
                // 既に存在するか確認して追加
                if (prevSelected.some(pref => pref.prefCode === prefCode)) {
                    return prevSelected;
                }
                // 選択された都道府県を追加
                return [...prevSelected, { prefCode, prefName }];
            } else {
                // 選択解除された都道府県を削除
                return prevSelected.filter(pref => pref.prefCode !== prefCode);
            }
        });
    };

    const prefectureNames = selectedPrefectures.reduce((acc, pref) => {
        acc[pref.prefCode] = pref.prefName;
        return acc;
    }, {});

    return (
        <div className="App">
            <header className="App-header">
                <h1>都道府県の人口構成グラフ</h1>
                <PrefectureSelect onPrefectureChange={handlePrefectureChange} />
                <PopulationGraph
                    selectedPrefectures={selectedPrefectures.map(pref => pref.prefCode)}
                    prefectureNames={prefectureNames}
                />
            </header>
        </div>
    );
}

export default App;


import React, { useState } from 'react';
import './App.css';
import PrefectureSelect from './PrefectureSelect';
import PopulationGraph from './PopulationGraph';

function App() {
    const [selectedPrefectures, setSelectedPrefectures] = useState([]);

    const handlePrefectureChange = (prefCode, checked) => {
        setSelectedPrefectures(prevSelectedPrefectures =>
            checked
                ? [...prevSelectedPrefectures, prefCode]
                : prevSelectedPrefectures.filter(code => code !== prefCode)
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>都道府県の人口構成グラフ</h1>
                <PrefectureSelect onPrefectureChange={handlePrefectureChange} />
                <PopulationGraph selectedPrefectures={selectedPrefectures} />
            </header>
        </div>
    );
}

export default App;


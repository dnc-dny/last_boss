import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrefectureSelect = ({ onPrefectureChange }) => {
    const [prefectures, setPrefectures] = useState([]);

    useEffect(() => {
        const fetchPrefectures = async () => {
            try {
                const response = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
                    headers: { 'X-API-KEY': 'UoaRyICGToHSOwCaUvGvpzrCp8MdChcBmpnq8QXI' }
                });
                setPrefectures(response.data.result);
            } catch (error) {
                console.error('都道府県の取得エラー:', error);
            }
        };

        fetchPrefectures();
    }, []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        onPrefectureChange(parseInt(value, 10), checked);
    };

    return (
        <div>
            <div className="prefecture-grid">
                {prefectures.map(pref => (
                    <div key={pref.prefCode} className="prefecture-item">
                        <input
                            type="checkbox"
                            id={`pref-${pref.prefCode}`}
                            value={pref.prefCode}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`pref-${pref.prefCode}`}>{pref.prefName}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrefectureSelect;

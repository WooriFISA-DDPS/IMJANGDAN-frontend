import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../useKakaoLoader';
import axios from "axios";
import './KakaoMapTest.css';

const center = {
  lat: 37.58163301627676,
  lng: 126.8860228466823,
};

const KakaoMapTest = () => {
  useKakaoLoader();

  const [position, setPosition] = useState(center);
  const [address, setAddress] = useState(null);
  const [memoList, setMemoList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchMemoData();
  }, []);

  const fetchMemoData = async () => {
    try {
      const response = await axios.get("http://localhost:8989/api/memo/list");
      setMemoList(response.data.content);
    } catch (error) {
      console.error("Error fetching memo data:", error);
    }
  };

  const handleMapClick = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    setPosition({
      lat: latlng.getLat(),
      lng: latlng.getLng()
    });
    // 마커를 생성하고 주소를 가져오는 등의 로직
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // 선택된 카테고리에 따라 마커를 표시하거나 감추는 등의 로직
  };

  const handleAddButtonClick = () => {
	// addButtonClick 함수의 내용을 이곳에 복사하여 붙여넣습니다.
  };

  return (
	<div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
	<Map
		center={center}
		style={{ width: '100%', height: '100%' }}
		level={3}
		onClick={handleMapClick}
	>
		<MapMarker position={position} />
	</Map>

	  <div className="category">
		<ul>
			<li id="allMenu" onClick={() => handleCategoryClick('all')}>
			<img className="icon" src="/images/all.png" alt="all" />
			</li>
			<li id="goodMenu" onClick={() => handleCategoryClick('good')}>
			<img className="icon" src="/images/good.png" alt="Good" />
			</li>
			<li id="sosoMenu" onClick={() => handleCategoryClick('soso')}>
			<img className="icon" src="/images/soso.png" alt="SoSo" />
			</li>
			<li id="badMenu" onClick={() => handleCategoryClick('bad')}>
			<img className="icon" src="/images/bad.png" alt="Bad" />
			</li>
		</ul>
	</div>
	
	<button className="add-button" onClick={handleAddButtonClick}>+</button>

      <ul className='memo-component'>
        {memoList.map(memo => (
          <li key={memo.id}>
            {memo.category} : {memo.title} : {memo.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KakaoMapTest;

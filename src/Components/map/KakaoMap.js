import React, { useState, useCallback, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../useKakaoLoader';

const defaultCoord = {
  // 지도의 기본 중심좌표
  lat: 37.5566803113882,
  lng: 126.904501286522,
}
const mapDefaultSize = {
  // 메모 페이지 카카오맵의 기본 사이즈
	width: '100%',
	height: '200px'
}

const  KakaoMap = ({getCoordFunction, setCoordFunction: setCoordToParent}) => {
	
	useKakaoLoader();
  
	const [coord, setCoord] = useState(defaultCoord)

  // // 위치 설정 핸들러 함수
  // const mapClickHandler = useCallback((_, mouseEvent) => {

  //   if (!window.kakao || !window.kakao.maps) {
  //     console.error("Kakao Maps SDK is not ready.");
  //     return;
  //   }
  //   const latlng = mouseEvent.latLng;
  //   const newCoord = {
  //     lat: latlng.getLat(),
  //     lng: latlng.getLng()
  //   };
  //   setCoord(newCoord);
  // }, []);

	return (
		<>
			<Map 
				center={{ lat: defaultCoord.lat, lng:defaultCoord.lng }} 
				style={{ width: mapDefaultSize.width, height: mapDefaultSize.height }} 
				level={5}
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setCoord({
            lat: latlng.getLat(),
            lng: latlng.getLng()
          });
          // alert("An issue of async await")
          setCoordToParent({
            lat: latlng.getLat(),
            lng: latlng.getLng()
          });
        }}
			>
				{/* <MapMarker position={coord ?? defaultCoord} /> */}
				<MapMarker position={coord} />
				{/* <button onClick={getAddress}>현재 좌표의 주소 얻기</button> */}
			</Map>
      {coord ? (
        `클릭한 위치의 위도는 ${coord.lat}이고, 경도는 ${coord.lng}입니다.`
      ) : (
        <p>위치를 지정해주세요.</p> // coord 없으면 나올 말
      )}
		</>
	);
};
export default KakaoMap;
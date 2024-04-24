import React, { useState, useCallback, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../useKakaoLoader';

// const defaultCoord = {
//   // 지도의 기본 중심좌표
//   lat: 37.581512341234,
//   lng: 126.886012341234,
// }

const mapDefaultSize = {
  // 메모 페이지 카카오맵의 기본 사이즈
	width: '100%',
	height: '200px'
}

const  KakaoMap = ({getCoordFunction, setCoordFunction: setCoordToParent}) => {
	useKakaoLoader();
  
	const [coord, setCoord] = useState(getCoordFunction())

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
				center={{ lat: coord.lat, lng:coord.lng }} 
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
        `( ${coord.lat}, ${coord.lng} )`
      ) : (
        <p>위치를 지정해주세요.</p> // coord 없으면 나올 말
      )}
		</>
	);
};
export default KakaoMap;
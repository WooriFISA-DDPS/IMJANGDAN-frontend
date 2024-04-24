import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../useKakaoLoader';

const center = {
  // 지도의 기본 중심좌표
  lat: 37.581512341234,
  lng: 126.886012341234,
}
const mapDefaultSize = {
	width: '100%',
	height: '200px'
}


const  KakaoMapTest = ({onMapClick}) => {
	
	useKakaoLoader();
  
	const { kakao } = window;
	const [address, setAddress] = useState(null); // 현재 좌표의 주소를 저장할 상태
	const [position, setPosition] = useState()

	const getAddress = (lat, lng) => {
		const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
		const coord = new kakao.maps.LatLng(37.5566803113882, 126.904501286522); // 주소로 변환할 좌표 입력
		const callback = function (result, status) {
			if (status === kakao.maps.services.Status.OK) {
				setAddress(result[0].address);
			}
		};
		let result = geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
		// alert(result);
	};

	return (
		<>
			<Map 
				center={{ lat: center.lat, lng:center.lng }} 
				style={{ width: mapDefaultSize.width, height: mapDefaultSize.height }} 
				level={3}
				onClick={(_, mouseEvent) => {
				  const latlng = mouseEvent.latLng
				  setPosition({
					lat: latlng.getLat(),
					lng: latlng.getLng()
				  })}
				}
			>
				<MapMarker position={position ?? center} />
				<button onClick={getAddress}>현재 좌표의 주소 얻기</button>
			</Map>

			{address && (
				<div>
					현재 좌표의 주소는..
					<p>address_name: {address.address_name}</p>
					<p>region_1depth_name: {address.region_1depth_name}</p>
					<p>region_2depth_name: {address.region_2depth_name}</p>
					<p>region_3depth_name: {address.region_3depth_name}</p>
				</div>
			)}

			{position &&
          		`클릭한 위치의 위도는 ${position.lat} 이고, 경도는 ${position.lng} 입니다`
			}
		</>
	);
};
export default KakaoMapTest;
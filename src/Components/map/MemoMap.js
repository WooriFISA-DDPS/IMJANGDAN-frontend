import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../useKakaoLoader';


const mapDefaultSize = {
	// 메모 페이지 카카오맵의 기본 사이즈
	width: '100%',
	height: '200px'
}

const MemoMap = ({ lat, lng }) => {

	const coord = {
		lat : lat,
		lng : lng
	}

	// const { kakao } = window;
	// const geocoder = new kakao.maps.services.Geocoder();
	// const [address, setAddress] = useState(); 

	// if (lat && lng) {
	// 	geocoder.coord2Address(lng, lat, (result, status) => {
	// 	  if (status === 'OK') {
	// 		setAddress(result[0].address.address_name);
	// 	  } else {
	// 		console.error('Geocoding failed:', status);
	// 	  }
	// 	});
	// }
	useKakaoLoader();

	return (
		<>
			<Map
				center={{ lat: lat, lng: lng }}
				style={{ width: mapDefaultSize.width, height: mapDefaultSize.height }}
				level={2}
			>
				<MapMarker position={coord} />
			</Map>
			{coord ? (
				<h2 className='mt-2'>address</h2>
			) : (
				<p>위치를 지정해주세요.</p> // coord 없으면 나올 말
			)}
		</>
	);
}
export default MemoMap;
import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../useKakaoLoader';


const mapDefaultSize = {
	// 메모 페이지 카카오맵의 기본 사이즈
	width: '100%',
	height: '200px'
}

const ReadOnlyMap = ({ lat, lng }) => {

	const coord = {
		lat : lat,
		lng : lng
	}

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
			
		</>
	);
}
export default ReadOnlyMap;
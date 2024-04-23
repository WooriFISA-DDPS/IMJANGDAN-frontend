import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../useKakaoLoader';


const mapDefaultSize = {
	// 메모 페이지 카카오맵의 기본 사이즈
	width: '100%',
	height: '200px'
}


const ReadOnlyMap = ({ lat, lng }) => {
	
	const [draggable, setDraggable] = useState(false)
	const coord = {
		lat: lat,
		lng: lng
	}

	useKakaoLoader();

	return (
		<div>
			<Map
				center={{ lat: lat, lng: lng }}
				style={{ width: mapDefaultSize.width, height: mapDefaultSize.height }}
				level={2}
				draggable={draggable}
			>
				<MapMarker position={coord} />
			</Map>

		</div>
	);
}
export default ReadOnlyMap;
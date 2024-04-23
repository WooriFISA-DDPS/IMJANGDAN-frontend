import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '../../useKakaoLoader';


const mapDefaultSize = {
  // 메모 페이지 카카오맵의 기본 사이즈
  width: '100%',
  height: '200px'
}

const EditMap = ({ getCoordFunction, setCoordFunction: setCoordToParent, lat, lng }) => {

  const originalCoord = {
    lat : lat,
    lng : lng
  }

  const [coord, setCoord] = useState(originalCoord)
  const { kakao } = window;
  const [address, setAddress] = useState(); 

  // if (lat && lng) {
  //   geocoder.coord2Address(lng, lat, (result, status) => {
  //     if (status === 'OK') {
  //     setAddress(result[0].address.address_name);
  //     console.log(address)
  //     } else {
  //     console.error('Geocoding failed:', status);
  //     }
  //   });
  // }

  useKakaoLoader();

  useEffect(() => {
    // Optional: If you have external logic updating coord
    getCoordFunction && getCoordFunction(coord); // Call the provided function with coord if available
  }, [coord]); // Re-run effect when coord changes

  const handleMapClick = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    setCoord({ lat: latlng.getLat(), lng: latlng.getLng() });
    setCoordToParent({ lat: latlng.getLat(), lng: latlng.getLng() });
  };

  return (
    <>
      <Map
        center={{ 
                  lat: originalCoord.lat,
                  lng: originalCoord.lng,
                }}
        style={{ width: mapDefaultSize.width, height: mapDefaultSize.height }}
        level={2}
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setCoord({
            lat: latlng.getLat(),
            lng: latlng.getLng()
          });
          
          console.log(coord.lat, coord.lng)
          // alert("An issue of async await")
          setCoordToParent({
            lat: latlng.getLat(),
            lng: latlng.getLng()
          });
        }}
      >
        <MapMarker position={coord} />
      </Map>
			
      {coord ? (
        `( ${coord.lat}, ${coord.lng} )`
      ) : (
        <p>위치를 지정해주세요.</p> // coord 없으면 나올 말
      )}
    </>
  );
}
export default EditMap;
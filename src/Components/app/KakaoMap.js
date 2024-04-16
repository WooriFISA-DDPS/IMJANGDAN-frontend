import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from "../../useKakaoLoader";

const KakaoMap = () => {
  useKakaoLoader();
  
  const [location, setLocation] = useState({ lat: 37.5566803113882, lng: 126.904501286522 });
  const [address, setAddress] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const successHandler = (response) => {
      const { latitude, longitude } = response.coords;
      setLocation({ lat: latitude, lng: longitude });
    };

    const errorHandler = (error) => {
      console.error(error);
      setError("위치 정보를 가져오는 데 실패했습니다.");
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const getAddress = () => {
    if (window.kakao) {
      const { kakao } = window;
      const geocoder = new kakao.maps.services.Geocoder();
      const coord = new kakao.maps.LatLng(location.lat, location.lng);
      const callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address);
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }
  };

  return (
    <>
      <Map center={location} style={{ width: '800px', height: '600px' }} level={3}>
        <MapMarker position={location} />
        <button onClick={getAddress}>현재 좌표의 주소 얻기</button>
      </Map>

      {address && (
        <div>
          <p>현재 좌표의 주소는..</p>
          <p>address_name: {address.address_name}</p>
          <p>region_1depth_name: {address.region_1depth_name}</p>
          <p>region_2depth_name: {address.region_2depth_name}</p>
          <p>region_3depth_name: {address.region_3depth_name}</p>
        </div>
      )}

      {error && <div>Error: {error}</div>}
    </>
  );
}

export default KakaoMap;

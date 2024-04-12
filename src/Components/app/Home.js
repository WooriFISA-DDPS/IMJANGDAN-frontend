import React, { useEffect } from "react";

function Home() {
  useEffect(() => { 
    // 카카오맵 스크립트 읽어오기
    const new_script = src => { 
      return new Promise((resolve, reject) => { 
        const script = document.createElement('script'); 
        script.src = src; 
        script.addEventListener('load', () => { 
          resolve(); 
        }); 
        script.addEventListener('error', e => { 
          reject(e); 
        }); 
        document.head.appendChild(script); 
      }); 
    };
    
    const initMap = () => {
      // 카카오맵 설정
      const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=78b11aba7429c23725ec0bad43611ef4');
      my_script.then(() => { 
        const kakao = window['kakao']; 
        kakao.maps.load(() => {
          const mapContainer = document.getElementById('map');
          const options = { 
            center: new kakao.maps.LatLng(37.58166904501892, 126.88601147045887),
            level: 3 
          }; 
          const map = new kakao.maps.Map(mapContainer, options);
          // 마커 설정
          const markerPosition = new kakao.maps.LatLng(37.58166904501892, 126.88601147045887); 
          const marker = new kakao.maps.Marker({ 
            position: markerPosition
          }); 
          marker.setMap(map); 
        });   
      }); 
    };

    initMap(); // 맵 초기화
  }, []);

  return (
    <div className="Home">
      <div id="map" className="map" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
}

export default Home;


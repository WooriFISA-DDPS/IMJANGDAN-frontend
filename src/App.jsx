import './App.css';
import { useEffect } from 'react';
import KakaoLogin from "react-kakao-login";
// const { Kakao } = window;

function App() {
  
  //스크립트 파일 읽어오기
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
  
  // 카카오 로그인 버튼 클릭 이벤트 핸들러
  const kakaoClientId = '{appkey}'
  const kakaoOnSuccess = async (data)=>{
      console.log(data)
      const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
  }
  const kakaoOnFailure = (error) => {
    console.log(error);
    alert('로그인에 실패했습니다. 다시 시도해주세요.');
    // 또는 오류를 기록하거나 기타 조치를 취할 수 있습니다.
  };

  //처음 로그인 했을 때 읽어오는 부분
  useEffect(() => { 
    //카카오맵 스크립트 읽어오기
    const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey={appkey}');
    
    //스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => { 
      console.log('script loaded!!!');  
      const kakao = window['kakao']; 
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = { 
          center: new kakao.maps.LatLng(37.58166904501892, 126.88601147045887), //좌표설정
          level: 4
        }; 
        const map = new kakao.maps.Map(mapContainer, options); //맵생성
        //마커설정
        const markerPosition = new kakao.maps.LatLng(37.58166904501892, 126.88601147045887); 
        const marker = new kakao.maps.Marker({ 
          position: markerPosition
        }); 
        marker.setMap(map); 
      });   
    }); 
  }, []);

  return (
    <>
      <div className="App">
        <div id="map" className="map"/>
        <KakaoLogin
          token={kakaoClientId}
          onSuccess={kakaoOnSuccess}
          onFail={kakaoOnFailure}
        />
      </div>
    </>
  );
  
}
export default App;
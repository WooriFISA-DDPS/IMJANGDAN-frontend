import { Map } from "react-kakao-maps-sdk"
import useKakaoLoader from "../../useKakaoLoader"
import DefaultLayout from "../../layouts/DefaultLayout"

export default function BasicMap() {
  useKakaoLoader()

  return (
    <div>
    <Map // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "calc(100vh - 60px)",
      }}
      level={3} // 지도의 확대 레벨
    />
    </div>
  )
}

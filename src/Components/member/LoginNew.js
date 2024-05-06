import React from 'react';
import '../../css/main.css';
import styled from 'styled-components';

const ColoredBgDiv = styled.div`
    --tw-bg-opacity: 1;
    background-color: rgb(228, 240, 254);
    z-index: 0; // Default stacking context for the background
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const RightCornerDiv = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    min-width: 600px;
    min-height: 400px;
    background-image: url('/images/image5.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0; // Places this div behind the login form
`;

const TitleDiv = styled.div`
    position: absolute;
    top: 120px;
    font-size: 14px;
    color: #333;
    text-align: center;
    width: 360px;
`;
const TitleImageDiv = styled.div`
    position: absolute;
    top: 68px;
    color: #333;
    text-align: center;
    width: 400px;
    background-image: url('/images/IMJANGDAN.png');
    z-index: 999999999;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
}
`;

function Login() {
  return (<>
    <ColoredBgDiv>
    <TitleImageDiv></TitleImageDiv>
    <TitleDiv>임장단: 위치기반 개인 부동산 임장지도 커뮤니케이션 플랫폼</TitleDiv>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="text-lg font-semibold mb-4">로그인하고 서비스를 이용하세요</h2>
        <form>
          <div className="mb-4">
            <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-6">
            <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="w-full bg-black text-white p-3 rounded">로그인하기</button>
        </form>
        <div className="flex justify-center space-x-2 mt-4">
          <button className="bg-yellow-400 rounded-full w-10 h-10"></button>
          <button className="bg-blue-500 rounded-full w-10 h-10"></button>
          <button className="bg-black rounded-full w-10 h-10"></button>
          <button className="bg-red-600 rounded-full w-10 h-10"></button>
        </div>
        <div className="mt-4">
          <button className="w-full mt-2 bg-blue-500 text-white p-2 rounded">회원가입</button>
          <div className="flex justify-center space-x-2 mt-4"><a href='#'>아이디/비밀번호 찾기</a></div>
        </div>
      </div>
      <RightCornerDiv />
    </ColoredBgDiv>
    </>
  );
}

export default Login;

import React, { useContext, useState } from 'react';
import axios from "axios";
import styled from 'styled-components';
import { useNavigate } from 'react-router';

import '../../css/main.css';
import { AuthContext } from '../context/AuthProvider';
import { HttpHeadersContext } from '../context/HttpHeadersProvider';
import { Link } from 'react-router-dom';

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
    z-index: -1;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    
}
`;

function LoginV2() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const changeId = (event) => {
    setId(event.target.value);
  }

  const changePwd = (event) => {
    setPwd(event.target.value);
  }

  const gotoJoin = (event) => {
    navigate('/join');
  }

  const reqLogin = async () => {

    const req = {
      email: id,
      password: pwd
    }

    console.log("#############", id, pwd)

    await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, req)
      .then((resp) => {
        console.log("[Login.js] login() success :D");
        console.log(resp.data);

        alert(resp.data.email + ", successfully signed in! 🔐");

        // JWT 토큰 저장
        localStorage.setItem("bbs_access_token", resp.data.token);
        localStorage.setItem("id", resp.data.email);

        setAuth(resp.data.email); // 사용자 인증 정보(아이디 저장)
        setHeaders({ "Authorization": `Bearer ${resp.data.toekn}` }); // 헤더 Authorization 필드 저장

        navigate("/homememo");


      }).catch((err) => {
        console.log("[Login.js] login() error :<");
        console.log(err);

        alert("⚠️ is it here? 3 " + err.response.data);
      });
  }

  return (<>
    <ColoredBgDiv>
      <TitleImageDiv></TitleImageDiv>
      <TitleDiv>임장단: 위치기반 개인 부동산 임장지도 커뮤니케이션 플랫폼</TitleDiv>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="text-lg font-semibold mb-4">로그인하고 서비스를 이용하세요!</h2>
        
          <div className="mb-4">
            <input type="email" value={id} onChange={changeId} placeholder="Email" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-6">
            <input type="password" value={pwd} onChange={changePwd} placeholder="Password" class="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" onClick={reqLogin} className="w-full bg-black text-white p-3 rounded">로그인</button>
        
        <div className="flex justify-center space-x-2 mt-4">
          <button className="bg-yellow-400 rounded-full w-10 h-10"></button>
          <button className="bg-blue-500 rounded-full w-10 h-10"></button>
          <button className="bg-black rounded-full w-10 h-10"></button>
          <button className="bg-red-600 rounded-full w-10 h-10"></button>
        </div>
        <div className="mt-4">
          <button className="w-full mt-2 bg-blue-500 text-white p-2 rounded" onClick={gotoJoin} >회원가입</button>
          <div className="flex justify-center space-x-2 mt-2"><a href='/api/memomap'>비회원으로 계속하기</a></div>
        </div>
      </div>
      <RightCornerDiv />
    </ColoredBgDiv>
  </>
  );
}

export default LoginV2;

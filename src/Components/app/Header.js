import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarMenu = styled.a`
  color: rgba(255,255,255,.75);
  display: block;
  padding: .5rem 1rem;
  padding-right: 1rem;
  padding-left: 1rem;
`;


function Header() {
  const { auth, setAuth } = useContext(AuthContext);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const handleDrawerToggle = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed); // Toggle collapse state
  };


  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="container">

          <NavbarMenu
            className="flex justify-between nav-item "
            rel='noopener noreferrer'
            href="http://localhost:8989/memomap">
            <i className="fas fa-home"> IMJANGDAN</i>

          </NavbarMenu>

          
          {auth ? (
                <div className="text-[rgba(255,255,255,.75)]">
                  {/* 회원 정보 */}
                  {auth} <i className="fab fa-ello"></i>
                </div>): (<></>)}

          <button
            className="mr-3"
            class="navbar-toggler"
            type="button"
            onClick={handleDrawerToggle}
          >
            <span class="navbar-toggler-icon"></span>
          </button>


          <div
            className={`navbar-collapse ${isNavbarCollapsed ? "hidden" : ""
              }`}
            id="navbar-content"
          >

            <ul class="navbar-nav me-auto">
              {/* 메인 화면 */}
              <li className="nav-item">
                {/* <Link className="nav-link" to="/">
                  <i className="fas fa-home"></i> IMJANGDAN
                </Link> */}
              </li>
              {/* 메모 */}
              <li className="nav-item">
                <Link className="nav-link" to="/homememo" onClick={handleDrawerToggle} >
                  메모
                </Link>
              </li>

              {/* 뉴스 */}
              <li className="nav-item">
                <Link className="nav-link" to="/newslist"  onClick={handleDrawerToggle}>
                  뉴스
                </Link>
              </li>

              {/* 커뮤니티 */}
              <li className="nav-item">
                <Link className="nav-link" to="/bbslist" onClick={handleDrawerToggle} >
                  커뮤니티
                </Link>
              </li>

              {/* 공인중개사 */}
              {/* <li className="nav-item">
                <div
                  className="nav-link"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                    공인중개사
                  </div>
                </li>

                {/* 파이낸싱 */}
              {/* <li className="nav-item">
                  <div
                    className="nav-link"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                      파이낸싱
                    </div>
                  </li>  */}
            </ul>
            <ul className="ml-auto navbar-nav">
              {auth ? (
                <>
                  {/* 회원 정보 */}
                  <li className="nav-item"  onClick={handleDrawerToggle}>
                    <Link className="nav-link" to="/checkpwd">
                      회원 정보 수정
                    </Link>
                  </li>



                  {/* 컬렉션 */}
                  <li className="nav-item"  onClick={handleDrawerToggle}>
                    <div
                      className="nav-link"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      내 컬렉션
                    </div>
                  </li>
                  {/* 관리자 메뉴 
                  <li className="nav-item dropdown">
                    <div
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      관리자
                    </div>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to="/bbslist">
                        회원 관리
                      </Link>
                      <Link className="dropdown-item" to="/bbswrite">
                        로그
                      </Link>
                      <Link className="dropdown-item" to="/bbswrite">
                        모니터링
                      </Link>
                    </div>
                  </li>*/}

                  {/* 로그아웃 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout"  onClick={handleDrawerToggle}>
                      <i className="fas fa-sign-out-alt"></i> 로그아웃
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* 로그인 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login"  onClick={handleDrawerToggle}>
                      로그인
                    </Link>
                  </li>

                  {/* 회원가입 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/join"  onClick={handleDrawerToggle}>
                      회원가입
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

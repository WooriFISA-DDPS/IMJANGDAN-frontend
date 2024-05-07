import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarMenu = styled.a`
  color: rgba(0,0,0);
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
      <nav className="navbar navbar-expand-md navbar-light bg-[#E1DAED] sticky-top">
        <div className="container">

          <NavbarMenu
            className="flex justify-between nav-item "
            rel='noopener noreferrer'
            href={`${process.env.REACT_APP_API_URL}/memomap`}>
            <i className="fas fa-home"> IMJANGDAN</i>

          </NavbarMenu>




          <button
            className="mr-3 navbar-toggler"
            type="button"
            onClick={handleDrawerToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>


          <div
            className={`navbar-collapse ${isNavbarCollapsed ? "hidden" : ""
              }`}
            id="navbar-content"
          >

            <ul class="navbar-nav me-auto">
              {/* 메인 화면 */}
              <li className="ml-3 nav-item">
                {/* <Link className="nav-link" to="/">
                  <i className="fas fa-home"></i> IMJANGDAN
                </Link> */}

              </li>
              {/* 메모 */}
              <li className="px-1 nav-item">
                <Link className="nav-link" to="/homememo" onClick={handleDrawerToggle} >
                  메모
                </Link>
              </li>

              {/* 뉴스 */}
              <li className="px-1 nav-item">
                <Link className="nav-link" to="/newslist" onClick={handleDrawerToggle}>
                  뉴스
                </Link>
              </li>

              {/* 커뮤니티 */}
              <li className="px-1 nav-item">
                <Link className="nav-link" to="/bbslist" onClick={handleDrawerToggle} >
                  커뮤니티
                </Link>
              </li>


            </ul>
            <ul className="ml-auto navbar-nav">
              {auth ? (
                <>
                  {/* 회원 정보 */}
                  <li className="nav-item" onClick={handleDrawerToggle}>
                    <Link className="nav-link" to="/checkpwd">
                      {auth}
                    </Link>
                  </li>



                  {/* 로그아웃 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout" onClick={handleDrawerToggle}>
                      <i className="fas fa-sign-out-alt"></i> 로그아웃
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* 로그인 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={handleDrawerToggle}>
                      로그인
                    </Link>
                  </li>

                  {/* 회원가입 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/join" onClick={handleDrawerToggle}>
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

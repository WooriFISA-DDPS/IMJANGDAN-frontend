import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Header() {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="container">
          <div
            className="navbar-collapse justify-content-between"
            id="navbar-content"
          >
            <ul className="navbar-nav mr-auto">
              {/* 메인 화면 */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fas fa-home"></i> IMJANGDAN
                </Link>
              </li>
              {/* 메모 */}
              <li className="nav-item">
                <Link className="nav-link" to="/homememo">
                  메모
                </Link>
              </li>
{/* 
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/bbslist">
                    메모목록
                  </Link>
                  <Link className="dropdown-item" to="/bbswrite">
                    메모추가
                  </Link> 
                 </div>
              </li> */}

              {/* 뉴스 */}
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  뉴스
                </Link>
              </li>

              {/* 커뮤니티 */}
              <li className="nav-item">
                <Link className="nav-link" to="/bbslist">
                  커뮤니티
                </Link>
              </li>
              
              {/* 공인중개사 */}
              <li className="nav-item">
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
              <li className="nav-item">
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
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {auth ? (
                <>
                  {/* 회원 정보 */}
                  <li className="nav-item">
                      <Link className="nav-link" to="/checkpwd">
                        {/* <i className="fas fa-sign-out-alt"></i>*/}
                        {auth} 님 반갑습니다 <i className="fab fa-ello"></i>{" "} &nbsp;{" "} 
                      </Link>
                  </li>

                  
                  
                  {/* 컬렉션 */}
                  <li className="nav-item">
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
                  

                  {/* 로그아웃 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                      <i className="fas fa-sign-out-alt"></i> 로그아웃
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* 로그인 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      로그인
                    </Link>
                  </li>

                  {/* 회원가입 */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/join">
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

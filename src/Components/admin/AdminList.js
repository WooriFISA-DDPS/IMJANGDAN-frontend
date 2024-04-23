import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import axios from "axios";

import "../../css/bbslist.css";
import "../../css/page.css";

function AdminList() {
  const [adminList, setAdminList] = useState([]);

  // 검색용 Hook
  const [choiceVal, setChoiceVal] = useState("");
  const [searchVal, setSearchVal] = useState("");

  // Paging
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  // 게시글 전체 조회
  const getAdminList = async (page) => {
    try {
		const response = await axios.get("http://localhost:8989/user/memberlist", {
			params: {"page": page - 1},
		  });

      console.log("[AdminList.js] useEffect() success :D");
      console.log(response.data);

      setAdminList(response.data.content);
      setPageSize(response.data.pageSize);
      setTotalPages(response.data.totalPages);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("[AdminList.js] useEffect() error :<");
      console.log(error);
    }
  };

  // 게시글 검색
  const search = async () => {
    try {
      const response = await axios.get("http://localhost:8989/users/search", {
        params: {
          page: page - 1,
          title: choiceVal === "title" ? searchVal : "",
          content: choiceVal === "content" ? searchVal : "",
          writerName: choiceVal === "writer" ? searchVal : "",
        },
      });

      console.log("[AdminList.js searchBtn()] success :D");
      console.log(response.data);

      setAdminList(response.data.content);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("[AdminList.js searchBtn()] error :<");
      console.log(error);
    }
  };

  // 첫 로딩 시, 한 페이지만 가져옴
  useEffect(() => {
    getAdminList(1);
  }, []);

  // 검색 조건 저장
  const changeChoice = (event) => { setChoiceVal(event.target.value);};
  const changeSearch = (event) => { setSearchVal(event.target.value);};

  // 페이징 보여주기 
  const changePage = (page) => {
    setPage(page);
    getAdminList(page);
  };

  return (
    <div>
      {/* 검색 */}
      <table className="search">
        <tbody>
          <tr>
            <td>
              <select
                className="custom-select"
                value={choiceVal}
                onChange={changeChoice}
              >
                <option>검색 옵션 선택</option>
                <option value="member_login_id">아이디</option>
                <option value="member_name">사용자 이름</option>
                <option value="member_role">사용자 역할</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="검색어"
                value={searchVal}
                onChange={changeSearch}
              />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={search}
              >
                <i className="fas fa-search"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-1">고유번호</th>
            <th className="col-3">아이디</th>
            <th className="col-2">사용자 이름</th>
            <th className="col-2">사용자 역할</th>
            <th className="col-2">관심지역코드</th>
            <th className="col-4">회원탈퇴처리</th>
          </tr>
        </thead>

        <tbody>
          {adminList.map(function (members, idx) {
            return <TableRow obj={members} key={idx} cnt={idx + 1} />;
          })}
        </tbody>
      </table>

      <Pagination
        className="pagination"
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={totalPages}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={changePage}
      />

    </div>
  );
}

/* 글 목록 테이블 행 컴포넌트 */
function TableRow(props) {
  const member = props.obj;

  return (
    <tr>
      <th>{props.cnt}</th>
      <td>
        <Link to={{ pathname: `/memberdetail/${member.memberId}` }}>
          <span className="underline bbs-title">{member.email}</span>
        </Link>
      </td>
      <td>{member.username}</td>
      <td>{member.roles}</td>
      <td >{member.regionId}</td>
      <td>
        <button className="btn btn-outline-danger" onClick={() => {alert('탈퇴 처리합니다!')}}>
          <i className="fas fa-check"></i> 탈퇴 처리
        </button>
      </td>
    </tr>
  );
}

// /* 글 목록 테이블 행 컴포넌트 */
// function TableRow(props) {
// 	const bbs = props.obj;

// 	return (
// 			<tr>
				
// 					<th>{props.cnt}</th>
// 					{
// 						(bbs.del == 0) ?
// 						// 삭제되지 않은 게시글
// 						<>
// 							<td >
// 								<Arrow depth={bbs.depth}></Arrow> &nbsp; { /* 답글 화살표 */}

// 								<Link to={{ pathname: `/bbsdetail/${bbs.seq}` }}> { /* 게시글 상세 링크 */}
// 									<span className="underline bbs-title" >{bbs.title} </span> { /* 게시글 제목 */}
// 								</Link>
// 							</td>
// 							<td>{bbs.id}</td>
// 						</>
// 						:
// 						// 삭제된 게시글
// 						<>
// 							<td>
// 								<Arrow depth={bbs.depth}></Arrow> &nbsp; { /* 답글 화살표 */}

// 								<span className="del-span">⚠️ 이 글은 작성자에 의해 삭제됐습니다.</span>
// 							</td>
// 						</>	
// 					}
					
				
// 			</tr>
		
// 	);
// }

export default AdminList;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import axios from "axios";

import "../../css/bbslist.css";
import "../../css/page.css";

function BbsList() {
  const [bbsList, setBbsList] = useState([]);

  // 검색용 Hook
  const [choiceVal, setChoiceVal] = useState("");
  const [searchVal, setSearchVal] = useState("");

  // Paging
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  // 게시글 전체 조회
  const getBbsList = async (page) => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
		const response = await axios.get(`${API_URL}/board/list`, {
			params: {"page": page - 1},
		  });

      console.log("[BbsList.js] useEffect() success :D");
      console.log(response.data);

      setBbsList(response.data.content);
      setPageSize(response.data.pageSize);
      setTotalPages(response.data.totalPages);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("[BbsList.js] useEffect() error :<");
      console.log(error);
    }
  };

  // 게시글 검색
  const search = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await axios.get(`${API_URL}/board/search`, {
        params: {
          page: page - 1,
          title: choiceVal === "title" ? searchVal : "",
          content: choiceVal === "content" ? searchVal : "",
          writerName: choiceVal === "writer" ? searchVal : "",
        },
      });

      console.log("[BbsList.js searchBtn()] success :D");
      console.log(response.data);

      setBbsList(response.data.content);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.log("[BbsList.js searchBtn()] error :<");
      console.log(error);
    }
  };

  // 첫 로딩 시, 한 페이지만 가져옴
  useEffect(() => {
    getBbsList(1);
  }, []);

  // 검색 조건 저장
  const changeChoice = (event) => { setChoiceVal(event.target.value);};
  const changeSearch = (event) => { setSearchVal(event.target.value);};

  // 페이징 보여주기 
  const changePage = (page) => {
    setPage(page);
    getBbsList(page);
  };

  return (
    <div>
      {/* 검색 */}
      <table className="my-2 search">
        <tbody>
          <tr>
            <td>
              <select
                className="custom-select"
                value={choiceVal}
                onChange={changeChoice}
              >
                <option>검색 옵션</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="writer">작성자</option>
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

      <table className="table table-hover">
        <thead className="bg-slate-100">
          <tr>
            <th className="w-1/10">no</th>
            <th className="w-7/10">제목</th>
            <th className="overflow-hidden w-2/10">작성자</th>
            {/* <th className="w-1/12">조회수</th> */}
          </tr>
        </thead>

        <tbody>
          {bbsList.map(function (bbs, idx) {
            return <TableRow obj={bbs} key={idx} cnt={idx + 1} />;
          })}
        </tbody>
      </table>

      <Pagination
        className="pagination"
        activePage={page}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalCnt}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={changePage}
      />

      <div className="my-5 d-flex justify-content-center">
        <Link className="btn btn-outline-secondary" to="/bbswrite">
          <i className="fas fa-pen"></i> &nbsp; 글쓰기
        </Link>
      </div>
    </div>
  );
}

/* 글 목록 테이블 행 컴포넌트 */
function TableRow(props) {
  const bbs = props.obj;
  const writerNameParts = bbs.writerName.split("@");
  const nameBeforeAt = writerNameParts[0];

  const truncateName = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
  };

  const truncatedName = truncateName(nameBeforeAt, 10);


  
  return (
    <tr className="overflow-hidden">
      <th style={{ textAlign: 'center'}}>{ props.cnt }</th>
      <td className="overflow-hidden w-7/10 text-ellipsis">
        <Link 
          to={{ pathname: `/bbsdetail/${bbs.boardId}` }}
          >
          <span className=" bbs-title">{bbs.title}</span>
        </Link>
      </td>
      <td >{ truncatedName }</td>
      {/* <td style={{ textAlign: 'center' }}>{bbs.viewCount}</td> */}
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

export default BbsList;

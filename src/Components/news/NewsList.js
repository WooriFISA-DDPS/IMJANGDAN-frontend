import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";

function NewsList() {
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  const getNewsList = async (page) => {
    try {
      const response = 
      await axios.get(`${process.env.REACT_APP_API_URL}/news/list`, {
        params: { page: page - 1 },
      });

      console.log("[NewsList.js] useEffect() success :D");
      console.log(response.data);

      setNewsList(response.data.content);
      setPageSize(response.data.pageSize);
      setTotalPages(response.data.totalPages);
      setTotalCnt(response.data.totalElements);
    } catch (error) {
      console.error("[NewsList.js] useEffect() error :<");
      console.error(error);
    }
  };

  useEffect(() => {
    getNewsList(1);
  }, []);

  const changePage = (page) => {
    setPage(page);
    getNewsList(page);
  };

  return (
    <div>
      <table className="table table-hover">
        <thead className="bg-slate-100">
          <tr>
            <th className="w-1/10">no</th>
            <th className="w-7/10">제목</th>
            <th className="overflow-hidden w-2/10">링크</th>
          </tr>
        </thead>

        <tbody>
          {newsList.map(function (news, idx) {
            return (
              <tr key={idx}>
                <td style={{ textAlign: "center" }}>{news.id}</td>
                <td className="w-7/10 text-ellipsis">{news.title}</td>
                <td className="content-center">
                  <a 
                    href={news.link}  
                    target="_blank" 
                    rel="noopener noreferrer"
                  >🔗</a>
                </td>
              </tr>
            );
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
    </div>
  );
}

export default NewsList;

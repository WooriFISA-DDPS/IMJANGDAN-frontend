import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import TodoBody from '../todos/TodoBody.jsx'
import TodoDetail from "../todos/TodoDetail.jsx";
// import TodoDetailMobile from '../todoMobile/TodoDetailMobile.jsx'
import TodoHeaderMobile from '../todoMobile/TodoHeaderMobile.jsx'

import DefaultLayout from "../../layouts/DefaultLayout.jsx";
import ModalMobile from "../ui/ModalMobile.jsx";

import '../../css/main.css';
import '../../css/style.css';
import { HttpHeadersContext } from "../context/HttpHeadersProvider.js";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.js";

// const { kakao } = window;

const dummyTodos = []

function HomeMemoMobile() {
  const [todos, setTodos] = useState(dummyTodos);
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [detail, setDetail] = useState(null);
  const [latestMemo, setLatestMemo] = useState(null); // Initialize with null
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [files, setFiles] = useState([]); // 추가: 파일 목록 상태 추가

  const latFromParam = searchParams.get("lat"); // 위도
  const lngFromParam = searchParams.get("lng"); // 경도 

  const handleCloseModal = () => {
    setIsOpenDetail(false); // Close the modal
  };

  const handleItemClick = () => {
    setIsOpenDetail(true); // Open modal for editing
  };


  const findItemById = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/memo/${id}`);
      // console.log("HomeMemo Fetched Memo Details:", fetchedDetail);
      setdetailFunction(response.data)
      handleItemClick()
    } catch (error) {
      console.error("Error fetching memo details:", error);
    }
  }

  const getdetailFunction = () => {
    console.log(detail);
    return detail
  }
  const setdetailFunction = (detail) => {
    // console.log("Set the detail : ", detail)
    setDetail(detail)
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/memo/list`);
        const fetchedTodos = response.data.content;

        const filteredTodos = fetchedTodos.map((todo) => ({
          memoId: todo.memoId,
          title: todo.title,
          summary: todo.content, // db에는 content로 저장되어 있음 
          category: todo.category,
          latitude: todo.latitude,
          longitude: todo.longitude,
          writerEmail: todo.writerName
        }));

        if (fetchedTodos.length > 0) { // Check if there are any todos
          setLatestMemo(filteredTodos[0]); // Update latestMemo with the first item
        }

        setTodos([...dummyTodos, ...filteredTodos]);
      } catch (error) {
        console.error(error); // Handle errors appropriately
      }
    };

    fetchTodos();
  }, []);


  /* 파일 업로드 */
  const fileUpload = async (memoId) => {
    console.log("업로드할 파일 목록:", memoId, files);
    const fd = new FormData();
    files.forEach((file) => fd.append("file", file));

    await axios
      .post(`${process.env.REACT_APP_API_URL}/memo/${memoId}/file/upload`, fd, { headers: headers })
      .then((resp) => {
        console.log("[memofile.js] fileUpload() success :D");
        console.log(resp.data);

        alert("파일 업로드 성공 :D");
        setFiles([]);
      })
      .catch((err) => {
        console.log("[FileData.js] fileUpload() error :<");
        console.log(err);
      });
  };

  useEffect(() => {

    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/memo/list`);
        const fetchedTodos = response.data.content;

        const filteredTodos = fetchedTodos.map((todo) => ({
          memoId: todo.memoId,
          title: todo.title,
          summary: todo.content, // db에는 content로 저장되어 있음 
          category: todo.category,
          latitude: todo.latitude,
          longitude: todo.longitude,
          writerEmail: todo.writerName
        }));

        if (fetchedTodos.length > 0) { // Check if there are any todos

          await axios
            .get(`${process.env.REACT_APP_API_URL}/memo/${filteredTodos[0].memoId}`, { headers: headers })
            .then((resp) => {
              const receivedMemo = {
                memoId: resp.data.memoId,
                title: resp.data.title,
                content: resp.data.content,
                category: resp.data.category,
                latitude: resp.data.latitude,
                longitude: resp.data.longitude,
                files: resp.data.files // 1개의 첨부파일 아님! 첨부파일 목록을 가져옴.
              };

              setLatestMemo(receivedMemo); // Update latestMemo with the first item
              setdetailFunction(receivedMemo);
            })
            .catch((err) => {
              console.log("[MEMOWrite.js] createMemo() error :<");
              console.log(err);
            });

        }

        setTodos([...dummyTodos, ...filteredTodos]);
      } catch (error) {
        console.error(error); // Handle errors appropriately
      }
    };

    fetchTodos();
  }, []);

  // Todo 추가 핸들러
  const addTodoHandler = async ({ title, summary, category, coord, files }) => {
    console.log("add todo handler")
    console.log(title, summary, category, coord);

    const reqTodo = {
      // memoId: window.crypto.randomUUID(), // int로 바꿔야..?
      title,
      content: summary,
      category,
      latitude: coord.lat,
      longitude: coord.lng,
      files
    };

    console.log("newTodo ", reqTodo)

    await axios
      .post(`${process.env.REACT_APP_API_URL}/memo/write`, reqTodo, { headers: headers })
      .then((resp) => {
        const tempMemoId = resp.data.memoId
        fileUpload(tempMemoId)

        const receivedMemo = {
          memoId: resp.data.memoId,
          title: resp.data.title,
          summary: resp.data.content,
          category: resp.data.category,
          latitude: resp.data.latitude,
          longitude: resp.data.longitude,
          attachments: resp.data.files // 1개의 첨부파일 아님! 첨부파일 목록을 가져옴.
        };
        const updatedTodos = [receivedMemo, ...todos];
        setTodos(updatedTodos);

        alert("새로운 메모를 성공적으로 등록했습니다 :D");
        navigate(`/homememo`); // 새롭게 등록한 글 상세로 이동

      })
      .catch((err) => {
        console.log("[MEMOWrite.js] createMemo() error :<");
        console.log(err);
      });

  };

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("bbs_access_token")}`,
    });

    // 로그인한 사용자인지 체크
    if (!auth) {
      alert("로그인 한 사용자만 메모를 작성할 수 있습니다 !");
      navigate(-1);
    }
  }, []);


  return (
    <div className="flex-col mx-3" >
      <DefaultLayout>


        <div className="">
          <TodoHeaderMobile
            latParam={latFromParam}
            lngParam={lngFromParam}
            files={files}
            setFiles={setFiles}
            onAdd={addTodoHandler}
          />
          <section className="static mt-[75px]">

            <TodoBody todos={todos} onFind={findItemById} />

            {isOpenDetail && (
              <ModalMobile onClose={handleCloseModal}>
                <TodoDetail detail={detail} latestMemo={latestMemo} />
              </ModalMobile>
            )}
          </section>
        </div>
      </DefaultLayout>



    </div>



    //     </div>
    // </div>
  );
}

export default HomeMemoMobile;
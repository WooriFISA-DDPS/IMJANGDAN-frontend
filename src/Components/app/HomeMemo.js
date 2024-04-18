import React, { useContext,useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TodoBody from '../todos/TodoBody'
import TodoHeader from '../todos/TodoHeader'
import TodoDetail from "../todos/TodoDetail";
import Modal from '../ui/Modal.jsx'

import DefaultLayout from "../../layouts/DefaultLayout.jsx";

import '../../css/main.css';
import '../../css/style.css';
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

// const { kakao } = window;

const dummyTodos = []

function HomeMemo() {
  const [todos, setTodos] = useState(dummyTodos);
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);

  const findItemById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8989/memo/${id}`);
      // console.log("HomeMemo Fetched Memo Details:", fetchedDetail);
      setdetailFunction(response.data)
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
        const response = await axios.get("http://localhost:8989/memo/list");
        const fetchedTodos = response.data.content;
        console.log("Fetched Todos:", fetchedTodos); // Log fetched data to console
        // console.log("window.kakao: ", kakao); // window.kakao 확인하기

        const filteredTodos = fetchedTodos.map((todo) => ({
          memoId: todo.memoId,
          title: todo.title,
          summary: todo.content,
          category: todo.category,
          latitude: todo.latitude,
          longitude: todo.longitude,
          writerEmail: todo.writerName
        }));

        setTodos([...dummyTodos, ...filteredTodos]);
      } catch (error) {
        console.error(error); // Handle errors appropriately
      }
    };

    fetchTodos();
  }, []);

  // Todo 추가 핸들러
  const addTodoHandler = async ({ title, summary, category, detail }) => {
    console.log("add todo handler")
    console.log(title, summary, category, detail);

    const reqTodo = {
      memoId: window.crypto.randomUUID(), // int로 바꿔야..?
      title,
      content: summary,
      category,
      latitude: detail.lat,
      longitude: detail.lng
    };

    console.log("newTodo ", reqTodo)

    await axios
      .post("http://localhost:8989/memo/write", reqTodo, { headers: headers })
      .then((resp) => {
        console.log("[MEMOWrite.js] createMEMO() success :D");
        console.log(resp.data);
        const memoId = resp.data.memoId;
        console.log("boardId:", memoId);
        //fileUpload(memoId);

        alert("새로운 메모를 성공적으로 등록했습니다 :D");
       // navigate(`/bbsdetail/${resp.data.memoId}`); // 새롭게 등록한 글 상세로 이동
      })
      .catch((err) => {
        console.log("[MEMOWrite.js] createMemo() error :<");
        console.log(err);
      });
  

    const updatedTodos = [...todos, reqTodo];
    setTodos(updatedTodos);
  
  };

  


  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("bbs_access_token")}`,
    });

    // 로그인한 사용자인지 체크
    if (!auth) {
      alert("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
      navigate(-1);
    }
  }, []);


  return (
    <div className="flex my-4">
      <DefaultLayout>
        
        <div className="container">
          <section className="static">
            <TodoHeader onAdd={addTodoHandler} />
            <TodoBody todos={todos}  onFind={findItemById} />
          </section>
        </div>
      </DefaultLayout>

      <div className="container h-full ml-2 justify-between bg-gray-100 border-solid border-1 border-gray overflow-auto">
        <TodoDetail detail={detail}/>
      </div>

    </div>
      
    

    //     </div>
    // </div>
  );
}

export default HomeMemo;
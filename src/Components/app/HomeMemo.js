import React, { useContext,useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TodoBody from '../todos/TodoBody'
import TodoHeader from '../todos/TodoHeader'

import FullLayout from '../../layouts/FullLayout';

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
  const addTodoHandler = async ({ title, summary, category, coord }) => {
    console.log("add todo handler")
    console.log(title, summary, category, coord);

    const reqTodo = {
      memoId: window.crypto.randomUUID(), // int로 바꿔야..?
      title,
      content: summary,
      category,
      latitude: coord.lat,
      longitude: coord.lng
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
        console.log("[MEMOWrite.js] createBbs() error :<");
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
    // <div className="container mt-5">
    //     <div className="jumbotron">

    <FullLayout>
      <div>
        <header>
          <div className="flex justify-center">
            <a href="/">
              <h1 className='py-8 text-red-200 max-w-max text-7xl'>Memo</h1>
            </a>
          </div>
        </header>
        <section>
          <TodoHeader onAdd={addTodoHandler} />
          <TodoBody todos={todos} />
        </section>
      </div>
      </FullLayout>

    //     </div>
    // </div>
  );
}

export default HomeMemo;
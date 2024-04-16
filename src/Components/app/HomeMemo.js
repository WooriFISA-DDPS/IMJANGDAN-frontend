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

        const filteredTodos = fetchedTodos.map((todo) => ({
          memoId: todo.memoId,
          title: todo.title,
          summary: todo.content,
          category: todo.category,
<<<<<<< HEAD
          latitude: todo.latitude,
          longitude: todo.longitude,
=======
          writerEmail: todo.writerName
>>>>>>> afd5eb8f34751633e4899e9ba498d3c37668d92a
        }));


        setTodos([...dummyTodos, ...filteredTodos]);
      } catch (error) {
        console.error(error); // Handle errors appropriately
      }
    };

    fetchTodos();
  }, []);

  // Todo 추가 핸들러
  const addTodoHandler = async ({ title, summary, category }) => {
    console.log("add todo handler")
    console.log(title, summary, category);


    const reqTodo = {
      memoId: window.crypto.randomUUID(), // int로 바꿔야..?
      title,
      content: summary,
      category,
      latitude: "1234",
      longitude: "2345"
    };

    console.log("newTodo ", reqTodo)

<<<<<<< HEAD
    return (
        // <div className="container mt-5">
        //     <div className="jumbotron">
            
      <FullLayout>
=======
    await axios
      .post("http://localhost:8989/memo/write", reqTodo, { headers: headers })
      .then((resp) => {
        console.log("[MEMOWrite.js] createMEMO() success :D");
        console.log(resp.data);
        const memoId = resp.data.memoId;
        console.log("boardId:", memoId);
        //fileUpload(memoId);

        alert("새로운 게시글을 성공적으로 등록했습니다 :D");
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

    <DefaultLayout>
>>>>>>> afd5eb8f34751633e4899e9ba498d3c37668d92a
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
<<<<<<< HEAD
      </FullLayout>
=======
    </DefaultLayout>
>>>>>>> afd5eb8f34751633e4899e9ba498d3c37668d92a

    //     </div>
    // </div>
  );
}

export default HomeMemo;
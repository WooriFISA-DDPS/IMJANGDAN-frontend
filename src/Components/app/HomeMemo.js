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
  const [latestMemo, setLatestMemo] = useState(null); // Initialize with null

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

  // Todo 추가 핸들러
  const addTodoHandler = async ({ title, summary, category, coord }) => {
    console.log("add todo handler")
    console.log(title, summary, category, coord);

    const reqTodo = {
      // memoId: window.crypto.randomUUID(), // int로 바꿔야..?
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
        // console.log("[MEMOWrite.js] createMEMO() success :D");
        // console.log(resp.data);
        // console.log("boardId:", memoId);
        //fileUpload(memoId);

        const receivedMemo = {
          memoId: resp.data.memoId, // int로 바꿔야..?
          title: resp.data.title,
          summary: resp.data.content,
          category: resp.data.category,
          latitude: resp.data.latitude,
          longitude: resp.data.longitude
        };

        const updatedTodos = [ receivedMemo, ...todos];
        setTodos(updatedTodos);

        alert("새로운 메모를 성공적으로 등록했습니다 :D");
        
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
    <div className="flex my-4">
      <DefaultLayout>
        
        <div className="container">
          <section className="static">
            <TodoHeader onAdd={addTodoHandler} />
            <TodoBody todos={todos}  onFind={findItemById} />
          </section>
        </div>
      </DefaultLayout>

      <div className="container mb-5 ml-2 justify-between bg-gray-100 border-solid border-1 border-gray overflow-auto">
        {latestMemo ? <TodoDetail detail={detail} latestMemo={latestMemo}/> : null}
      </div>

    </div>
      
    

    //     </div>
    // </div>
  );
}

export default HomeMemo;
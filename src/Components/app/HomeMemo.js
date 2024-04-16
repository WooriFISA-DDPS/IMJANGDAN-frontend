import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TodoBody from '../todos/TodoBody'
import TodoHeader from '../todos/TodoHeader'

import FullLayout from '../../layouts/FullLayout';

import '../../css/main.css';
import '../../css/style.css';

const dummyTodos = []

function HomeMemo() {
  const [todos, setTodos] = useState(dummyTodos);

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
          latitude: todo.latitude,
          longitude: todo.longitude,
        }));
  
  
        setTodos([...dummyTodos, ...filteredTodos]);
      } catch (error) {
        console.error(error); // Handle errors appropriately
      }
    };
  
    fetchTodos();
  }, []);

  // Todo 추가 핸들러
  const addTodoHandler = ({ title, summary, category }) => {
    console.log("add todo handler")
    console.log(title, summary, category);

    const newTodo = {
      id: window.crypto.randomUUID(),
      title,
      summary,
      category
    };

    // ...todos -> {React}, {점심}, {커피..}
    // newTodo -> {새로운 todo 데이터..}
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
  }

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
          <TodoHeader onAdd={addTodoHandler}/>
          <TodoBody todos={todos}/>
        </section> 
      </div>
      </FullLayout>

        //     </div>
        // </div>
    );
}

export default HomeMemo;

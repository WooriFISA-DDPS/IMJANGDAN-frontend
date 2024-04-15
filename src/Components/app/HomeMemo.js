import React, { useState } from "react";
import { Link } from "react-router-dom";

import TodoBody from '../todos/TodoBody'
import TodoHeader from '../todos/TodoHeader'

import DefaultLayout from '../../layouts/DefaultLayout';

import '../../css/main.css';
import '../../css/style.css';

const dummyTodos = [
    {
      id: 1,
      title: '상암 오벨리스크 1차',
      summary: '고즈넉한 분위기, 월세 공실률 낮음',
      category: 'Good',
    },
    {
      id: 2,
      title: '월드컵파크 5단지',
      summary: '쾌적한 주차공간, 입지 대비 가격이 비쌈',
      category: 'SoSo',
    },
    {
      id: 3,
      title: '월드컵파트 2단지',
      summary: '업무지구, 주말 유동인구 적음',
      category: 'Bad',
    },
    // Add Memo 시 여기에 추가
  ]

function HomeMemo() {
  const [todos, setTodos] = useState(dummyTodos);

  // Todo 추가 핸들러
  const addTodoHandler = ({ title, summary, category }) => {
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
            
      <DefaultLayout>
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
      </DefaultLayout>

        //     </div>
        // </div>
    );
}

export default HomeMemo;
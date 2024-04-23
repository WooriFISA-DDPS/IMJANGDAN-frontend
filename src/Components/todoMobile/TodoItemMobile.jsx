import React, { useContext, useState, useEffect } from "react";
import { TODO_CATEGORY_ICON } from "../../constants/icon.jsx";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../ui/Modal.jsx";
import TodoEditForm from "../todos/TodoEditForm.jsx";
import TodoDetail from "../todos/TodoDetail.jsx";

// rafce
const TodoItemMobile = ({ todo, onFind, onEdit, onDelete }) => {
  // State for modal visibility
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [latestMemo, setLatestMemo] = useState(null); // Initialize with null

  const navigate = useNavigate();

  // id값 받아서 상위 컴포넌트로 전달
  const findItemById2 = (id) => {
    console.log(id);
    onFind(id);
  };

  const handlePencilClick = () => {
    setIsOpen(true); // Open modal for editing
  };

  const handleCloseModal = () => {
    setIsOpen(false); // Close the modal
  };

  const deleteMemo = async (id) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8989/memo/${id}/delete`
        );

        if (response.status == 200) {
          alert("게시글을 성공적으로 삭제했습니다 :D");
          onDelete(id); // 상위 컴포넌트의 삭제 로직 호출
        }
      } catch (error) {
        console.log("[TodoItem.js] deleteMemo() error :<");
        console.error(error);
      }
    } else {
      console.log("삭제가 취소되었습니다");
    }
  };

  return (
    <>
      <li
        className="cursor-pointer flex gap-4 justify-between mt-3 
                  border-[1px] bg-gray-100 rounded-md shadow-xl"
      >
        <div
          className="w-4/5 overflow-hidden z-1 "
          onClick={() => findItemById2(todo.memoId)}
        >
          <div className="top-0 flex py-4 pl-3">
            <span className="mr-2 text-xl leading-5 font-lg">
              {TODO_CATEGORY_ICON[todo.category]}
            </span>
            <h2
              data-test="title"
              className="mb-0 text-lg font-bold text-gray-800 uppercase"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {todo.title}
            </h2>
          </div>

          
          <p
            className="pl-3 mt-2 text-base text-gray-800"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {todo.summary}
          </p>
        </div>

        {/* 여기까지가 기본적으로 보여야할 리스트형 */}

        <div className="block w-0 my-4 h-14"></div>

        <button
          className="w-1/6 text-xl z-1 drop-shadow-xl"
          onClick={() => deleteMemo(todo.memoId)}
        >
          🗑️
        </button>
      </li>

      <div className="container justify-between mb-1 overflow-auto bg-gray-100 border-solid border-1 border-gray">
        {latestMemo ? (
          <TodoDetail detail={todo} latestMemo={latestMemo} />
        ) : null}
      </div>
    </>
  );
};

export default TodoItemMobile;

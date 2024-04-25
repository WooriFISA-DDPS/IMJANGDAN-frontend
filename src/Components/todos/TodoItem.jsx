import React, { useContext, useState, useEffect } from "react";
import { TODO_CATEGORY_ICON } from "../../constants/icon.jsx";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../ui/Modal.jsx";
import TodoEditForm from "./TodoEditForm.jsx";
import TodoDetail from "./TodoDetail.jsx";

// rafce
const TodoItem = ({ todo, onFind, onEdit, onDelete }) => {


  // State for modal visibility
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [latestMemo, setLatestMemo] = useState(null); // Initialize with null


  const navigate = useNavigate();

  // id값 받아서 상위 컴포넌트로 전달
  const findItemById2 = (id) => {
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
          `${process.env.REACT_APP_API_URL}/memo/${id}/delete`
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
        className="cursor-pointer flex gap-4 justify-between my-4 py-4 px-4 
                  border-[1px] bg-gray-100 rounded-md shadow-xl"
        onClick={() => findItemById2(todo.memoId)}
      >
        <div className="overflow-hidden w-80 sm:w-52">
          <div className="flex ">
            <span className="mr-2 text-xl font-lg">
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
            className="mt-2 text-base text-gray-800"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {todo.summary}
          </p>
        </div>

        <div className="flex w-1/6 mt-2 mb-4 ml-auto justify-content-between sm:w-20">
          <button
            className="z-10 text-xl drop-shadow-lg"
            onClick={handlePencilClick}
          >
            ✏️
          </button>
          <button
            className="z-10 text-xl drop-shadow-xl"
            onClick={() => deleteMemo(todo.memoId)}
          >
            🗑️
          </button>
        </div>
      </li>

      {isOpen && ( // Conditionally render the modal
        <Modal onClose={handleCloseModal}>
          <TodoEditForm
            todo={todo}
            onEdit={onEdit}
            onClose={handleCloseModal}
          />
        </Modal>
      )}

      
    </>
  );
};

export default TodoItem;

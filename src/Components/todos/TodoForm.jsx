import React, { useState, useEffect } from "react";
import { TODO_CATEGORY_ICON } from "../../constants/icon";
import KakaoMap from "../map/KakaoMap";

const TodoForm = ({ latParam,lngParam,onAdd, onClose }) => {
  const defaultCoord = {
    // 지도의 기본 중심좌표
    lat: latParam ? latParam : 37.581512341234,
    lng: lngParam ? lngParam : 126.886012341234,
  };

  // 각 입력폼 별 값들을 관리할 상태가 필요
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Good"); //기본으로 들어가게 함
  const [coord, setCoord] = useState(defaultCoord); // 기본으로 둘 좌표 설정 ->현재위치를 자동으로 받으면 좋을 거같긴함

  const getCoordFunction = () => {
    return coord;
  };
  const setCoordFunction = (coord) => {
    setCoord(coord);
  };

  // Todo 등록 처리를 수행할 핸들러 함수
  const addTodoHandler = () => {
    // 폼에서 입력받은 값들을 app.jsx의
    // 더미 데이터 배열에 추가 후 새롭게 추가된 배열을 다시 렌더링

    // App.jsx에서 내려받은 onAdd 호출
    // alert(coord)
    window.confirm(
      "여기 TodoForm의 setCoordFunction" +
        coord.lat +
        "," +
        coord.lng +
        "입니다."
    )
      ? onAdd({ title, summary, category, coord })
      : console.log("사용자가 작업을 취소하였음");
    // onAdd({ title, summary, category, coord });
    onClose(); // add동작 수행 후 모달창 닫기
  };
  // Todo 등록 처리를 수행할 핸들러 함수
  const cancelHandler = () => {
    // 현재 창 닫기
    onClose(); // Modal 창 그냥 닫기
  };

  return (
    <div>
      <form className="my-0">
        <div>
          <label
            className="block mb-2 text-xl text-gray-800"
            htmlFor="title"
          >
            메모 타이틀
          </label>
          <input
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded"
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label
            className="block mt-2 mb-2 text-xl text-gray-800"
            htmlFor="summary"
          >
            메모 내용
          </label>
          <textarea
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded"
            id="summary"
            rows="5"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>
        <div>
          <label
            className="block mt-2 mb-2 text-xl text-gray-800"
            htmlFor="category"
          >
            카테고리
          </label>
          <select
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Good">{TODO_CATEGORY_ICON.Good} Good</option>
            <option value="SoSo">{TODO_CATEGORY_ICON.SoSo} SoSo</option>
            <option value="Bad">{TODO_CATEGORY_ICON.Bad} Bad</option>
          </select>
        </div>
        <div>
          <label
            className="block mt-3 mb-2 text-xl text-gray-800"
            htmlFor="summary"
          >
            위치
          </label>
          <div className="w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded">
            <KakaoMap
              getCoordFunction={getCoordFunction}
              setCoordFunction={setCoordFunction}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-3">
          <button
            class="btn btn-outline-secondary"
            type="button"
            onClick={cancelHandler}
          >
            취소
          </button>
          <button
            class="btn btn-dark"
            type="button"
            onClick={addTodoHandler}
          >
            메모 추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;

import React, { useContext } from "react";
import { TODO_CATEGORY_ICON } from "../../constants/icon";
import MemoMap from "../map/MemoMap";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import TodoPhoto from "./TodoPhoto";
import TodoRecord from "./TodoRecord";

const TodoDetail = ({ detail, latestMemo }) => {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <div>
      {detail ? (
        <div>
          {/* Display fetched details */}
          <div className="flex mt-2">
            <div >
              <select
                className="w-30 h-30 bg-transparent text-6xl appearance-none leading-snug"
                id="category"
                value={detail.category}
                disabled
              >
                {" "}
                <option value="Good">{TODO_CATEGORY_ICON.Good}</option>
                <option value="SoSo">{TODO_CATEGORY_ICON.SoSo}</option>
                <option value="Bad">{TODO_CATEGORY_ICON.Bad}</option>
              </select>
            </div>

            <textarea
              className="w-full text-xl font-bold  bg-transparent text-gray-900 border-none"
              type="text"
              value={detail.title}
              readOnly
            >
            </textarea>{" "}
          </div>

          <div>
            <textarea
              className="w-full p-2  text-gray-900 border-none"
              id="summary"
              rows="5"
              value={detail.content}
              readOnly
            />{" "}
          </div>

          <div>
            <TodoRecord />
          </div>

          <div className="bg-navy-200">
            <TodoPhoto/>
          </div>

          <div className="w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded">
            <MemoMap lat={detail.latitude} lng={detail.longitude} />
          </div>

          <div className="block my-3"></div>
        </div>
      ) : (
        <div className="my-5 py-80 text-6xl d-flex justify-content-center align-middle">
          <p>메모 추가 하기</p>
        </div>
      )}
    </div>
  );
};

export default TodoDetail;

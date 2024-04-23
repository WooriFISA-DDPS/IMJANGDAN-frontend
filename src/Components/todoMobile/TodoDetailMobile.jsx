import React, { useContext } from "react";
import { TODO_CATEGORY_ICON } from "../../constants/icon";
import ReadOnlyMap from "../map/ReadOnlyMap";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import TodoRecord from "../todos/TodoRecord"
import TodoPhoto from "../todos/TodoPhoto";


const TodoDetail = ({ detail, latestMemo }) => {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const { auth, setAuth } = useContext(AuthContext);
  console.log("latest memo : ", latestMemo)

  // if(detail == null) return;
  // if(detail == undefined) return;
  // if(latestMemo == null) return;
  // if(latestMemo == undefined) return;

  return (
    <div>
      {detail ? (
        <div>
          {/* Display fetched details */}
          <div className="flex">
            <div >
              <select
                className="text-6xl leading-snug bg-transparent appearance-none w-30 h-30"
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
              className="w-full text-xl font-bold text-gray-900 bg-transparent border-none"
              type="text"
              value={detail.title}
              readOnly
            >
            </textarea>{" "}
          </div>

          <div>
            <textarea
              className="w-full p-2 text-gray-900 border-none"
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
            <ReadOnlyMap lat={detail.latitude} lng={detail.longitude} />
          </div>

          <div className="block my-3"></div>
        </div>
      ) : (
        
        <></>

      )}

    </div>
  );
};

export default TodoDetail;

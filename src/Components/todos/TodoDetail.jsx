import React, { useContext, useState } from "react";
import { TODO_CATEGORY_ICON } from "../../constants/icon";
import ReadOnlyMap from "../map/ReadOnlyMap";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import TodoPhoto from "./TodoPhoto";
import TodoRecord from "./TodoRecord";

const TodoDetail = ({ detail, latestMemo }) => {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const { auth, setAuth } = useContext(AuthContext);

  // if(detail == null) return;
  // if(detail == undefined) return;
  // if(latestMemo == null) return;
  // if(latestMemo == undefined) return;

        
  return (
    <div>
      {/* 클릭한 경우, 즉 detail의 내용을 보여줄 경우 */}
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

          

          {(detail.files && detail.files.length > 0)  ? 
          <div>
            <TodoRecord 
              memoId={detail.memoId} 
              record={detail.files.filter(file => file.fileType.startsWith('audio/'))[0]} 
            />
          </div> 
          : 
            null
          }

          {(detail.files && detail.files.length > 0)  ? 
          <div>
            <TodoPhoto 
              memoId={detail.memoId} 
              photo={detail.files.filter(file => file.fileType.startsWith('image/'))[0]} 
            />
          </div> 
          : 
            null
          }


          <div className="w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded">
            <ReadOnlyMap lat={detail.latitude} lng={detail.longitude} />
          </div>

          <div className="block my-3"></div>
        </div>
      ) : (
        
        <div>
        {/* latestMemo를 보여주는 경우 */}
          {/* Display fetched details */}
          <div className="flex mt-2">
            <div >
              <select
                className="w-30 h-30 bg-transparent text-6xl appearance-none leading-snug"
                id="category"
                value={latestMemo.category}
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
              value={latestMemo.title}
              readOnly
            >
            </textarea>{" "}
          </div>

          <div>
            <textarea
              className="w-full p-2  text-gray-900 border-none"
              id="summary"
              rows="5"
              value={latestMemo.summary}
              readOnly
            />{" "}
          </div>

          {(latestMemo.files && latestMemo.files.length > 0)  ? 
            <div>
              <TodoRecord memoId={latestMemo.memoId} record={latestMemo.files.filter(file => file.fileType.startsWith('audio/'))[0]} />
            </div> 
          : 
            null
          }

          {(latestMemo.files && latestMemo.files.length > 0)  ? 
            <div>
              <TodoPhoto memoId={latestMemo.memoId}  photo={latestMemo.files.filter(file => file.fileType.startsWith('image/'))[0]} />
            </div> 
          : 
            null
          }   


          <div className="w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded">
            <ReadOnlyMap lat={latestMemo.latitude} lng={latestMemo.longitude} />
          </div>

          <div className="block my-3"></div>
        </div>

      )}
    </div>
  );
};

export default TodoDetail;

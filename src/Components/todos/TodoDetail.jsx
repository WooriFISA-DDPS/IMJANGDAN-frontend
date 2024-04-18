import React, { useState, useEffect } from 'react';
import { TODO_CATEGORY_ICON } from '../../constants/icon';
import MemoMap from '../map/MemoMap';
import TodoForm from './TodoForm';

const TodoDetail = ({ detail }) => {

  const [coord, setCoord] = useState(null);

  if(detail){
    console.log(detail)
  }


  return (
    <>
      <form className='my-0'>
        {detail ? (
          <>
            {/* Display fetched details */}
            <div>
              <label className='block mt-3 mb-2 text-xl text-gray-800' htmlFor='title'>메모 타이틀</label>
              <input className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded'
                type='text' id='title' value={detail.title} readOnly /> {/* Make title read-only */}
            </div>
            <div>
              <label className='block mt-2 mb-2 text-xl text-gray-800' htmlFor='summary'>메모 내용</label>
              <textarea className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded'
                id='summary' rows='5' value={detail.content} readOnly /> {/* Make summary read-only */}
            </div>
            <div>
              <label className='block mt-2 mb-2 text-xl text-gray-800' htmlFor='category'>카테고리</label>
              <select className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded'
                id='category' value={detail.category} disabled> {/* Disable category selection */}
                <option value='TODO'>{TODO_CATEGORY_ICON.TODO} Good</option>
                <option value='SoSo'>{TODO_CATEGORY_ICON.SoSo} SoSo</option>
                <option value='DONE'>{TODO_CATEGORY_ICON.DONE} Bad</option>
              </select>
            </div>
            <div>
              <label className='block mt-3 mb-2 text-xl text-gray-800' htmlFor='summary'>위치</label>
              <div className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded'>
                <MemoMap lat= { detail.latitude } lng={detail.longitude}/>
              </div>
            </div>
            
          </>
        ) : (
          <TodoForm /> 
        )}
      </form>
    </>
  )
}

export default TodoDetail;
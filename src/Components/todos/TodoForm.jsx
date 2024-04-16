import React, { useState } from 'react';
import { TODO_CATEGORY_ICON } from '../../constants/icon';

const TodoForm = ({ onAdd, onClose }) => {

    // 각 입력폼 별 값들을 관리할 상태가 필요
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [category, setCategory] = useState('TODO');
    console.log(title, summary, kakao);

    // Todo 등록 처리를 수행할 핸들러 함수
    const addTodoHandler = () => {
        // 폼에서 입력받은 값들을 app.jsx의 
        // 더미 데이터 배열에 추가 후 새롭게 추가된 배열을 다시 렌더링

        // App.jsx에서 내려받은 onAdd 호출
        onAdd({ title, summary, category });
        onClose(); // add동작 수행 후 모달창 닫기

    }
    // Todo 등록 처리를 수행할 핸들러 함수
    const cancelHandler = () => {
        // 현재 창 닫기 
        onClose(); // Modal 창 그냥 닫기

    }

  return (
    <>
            <h3 className="text-3xl text-red-200">새 메모 작성</h3>
            <form className='my-2'>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='title'>Title</label>
                    <input className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
                           type='text' id='title' value={title} onChange={event => setTitle(event.target.value)}  />
                </div>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='summary'>Summary</label>
                    <textarea className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
                              id='summary' rows='5' value={summary} onChange={event => setSummary(event.target.value)}/>
                </div>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='category'>Category</label>
                    <select className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
                            id='category' value={category} onChange={event => setCategory(event.target.value)}>

                        <option value='TODO'>{TODO_CATEGORY_ICON.TODO} Good</option>
                        <option value='SoSo'>{TODO_CATEGORY_ICON.SoSo} SoSo</option>
                        <option value='DONE'>{TODO_CATEGORY_ICON.DONE} Bad</option>
                    </select>
                </div>
                <div>
                    <label className='block mb-2 text-xl text-white' htmlFor='summary'>Location</label>
                    <div className='w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded' 
                            />
                </div>

                <div className='flex justify-end gap-4'>
                    <button className='text-xl text-white' type='button' onClick={cancelHandler} >Cancel</button>
                    <button className='px-6 py-3 text-xl text-red-200' type='button' onClick={addTodoHandler} >Add</button>
                </div>
            </form>
        </>
  )
}

export default TodoForm
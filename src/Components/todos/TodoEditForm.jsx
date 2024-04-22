import React, { useState ,useEffect} from 'react';
import { TODO_CATEGORY_ICON } from '../../constants/icon';
import EditMap from '../map/EditMap';

const TodoEditForm = ({ todo, onEdit, onClose }) => {


    const defaultCoord = {
        // 지도의 기본 중심좌표
        lat: todo.latitude,
        lng: todo.longitude
    }

    // 각 입력폼 별 값들을 관리할 상태가 필요
    const [title, setTitle] = useState(todo ? todo.title : '');
    const [summary, setSummary] = useState(todo ? todo.summary : '');
    const [category, setCategory] = useState(todo ? todo.category : 'Good'); // Default if no category
    const [coord, setCoord] = useState(todo ? defaultCoord : ''); // 기본으로 둘 좌표 설정 ->현재위치를 자동으로 받으면 좋을 거같긴함


    const changeTitle = (event) => {
		setTitle(event.target.value);
	}

	const changeSummary = (event) => {
		setSummary(event.target.value);
	}

    const changeCategory = (event) => {
		setCategory(event.target.value);
	}


    const getCoordFunction = () => {
        return coord;
    }
    const changeCoord = (coord) => {
        setCoord(coord)
    }

    // Todo 등록 처리를 수행할 핸들러 함수
    const cancelHandler = () => {
        // 현재 창 닫기 
        onClose(); // Modal 창 그냥 닫기

    }

  return (
    <>
        <form className='my-0'>
            <div>
                <label className='block mt-3 mb-2 text-xl text-gray-800' htmlFor='title'>메모 타이틀</label>
                <input className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded' 
                        type='text' id='title' value={todo.title} onChange={event => setTitle(event.target.value)}  />
            </div>
            <div>
                <label className='block mt-2 mb-2 text-xl text-gray-800' htmlFor='summary'>메모 내용</label>
                <textarea className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded' 
                            id='summary' rows='5' value={todo.summary} onChange={event => setSummary(event.target.value)}/>
            </div>
            <div>
                <label className='block mt-2 mb-2 text-xl text-gray-800' htmlFor='category'>카테고리</label>
                <select className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded' 
                        id='category' value={todo.category} onChange={event => setCategory(event.target.value)}>

                    <option value='Good'>{TODO_CATEGORY_ICON.Good} Good</option>
                    <option value='SoSo'>{TODO_CATEGORY_ICON.SoSo} SoSo</option>
                    <option value='Bad'>{TODO_CATEGORY_ICON.Bad} Bad</option>
                </select>
            </div>
            <div>
                <label className='block mt-3 mb-2 text-xl text-gray-800' htmlFor='summary'>위치</label>
                <div className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded' >
                    <EditMap lat={todo.latitude} lng={todo.longitude} getCoordFunction={ getCoordFunction } setCoordFunction={changeCoord} />
                </div>
                    
            </div>

            <div className='flex justify-end gap-4 mt-3 mb-4'>
                <button className='text-xl text-gray-800' type='button' onClick={cancelHandler} >취소</button>
                {/* <button className='px-6 py-3 text-xl text-gray-800' type='button' onClick={addTodoHandler} >추가</button> */}
            </div>
        </form>
    </>
  )
}

export default TodoEditForm
import React, { useState ,useEffect} from 'react';
import { TODO_CATEGORY_ICON } from '../../constants/icon';
import KakaoMap from '../map/KakaoMap';

const TodoForm = ({ onAdd, onClose }) => {

    // 각 입력폼 별 값들을 관리할 상태가 필요
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [category, setCategory] = useState('TODO');
    const [coord, setCoord] = useState(null);
    // console.log(title, summary);

    // useEffect(() => {
    //     if (coord) {
    //         alert('TodoForm의 setCoordFunction' + coord.lat +"," + coord.lng + '입니다.');
    //     }
    // }, [coord]); // Effect runs only when coord changes

    const getCoordFunction = () => {
        return coord;
    }
    const setCoordFunction = (coord) => {
        setCoord(coord)
    }

    // Todo 등록 처리를 수행할 핸들러 함수
    const addTodoHandler = () => {
        // 폼에서 입력받은 값들을 app.jsx의 
        // 더미 데이터 배열에 추가 후 새롭게 추가된 배열을 다시 렌더링

        // App.jsx에서 내려받은 onAdd 호출
        // alert(coord)
        window.confirm('여기 TodoForm의 setCoordFunction' + coord.lat +"," + coord.lng + '입니다.')
            console.log(coord) 
            ? onAdd({ title, summary, category, coord }) 
            : console.log("사용자가 작업을 취소하였음");
        // onAdd({ title, summary, category, coord });
        onClose(); // add동작 수행 후 모달창 닫기

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
                        type='text' id='title' value={title} onChange={event => setTitle(event.target.value)}  />
            </div>
            <div>
                <label className='block mt-2 mb-2 text-xl text-gray-800' htmlFor='summary'>메모 내용</label>
                <textarea className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded' 
                            id='summary' rows='5' value={summary} onChange={event => setSummary(event.target.value)}/>
            </div>
            <div>
                <label className='block mt-2 mb-2 text-xl text-gray-800' htmlFor='category'>카테고리</label>
                <select className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded' 
                        id='category' value={category} onChange={event => setCategory(event.target.value)}>

                    <option value='TODO'>{TODO_CATEGORY_ICON.TODO} Good</option>
                    <option value='SoSo'>{TODO_CATEGORY_ICON.SoSo} SoSo</option>
                    <option value='DONE'>{TODO_CATEGORY_ICON.DONE} Bad</option>
                </select>
            </div>
            <div>
                <label className='block mt-3 mb-2 text-xl text-gray-800' htmlFor='summary'>위치</label>
                <div className='w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded' >
                    <KakaoMap getCoordFunction={getCoordFunction} setCoordFunction={setCoordFunction} />
                </div>
                    
            </div>

            <div className='flex justify-end gap-4'>
                <button className='text-xl text-gray-800' type='button' onClick={cancelHandler} >취소</button>
                <button className='px-6 py-3 text-xl text-gray-800' type='button' onClick={addTodoHandler} >추가</button>
            </div>
        </form>
    </>
  )
}

export default TodoForm
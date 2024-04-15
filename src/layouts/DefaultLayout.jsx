import React from 'react'
import styled from 'styled-components';


// 기본 레이아웃 작성용 컴포넌트

const BodyDiv=styled.div`
  height:calc(-56px + 100vh);
`;

// 합성(Composition)
const DefaultLayout = ({ children }) => {
  return (
    <BodyDiv className='w-full overflow-y-scroll bg-slate-500'>
        {/* [20rem]: Tailwind에서 제공하는 정해진 규격의 값이 아닌 직접 상세한 값을 적용하고 싶을 때 */}
        <div className='max-w-xl mx-auto min-w-[20rem]'>
            { children }
        </div>
    </BodyDiv>
  )
}

export default DefaultLayout
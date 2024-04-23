import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import KakaoMapTest from '../app/KakaoMapTest'
import BbsList from "../bbs/BbsList"
import BbsWrite from "../bbs/BbsWrite"
import BbsDetail from "../bbs/BbsDetail"
import BbsUpdate from "../bbs/BbsUpdate"
import BbsAnswer from "../bbs/BbsAnswer"
import Join from "../member/Join"
import Login from "../member/Login"
import Logout from "../member/Logout"
import MemberUpdate from "../member/MemberUpdate";
import CheckPwd from "../member/CheckPwd";
import HomeMemo from "../app/HomeMemo";
import HomeMemoMobile from "../app/HomeMemoMobile";
import KakaoMap from '../map/KakaoMap';
import AdminList from "../admin/AdminList"
import DefaultLayout from "../../layouts/DefaultLayout";


function Router() {

	function useIsMobile() {
		const [isMobile, setIsMobile] = useState(false);
	
		useEffect(() => {
			const handleResize = () => {
				const width = window.innerWidth;
				setIsMobile(width <= 768); // Adjust the threshold as needed (common breakpoint for mobile)
			};
	
			window.addEventListener('resize', handleResize);
	
			handleResize(); // Call on initial render
	
			return () => window.removeEventListener('resize', handleResize);
		}, []);
	
		return isMobile;
	}

	const isMobile = useIsMobile();

	return (
			<Routes>
				<Route path="/" element={<KakaoMapTest />}></Route>
				<Route path="/bbslist" element={<DefaultLayout><BbsList /></DefaultLayout>}></Route>
				<Route path="/bbswrite" element={<DefaultLayout><BbsWrite /></DefaultLayout>}></Route>
				<Route path="/bbsdetail/:boardId" element={<DefaultLayout><BbsDetail /></DefaultLayout>}></Route>
				<Route path="/bbsupdate" element={<DefaultLayout><BbsUpdate /></DefaultLayout>}></Route>
				<Route path="/bbsanswer/:parentSeq" element={<DefaultLayout><BbsAnswer /></DefaultLayout>}></Route>

				<Route
          path="/homememo"
          element={
            !isMobile ? (
              <DefaultLayout>
                <HomeMemo />
              </DefaultLayout>
            ) : (
              <HomeMemoMobile />
            )
          }
        />
				<Route path="/homememo/:latlng" element={<HomeMemo />}></Route>

				<Route path="/login" element={<DefaultLayout><Login /></DefaultLayout>}></Route>
				<Route path="/join" element={<DefaultLayout><Join /></DefaultLayout>}></Route>
				<Route path="/checkpwd" element={<DefaultLayout><CheckPwd /></DefaultLayout>}></Route>
				<Route path="/update" element={<DefaultLayout><MemberUpdate /></DefaultLayout>}></Route>
				<Route path="/adminfeat" element={<DefaultLayout><AdminList /></DefaultLayout>}></Route>
				<Route path="/logout" element={<Logout />}></Route>
			</Routes>
	);
}

export default Router;

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

import BbsList from "../bbs/BbsList"
import BbsWrite from "../bbs/BbsWrite"
import BbsDetail from "../bbs/BbsDetail"
import BbsUpdate from "../bbs/BbsUpdate"
import BbsAnswer from "../bbs/BbsAnswer"
import NewsList from "../news/NewsList";
import Join from "../member/Join"
import Login from "../member/Login"
// import LoginNew from "../member/LoginV2"
import Logout from "../member/Logout"
import MemberUpdate from "../member/MemberUpdate";
import CheckPwd from "../member/CheckPwd";
import HomeMemo from "../app/HomeMemo";
import HomeMemoMobile from "../app/HomeMemoMobile";
import AdminList from "../admin/AdminList"
import DefaultLayout from "../../layouts/DefaultLayout";
import LoginV2 from "../member/LoginV2";


function Router() {


	function useIsMobile() {
		const [isMobile, setIsMobile] = useState(false);

		useEffect(() => {
			const handleResize = () => {
				const width = window.innerWidth;
				setIsMobile(width <= 645); // Adjust the threshold as needed (common breakpoint for mobile)
			};

			window.addEventListener('resize', handleResize);

			handleResize(); // Call on initial render

			return () => window.removeEventListener('resize', handleResize);
		}, []);

		return isMobile;
	}

	const isMobile = useIsMobile();

	const LeadToMain = () => {
		window.location.href =`${process.env.REACT_APP_API_URL}/memomap`;
		return null;
	}

	return (
		<Routes>
			<Route path="/" element={<LeadToMain />} />
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

			<Route path="/newslist" element={<DefaultLayout><NewsList /></DefaultLayout>}></Route>

			<Route path="/loginold" element={<DefaultLayout><Login /></DefaultLayout>}></Route>
			<Route path="/login" element={<LoginV2 />}></Route>
			<Route path="/join" element={<DefaultLayout><Join /></DefaultLayout>}></Route>
			<Route path="/checkpwd" element={<DefaultLayout><CheckPwd /></DefaultLayout>}></Route>
			<Route path="/update" element={<DefaultLayout><MemberUpdate /></DefaultLayout>}></Route>
			<Route path="/adminfeat" element={<DefaultLayout><AdminList /></DefaultLayout>}></Route>
			<Route path="/logout" element={<Logout />}></Route>
		</Routes>
	);
}

export default Router;

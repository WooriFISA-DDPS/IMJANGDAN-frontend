import { Routes, Route } from "react-router-dom";

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
import KakaoMap from '../app/KakaoMap';
import DefaultLayout from "../../layouts/DefaultLayout";


function Router() {

	return (
			<Routes>
				<Route path="/" element={<KakaoMap />}></Route>
				<Route path="/bbslist" element={<DefaultLayout><BbsList /></DefaultLayout>}></Route>
				<Route path="/bbswrite" element={<DefaultLayout><BbsWrite /></DefaultLayout>}></Route>
				<Route path="/bbsdetail/:boardId" element={<DefaultLayout><BbsDetail /></DefaultLayout>}></Route>
				<Route path="/bbsupdate" element={<DefaultLayout><BbsUpdate /></DefaultLayout>}></Route>
				<Route path="/bbsanswer/:parentSeq" element={<DefaultLayout><BbsAnswer /></DefaultLayout>}></Route>

				<Route path="/homememo" element={<HomeMemo />}></Route>

				<Route path="/login" element={<DefaultLayout><Login /></DefaultLayout>}></Route>
				<Route path="/join" element={<DefaultLayout><Join /></DefaultLayout>}></Route>
				<Route path="/checkpwd" element={<DefaultLayout><CheckPwd /></DefaultLayout>}></Route>
				<Route path="/update" element={<DefaultLayout><MemberUpdate /></DefaultLayout>}></Route>
				<Route path="/logout" element={<Logout />}></Route>
			</Routes>
	);
}

export default Router;

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


function Router() {

	return (
			<Routes>

				<Route path="/bbslist" element={<BbsList />}></Route>
				<Route path="/bbswrite" element={<BbsWrite />}></Route>
				<Route path="/bbsdetail/:boardId" element={<BbsDetail />}></Route>
				<Route path="/bbsupdate" element={<BbsUpdate />}></Route>
				<Route path="/bbsanswer/:parentSeq" element={<BbsAnswer />}></Route>

				<Route path="/homememo" element={<HomeMemo />}></Route>
				<Route path="/kakaomap" element={<KakaoMap />}></Route>

				<Route path="/login" element={<Login />}></Route>
				<Route path="/join" element={<Join />}></Route>
				<Route path="/checkpwd" element={<CheckPwd />}></Route>
				<Route path="/update" element={<MemberUpdate />}></Route>
				<Route path="/logout" element={<Logout />}></Route>
			</Routes>
	);
}

export default Router;
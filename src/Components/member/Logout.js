import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";

function Logout() {

	const { auth, setAuth } = useContext(AuthContext);

	const navigate = useNavigate();
	
	const logout = () => {
		
		localStorage.removeItem("bbs_access_token");
		localStorage.removeItem("id");

		alert(auth + "님, 성공적으로 로그아웃 됐습니다 🔒");
		setAuth(null);
		
		window.location.href =`${process.env.REACT_APP_API_URL}/memomap`;
	};

	useEffect(() => {
		logout();
	}, []);

}

export default Logout;
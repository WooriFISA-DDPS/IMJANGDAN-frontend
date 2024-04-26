/* 회원가입 컴포넌트 */

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Join() {

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [pwd, setPwd] = useState("");
	const [phone, setPhone] = useState("");
	const [regionId, setRegionId] = useState("");
	const [checkPwd, setCheckPwd] = useState("");

	const navigate = useNavigate();

	const changeEmail = (event) => {
		setEmail(event.target.value);
	}

	const changeName = (event) => {
		setName(event.target.value);
	}

	const changePwd = (event) => {
		setPwd(event.target.value);
	}

	const changeCheckPwd = (event) => {
		setCheckPwd(event.target.value);
	}

	/* 아이디 중복 체크 */
	const checkEmailDuplicate = async () => {
		await axios.get(`${process.env.REACT_APP_API_URL}/user/checkId`, { params: { email: email } })
			.then((resp) => {
				console.log("[Join.js] checkEmailDuplicate() success :D");
				console.log(resp.data);

				if (resp.status === 200) {
					alert("사용 가능한 이메일입니다.");
				}
			})
			.catch((err) => {
				console.log("[Join.js] checkEmailDuplicate() error :<");
				console.log(err);

				const resp = err.response;
				if (resp.status === 400) {
					alert(resp.data);
				}
			});

	}

	/* 회원가입 */
	const join = async () => {

		const req = {
			email: email,
			password: pwd,
			passwordCheck: checkPwd,
			username: name,
			phone: phone,
			regionId: regionId,
		}

		await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, req)
			.then((resp) => {
				console.log("[Join.js] join() success :D");
				console.log(resp.data);

				alert(resp.data.username + "님 회원가입을 축하드립니다 🎊");
				navigate("/login");

			}).catch((err) => {
				console.log("[Join.js] join() error :<");
				console.log(err);

				const resp = err.response;
				if (resp.status === 400) {
					alert(resp.data);
				}
			});
	}

	return (
		<div>
			<div className="flex justify-center px-3">
				<table className="table">
					<tbody>
						<tr>
							<th className="w-1/3">이메일</th>
							<td>
								<input className="w-full mb-2" type="text" value={email} onChange={changeEmail}/> 
								<button className="w-full btn btn-outline-danger" onClick={checkEmailDuplicate}>
									<i className="fas fa-check"></i> 이메일 중복 확인</button>
							</td>
						</tr>

						<tr>
							<th>닉네임</th>
							<td>
								<input type="text" value={name} onChange={changeName} className="w-full" />
							</td>
						</tr>
						<tr>
							<th>전화번호</th>
							<td>
								<input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full" />
							</td>
						</tr>
						<tr>
							<th>관심지역</th>
							{/* 카카오 지도로 받아야...? */}
							<td>
								<input type="text" value={regionId} onChange={(e) => setRegionId(e.target.value)} className="w-full" />
							</td>
						</tr>

						<tr>
							<th>비밀번호</th>
							<td>
								<input type="password" value={pwd} onChange={changePwd} className="w-full" />
							</td>
						</tr>

						<tr>
							<th>비밀번호 확인</th>
							<td>
								<input type="password" value={checkPwd} onChange={changeCheckPwd} className="w-full" />
							</td>
						</tr>
					</tbody>
				</table><br />
			</div>

			<div className="my-3 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={join}><i className="fas fa-user-plus"></i> 회원가입</button>
			</div>

		</div>
	);
}

export default Join;

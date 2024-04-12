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

		await axios.get("http://localhost:8989/user/checkId", { params: { email: email } })
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

		await axios.post("http://localhost:8989/user/register", req)
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
			<table className="table">
				<tbody>
					<tr>
						<th className="col-2">이메일</th>
						<td>
							<input type="text" value={email} onChange={changeEmail} size="50px" /> &nbsp; &nbsp;
							<button className="btn btn-outline-danger" onClick={checkEmailDuplicate}>
								<i className="fas fa-check"></i> 이메일 중복 확인</button>
						</td>
					</tr>

					<tr>
						<th>사용자 이름</th>
						<td>
							<input type="text" value={name} onChange={changeName} size="50px" />
						</td>
					</tr>
					<tr>
						<th>사용자 전화번호</th>
						<td>
							<input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} size="50px" />
						</td>
					</tr>
					<tr>
						<th>사용자 행정동코드번호</th>
						<td>
							<input type="text" value={regionId} onChange={(e) => setRegionId(e.target.value)} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호</th>
						<td>
							<input type="password" value={pwd} onChange={changePwd} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호 확인</th>
						<td>
							<input type="password" value={checkPwd} onChange={changeCheckPwd} size="50px" />
						</td>
					</tr>
				</tbody>
			</table><br />

			<div className="my-3 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={join}><i className="fas fa-user-plus"></i> 회원가입</button>
			</div>

		</div>
	);
}

export default Join;

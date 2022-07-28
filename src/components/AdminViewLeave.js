import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./style.css";

function AdminViewLeave() {
	const userCollectionRef = collection(db, "usersLeave");
	const [error, setError] = useState("");
	const [showLeave, setshowLeave] = useState([]);
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const getAttendance = async () => {
			const data = await getDocs(userCollectionRef);
			setshowLeave(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAttendance();
	}, []);

	async function handleLogout() {
		try {
			await logout();
			navigate("/admin-login");
		} catch {
			setError("Failed to log out");
		}
	}

	return (
		<div className="user-page">
			<div className="info">
				<div className="info__detail">
					{error && <Alert variant="danger">{error}</Alert>}
					<Avatar className="mx-auto" alt="Remy Sharp" src={currentUser.photoURL} sx={{ width: 200, height: 200 }} />
					<br />
					<strong className="email text-success mb-3">{currentUser.email}</strong>
					<br />
					{/* <h2>{currentUser.uid}</h2> */}
					<Link className="btn btn-dark w-100 mt-3" to="/admin-view-attendance">
						View Attendance
					</Link>
					<br />
					<Button className="btn btn-dark w-100 mt-3" onClick={handleLogout}>
						Log Out
					</Button>
				</div>
			</div>
			<div className="attendance">
				<table className="table mt-2">
					<thead>
						<tr>
							<th className="mx-4 text-center" colSpan={3}>
								Name
							</th>
							<th className="mx-4 text-center" colSpan={4}>
								Date
							</th>
							<th className="mx-4 text-center" colSpan={4}>
								Reason for Leave
							</th>
						</tr>
					</thead>
					<tbody>
						{showLeave.map((item, key) => {
							return (
								<tr>
									<td className="text-center" colSpan={3}>
										{item.name}
									</td>
									<td className="text-center" colSpan={4}>
										{item.date}
									</td>
									<td className="text-center" colSpan={4}>
										{item.description}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default AdminViewLeave;

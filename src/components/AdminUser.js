import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./style.css";

function AdminUser() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	async function handleLogout() {
		setError("");
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
					<Avatar className="mx-auto" alt="Remy Sharp" src={currentUser.photoURL} sx={{ width: 200, height: 200 }} />
					<br />
					<strong>{currentUser.displayName}</strong>
					<br />
					<strong className="email text-center text-success mb-3">{currentUser.email}</strong>
					<br />
					{/* <h2>{currentUser.uid}</h2> */}
					<Link to="/admin-view-attendance" className="btn btn-dark w-100 mt-3">
						View Attendance
					</Link>
					<br />
					<Link className="btn btn-dark w-100 mt-3" to="/admin-view-leave">
						View Leave
					</Link>
					<br />
					<Button className="btn btn-dark w-100 mt-3" onClick={handleLogout}>
						Log Out
					</Button>
				</div>
			</div>
			<div className="user">
				{error && <Alert variant="danger">{error}</Alert>}
				<h1>Welcome to Admin Panel</h1>
			</div>
		</div>
	);
}

export default AdminUser;

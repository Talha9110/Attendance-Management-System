import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { db } from "../firebase";
import { Avatar } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./style.css";

function User() {
	const [newName, setNewName] = useState("");
	const [newDate, setDate] = useState("");
	const [newLeave, setLeave] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	const userCollectionRef = collection(db, "usersLeave");
	const namehandle = (e) => {
		setNewName(e.target.value);
	};
	const datehandle = (e) => {
		setDate(e.target.value);
	};
	const leavehandle = (e) => {
		setLeave(e.target.value);
	};
	const handleAttendance = async (e) => {
		e.preventDefault();
		if (userCollectionRef.id.name === newName) {
			setError("You cannot apply for leave again");
		}

		try {
			setError("");
			setLoading(true);
			await addDoc(userCollectionRef, { name: newName, date: newDate, description: newLeave });
			setSuccess("Leave Applied!");
		} catch {
			setError("Failed to Apply Leave");
		}
		setLoading(false);
		setNewName("");
		setDate("");
		setLeave("");
	};
	console.log(currentUser);
	async function handleLogout() {
		setError("");
		try {
			await logout();
			navigate("/login");
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
					<strong className="email text-success mb-3">{currentUser.email}</strong>
					<br />
					{/* <h2>{currentUser.uid}</h2> */}

					<Link className="btn btn-dark w-100 mt-3" to="/user">
						Mark Attendence
					</Link>
					<br />
					<Link to="/view-attendance" className="btn btn-dark w-100 mt-3" type="submit">
						View Attendance
					</Link>
					<br />
					<Link to="/update-profile" className="btn btn-dark w-100 mt-3">
						Update Profile
					</Link>
					<br />
					<Button className="btn btn-dark w-100 mt-3" onClick={handleLogout}>
						Log Out
					</Button>
				</div>
			</div>
			<div className="user">
				{success && <Alert variant="success">{success}</Alert>}
				<Card className="card mt-3">
					<Card.Body>
						<h2 className="text-center text-dark">Apply Leave</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						<Form onSubmit={handleAttendance}>
							<Form.Group>
								<Form.Label className="text-dark">Name:</Form.Label>
								<Form.Control type="text" placeholder="Enter your name" value={newName} required onChange={namehandle} />
							</Form.Group>
							<Form.Group>
								<Form.Label className="mt-2 text-dark">Date for leave:</Form.Label>
								<Form.Control type="date" placeholder="MM/DD/YYYY" value={newDate} required onChange={datehandle} />
							</Form.Group>
							<Form.Group>
								<Form.Label className="text-dark mt-2">Reason for Leave:</Form.Label>
								<Form.Control className="text__area" value={newLeave} as="textarea" rows={4} required onChange={leavehandle} placeholder="Description" />
							</Form.Group>
							<Button disabled={loading} className="btn btn-dark w-100 mt-3" type="submit">
								Apply
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}

export default User;

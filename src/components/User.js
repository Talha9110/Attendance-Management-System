import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./style.css";

function User() {
	const [newName, setNewName] = useState("");
	const [newDate, setDate] = useState("");
	const [newAttendance, setAttendance] = useState("Not Present");
	const [newAttend, setAttend] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	const userCollectionRef = collection(db, "usersAttendance");
	const namehandle = (e) => {
		setNewName(e.target.value);
	};
	const datehandle = (e) => {
		setDate(e.target.value);
	};
	const attendancehandle = (e) => {
		setAttendance("Present");
	};
	const attendhandle = (e) => {
		setAttend("Not Present");
	};
	const handleAttendance = async (e) => {
		e.preventDefault();
		if (userCollectionRef.id.name === newName) {
			setError("You cannot mark your attendance again");
		}

		try {
			setError("");
			setLoading(true);
			await addDoc(userCollectionRef, { name: newName, date: newDate, attendence: newAttendance });
			setSuccess("Attendance marked!");
		} catch {
			setError("Failed to Mark Attendance");
		}
		setLoading(false);
		setNewName("");
		setDate("");
		setAttendance("");
		setAttend("");
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
					<strong className="name text-success mb-3">{currentUser.displayName}</strong>
					<br />
					<strong className="email text-success mb-3">{currentUser.email}</strong>
					<br />
					{/* <h2>{currentUser.uid}</h2> */}
					<Link className="btn btn-dark w-100 mt-3" to="/apply">
						Apply Leave
					</Link>
					<br />
					<Link to="/view-attendance" className="btn btn-dark w-100 mt-3">
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
						<h2 className="text-center text-dark">Mark Attendence</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						<Form onSubmit={handleAttendance}>
							<Form.Group>
								<Form.Label className="text-dark">Name</Form.Label>
								<Form.Control type="text" placeholder="Enter your name" value={newName} required onChange={namehandle} />
							</Form.Group>
							<Form.Group>
								<Form.Label className="mt-2 text-dark">Date</Form.Label>
								<Form.Control type="date" placeholder="mm/dd/yyyy" value={newDate} required onChange={datehandle} />
							</Form.Group>
							<Form.Group>
								<Form.Label className="mt-2 text-dark">Mark Attendence</Form.Label>
								<Form.Check className="text-dark" name="Attendance" type="radio" id="custom-switch" label="Present" value={newAttendance} onChange={attendancehandle} required />
								<Form.Check className="text-dark" name="Attendance" type="radio" id="custom-switch" label="Not Present" value={newAttend} onChange={attendhandle} required />
							</Form.Group>
							<Button disabled={loading} className="btn btn-dark w-100 mt-3" type="submit">
								Submit Attendence
							</Button>
						</Form>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
}

export default User;

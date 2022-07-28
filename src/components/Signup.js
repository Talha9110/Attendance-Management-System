import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./style.css";

function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}
		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate("/login");
		} catch {
			setError("Failed to create an Account");
		}
		setLoading(false);
	}
	return (
		<div className="signup-form">
			<h1 className="title">Welcome to Attendence Management System</h1>
			<div className="signup">
				<Card className="card mb-3">
					<Card.Body>
						<h2 className="text-center mb-4">Sign Up</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Group id="email">
								<Form.Label className="text-dark mt-2">Email</Form.Label>
								<Form.Control type="email" ref={emailRef} required />
							</Form.Group>
							<Form.Group id="password">
								<Form.Label className="text-dark mt-2">Password</Form.Label>
								<Form.Control type="password" ref={passwordRef} required />
							</Form.Group>
							<Form.Group id="password-confirm">
								<Form.Label className="text-dark mt-2">Confirm Password</Form.Label>
								<Form.Control type="password" ref={passwordConfirmRef} required />
							</Form.Group>
							<Button disabled={loading} className="btn btn-dark w-100 mt-3" type="submit">
								Sign Up
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="w-100 text-center mt-2">
					Already have an account? <Link to="/login">Log In</Link>
				</div>
				<div className="w-100 text-center mt-2">
					<Link to="/admin-login">Admin?</Link>
				</div>
			</div>
		</div>
	);
}

export default Signup;

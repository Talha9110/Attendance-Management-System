import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for further instructions");
		} catch {
			setError("Failed to reset password");
		}
	}
	return (
		<div className="forgot">
			<Card className="card">
				<Card.Body>
					<h2 className="text-center mb-4">Reset Password</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Button disabled={loading} className="btn btn-dark w-100 mt-3" type="submit">
							Reset Password
						</Button>
					</Form>
					<Link className="btn btn-dark w-100 mt-3" to="/login">
						Login
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-3">
				Need an account?{" "}
				<Link className="text-primary" to="/">
					Sign Up?
				</Link>
			</div>
		</div>
	);
}

export default ForgotPassword;

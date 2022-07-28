import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/user");
		} catch {
			setError("Failed to login");
		}
		setLoading(false);
	}
	return (
		<div className="login">
			<Card className="card">
				<Card.Body>
					<h2 className="text-center mb-4">Log In</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label className="text-dark">Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label className="text-dark">Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Button disabled={loading} className="btn btn-dark w-100 mt-3" type="submit">
							Log In
						</Button>
					</Form>
					<Link className="w-100 btn btn-dark mt-3" to="/forgot-password">
						Forgot Password?
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an account?{" "}
				<Link className="text-primary" to="/">
					Sign Up
				</Link>
			</div>
		</div>
	);
}

export default Login;

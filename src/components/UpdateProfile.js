import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./style.css";

function UpdateProfile() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updateEmail, updatePassword } = useAuth();
	const [error, setError] = useState("");
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}
		const promises = [];
		setLoading(true);
		setError("");
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				navigate("/user");
			})
			.catch(() => {
				setError("Failed to update Account");
			})
			.finally(() => {
				setLoading(false);
			});
	}
	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};
	const handleUpload = () => {
		const imageRef = ref(storage, "image");
		uploadBytes(imageRef, image)
			.then(() => {
				getDownloadURL(imageRef)
					.then((url) => {
						setUrl(url);
					})
					.catch((error) => {
						console.log(error.message, "Error getting the image url");
					});
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<div className="update_profile">
			<Card className="card">
				<Card.Body>
					<h2 className="text-center mb-4">Update Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form className="mt-2" onSubmit={handleSubmit}>
						<Avatar className="mx-auto" alt="Remy Sharp" src={url} sx={{ width: 100, height: 100 }} />
						<input className="mt-2" onChange={handleImageChange} type="file" />
						<Button className="btn btn-dark w-20" onClick={handleUpload}>
							Upload
						</Button>
						<Form.Group id="email">
							<Form.Label className="text-dark">Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required placeholder="Update Email" />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label className="text-dark mt-2">Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} placeholder="Leave Blank to keep it same" />
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label className="text-dark mt-2">Confirm Password</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave Blank to keep it same" />
						</Form.Group>
						<Button disabled={loading} className="btn btn-dark w-100 mt-3" type="submit">
							Update Profile
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Link to="/user">Cancel</Link>
			</div>
		</div>
	);
}

export default UpdateProfile;

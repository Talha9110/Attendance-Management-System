import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./User";
import Login from "./Login";
import Apply from "./Apply";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import ViewAttendance from "./ViewAttendance";
import AdminLogin from "./AdminLogin";
import AdminUser from "./AdminUser";
import AdminViewAttendance from "./AdminViewAttendance";
import AdminViewLeave from "./AdminViewLeave";

function App() {
	return (
		// <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
		<div>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/user" element={<User />} />
						<Route path="/apply" element={<Apply />} />
						<Route path="/update-profile" element={<UpdateProfile />} />
						<Route path="/view-attendance" element={<ViewAttendance />} />
						<Route path="/admin-login" element={<AdminLogin />} />
						<Route path="/admin-user" element={<AdminUser />} />
						<Route path="/admin-view-attendance" element={<AdminViewAttendance />} />
						<Route path="/admin-view-leave" element={<AdminViewLeave />} />
					</Routes>
				</AuthProvider>
			</Router>
		</div>
		// </Container>
	);
}

export default App;

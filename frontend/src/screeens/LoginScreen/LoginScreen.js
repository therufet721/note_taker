import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

const LoginScreen = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			navigate("/mynotes");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();

		dispatch(login(email, password));
	};

	return (
		<MainScreen title="LOGIN">
			<div className="loginContainer">
				{loading && <Loading></Loading>}
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Button className="mt-2" variant="primary" type="submit">
						Submit
					</Button>
				</Form>
				<Row className="py-3">
					<Col>
						New Customer ? <Link to="/register">Register Here</Link>
					</Col>
				</Row>
			</div>
		</MainScreen>
	);
};

export default LoginScreen;

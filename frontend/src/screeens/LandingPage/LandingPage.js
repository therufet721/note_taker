import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const userInfo = localStorage.getItem("userInfo");

		if (userInfo) {
			navigate("/mynotes");
		}
	}, [navigate]);

	return (
		<div className="main">
			<Container>
				<Row>
					<div className="intro-text">
						<div>
							<h1 className="title">Welcome to Note Taker</h1>
						</div>
						<div className="buttonContainer">
							<a href="/login">
								<Button size="lg" className="landingbutton" variant="success">
									Login
								</Button>
							</a>
							<a href="/register">
								<Button
									size="lg"
									className="landingbutton"
									variant="outline-warning"
								>
									Signup
								</Button>
							</a>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default LandingPage;

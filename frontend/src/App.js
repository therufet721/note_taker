import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screeens/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNotes from "./screeens/MyNotes/MyNotes";
import LoginScreen from "./screeens/LoginScreen/LoginScreen";
import RegisterScreen from "./screeens/RegisterScreen/RegisterScreen";
import CreateNote from "./screeens/CreateNote/CreateNote";
import SingleNote from "./screeens/SingleNote/SingleNote";
import ProfileScreen from "./screeens/ProfileScreen/ProfileScreen";
import React, { useEffect, useState } from "react";

function App() {
	const [search, setSearch] = useState("");
	console.log(search);

	return (
		<BrowserRouter>
			<Header setSearch={setSearch} />

			<main>
				<Routes>
					<Route path="/" element={<LandingPage />} exact />
					<Route path="/login" element={<LoginScreen />} exact />
					<Route path="/profile" element={<ProfileScreen />} exact />
					<Route path="/register" element={<RegisterScreen />} exact />
					<Route path="/createnote" element={<CreateNote />} exact />
					<Route path="/note/:id" element={<SingleNote />} exact />
					<Route path="/mynotes" element={<MyNotes search={search} />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;

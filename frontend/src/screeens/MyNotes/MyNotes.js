import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import {
	Accordion,
	AccordionCollapse,
	AccordionContext,
	Badge,
	Button,
	Card,
	useAccordionButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

const MyNotes = ({ search }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const noteList = useSelector((state) => state.noteList);
	const { loading, error, notes } = noteList;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const noteCreate = useSelector((state) => state.noteCreate);
	const { success: successCreate } = noteCreate;
	const noteUpdate = useSelector((state) => state.noteUpdate);
	const { success: successUpdate } = noteUpdate;
	const noteDelete = useSelector((state) => state.noteDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = noteDelete;
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteNoteAction(id));
		}
	};

	function ContextAwareToggle({ children, eventKey, callback }) {
		const { activeEventKey } = useContext(AccordionContext);

		const decoratedOnClick = useAccordionButton(
			eventKey,
			() => callback && callback(eventKey)
		);

		const isCurrentEventKey = activeEventKey === eventKey;

		return (
			<button
				type="button"
				style={{ backgroundColor: isCurrentEventKey ? "pink" : "lavender" }}
				onClick={decoratedOnClick}
			>
				{children}
			</button>
		);
	}

	console.log(notes);
	useEffect(() => {
		dispatch(listNotes());
		if (!userInfo) {
			navigate("/");
		}
	}, [dispatch, successCreate, successUpdate, successDelete]);

	return (
		<MainScreen title={`Welcome Back ${userInfo.name}`}>
			<Link to="/createnote">
				<Button variant="success" size lg>
					Create New Note
				</Button>
			</Link>
			{errorDelete && (
				<ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
			)}
			{loadingDelete && <Loading></Loading>}
			{error && <ErrorMessage variant="danger"> {error}</ErrorMessage>}
			{loading && <Loading />}
			{notes
				?.reverse()
				.filter((filteredNote) =>
					filteredNote.title.toLowerCase().includes(search.toLowerCase())
				)
				.map((note) => (
					<Accordion key={note._id}>
						<Card style={{ margin: 10 }}>
							<Card.Header style={{ display: "flex" }}>
								<div
									// onClick={() => ModelShow(note)}
									style={{
										color: "black",
										textDecoration: "none",
										flex: 1,
										cursor: "pointer",
										alignSelf: "center",
										fontSize: 18,
									}}
								>
									<ContextAwareToggle>{note.title}</ContextAwareToggle>
								</div>

								<div>
									<Button>
										<Link to={`/note/${note._id}`}>Edit</Link>
									</Button>
									<Button
										variant="danger"
										className="mx-2"
										onClick={() => deleteHandler(note._id)}
									>
										Delete
									</Button>
								</div>
							</Card.Header>
							<AccordionCollapse eventkey="0">
								<Card.Body>
									<h4>
										<Badge bg="success">Category - {note.category}</Badge>
									</h4>
									<blockquote className="blockquote mb-0">
										<ReactMarkdown>{note.content}</ReactMarkdown>
										<footer className="blockquote-footer">
											Created on{" "}
											<cite title="Source Title">
												{note.createdAt.substring(0, 10)}
											</cite>
										</footer>
									</blockquote>
								</Card.Body>
							</AccordionCollapse>
						</Card>
					</Accordion>
				))}
		</MainScreen>
	);
};

export default MyNotes;

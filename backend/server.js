const dotenv = require("dotenv");
const express = require("express");
const notes = require("../backend/data/notes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const path = require("path");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

//------------------Depoloyment---------------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("API is running...");
	});
}
//------------------Depoloyment---------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on Port ${PORT}`));

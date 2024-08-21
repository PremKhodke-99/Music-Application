require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConfig");
const usersRouter = require("./routes/users.routes");
const songsRouter = require("./routes/songs.routes");
const playlistsRouter = require("./routes/playlists.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// DB connection
dbConnect();

// Routes
app.use("/api/user", usersRouter);
app.use("/api/songs", songsRouter);
app.use("/api/playlist", playlistsRouter);

app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});

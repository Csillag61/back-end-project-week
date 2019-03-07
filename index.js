const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const knex = require("knex");
const app = new express();
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.CORSORIGIN }));

app.use(express.json());
app.use(bodyParser.json());

if (process.env.ENV === "production") app.use(morgan("combined"));
else app.use(morgan("dev"));

const indexRouter = require("./routes/index");
const notesRouter = require("./routes/notes");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const listRouter = require("./routes/list");

app.use("/", indexRouter);
app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/lists", listRouter);
app.use(require("./middleware/index").errorHandler);

app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res, next) {
  // Handle the get for this route
});

app.post("/", function(req, res, next) {
  // Handle the post for this route
});

app.listen(process.env.PORT || 5500);

module.exports = app;

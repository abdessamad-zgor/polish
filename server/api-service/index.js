const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

let routes = require("./routes");

// create Express app
const app = express();

//Handle CORS errors
app.use(cors());

//statics test file

app.use("/dist", express.static(path.resolve(__dirname, "test")));

//use bodyParser to parse incoming requests

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// //Use Helmet to protect against known vulnerabilities
// app.use(helmet());

//Use Morgan to log incoming trafic
app.use(morgan("dev"));

app.use("/api", routes);

//only routes for admin
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./test/index.html"));
});

module.exports = app;

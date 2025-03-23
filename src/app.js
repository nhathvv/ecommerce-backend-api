const express = require("express");
const morgan = require("morgan");
const compresion = require("compresion");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
// init middlwares
app.use(morgan("dev"));
app.use(helmet());
app.use(compresion());

// init db
require("../src/dbs/init.mongodb");
// init router
app.use("", require("./routes/index"));

// handling error

module.exports = app;

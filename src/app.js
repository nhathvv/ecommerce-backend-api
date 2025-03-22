const express = require("express");
const morgan = require("morgan");
const compresion = require("compresion");
const helmet = require("helmet");

const app = express();
// init middlwares
app.use(morgan("dev"));
app.use(helmet());
app.use(compresion());

// init db
require("../src/dbs/init.mongodb");
// init router
app.get("/", (req, res, next) => {
  const str = "Nhat.dev";
  return res.status(200).json({
    message: "Welcome itstahn!!",
    // metadata: str.repeat(100000),
  });
});

// handling error

module.exports = app;

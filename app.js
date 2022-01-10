const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const router = require("./routes");
const logger = require("./utils/logger");
const CreateError = require("http-errors");

const errorHandler = require("./middlewares/errorHandler");

dotenv = require("dotenv");

app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

app.get("*", (req, res) => {
  res.send("OOPS! Looks like you are lost.", 404);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const router = require("./routes");
const CreateError = require("http-errors");
const errorHandler = require("./middlewares/errorHandler");
dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(router);

app.use("/uploads/", express.static("uploads/"));

app.get("*", (req, res, next) => {
  res.status(404).json({
    message: "Page not found",
  });
  next(CreateError(404));
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

app.use(errorHandler);

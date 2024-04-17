const express = require("express");
const cors = require("cors");
const errorController = require("./controllers/errorController");
const companyRouter = require("./routes/companyRouter");

const app = express();

/** Setting up Middlewares **/
app.use(express.json());
app.use(cors());

/** Route Config */
app.use("/clients", companyRouter);

/** Handling unknown Routes */
app.all("*", (req, res, next) => [
  next(
    new Error(
      `The route ${req.originalUrl} that you are trying to access doesn't exist.`,
      404
    )
  ),
]);

/** Global Error Handler */
app.use(errorController);

module.exports = app;

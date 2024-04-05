const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse request of content-type - application/json
app.use(bodyParser.json());

// configuring the database
const mongoose = require("mongoose");

// connecting to database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database successfully.");
  })
  .catch((error) => {
    console.log("Could not connect to database. Exiting now...", error);
    process.exit();
  });

// define a simepl route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to TODO App API.",
  });
});

// require notes routes
require("./app/routes/todo.routes")(app);

// listen to the requests
app.listen(3000, () => {
  console.log("Server is up and running at port 3000.");
});

module.exports = app;

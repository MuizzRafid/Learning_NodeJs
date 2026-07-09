const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(bodyParser.json()); //it will store the data in req.body

// const Person = require("./models/Person");
// const MenuItem = require("./models/MenuItem");
//get take two parameter 1.the end point 2.function(req,res)

app.get("/", function (req, res) {
  res.send("Welcome to my hotel... how i can help you");
});

app.post("/items", (req, res) => {
  res.send("data is saved");
});

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listening on port 3000");
});

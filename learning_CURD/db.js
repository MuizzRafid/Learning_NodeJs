const mongoose = require("mongoose");
require("dotenv").config();

// const mongoURL = process.env.LOCAL_MONGODB_URL;

const mongoURL = process.env.MONGODB_URL;

//set up MongoDB connection
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to mongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error", err);
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//Export the database connection
module.exports = db;

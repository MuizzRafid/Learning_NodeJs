const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/hotels";

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

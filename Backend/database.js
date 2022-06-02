var mongoose = require("mongoose");
const connect = () => {
  mongoose.connect("mongodb://localhost:27017/DocumentlibraryDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var conn = mongoose.connection;
  conn.on("connected", function () {
    console.log("database is connected successfully");
  });
  conn.on("disconnected", function () {
    console.log("database is disconnected successfully");
  });
  conn.on("error", console.error.bind(console, "connection error:"));
};
module.exports = { connect };

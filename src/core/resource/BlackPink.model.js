const mongoose = require("mongoose");

const connect = 'mongodb://localhost:27017/BackEndKoa?authSource=admin'
mongoose.connect(connect, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("connected", function () {
  console.log("connected");
});

const Schema = mongoose.Schema;

// const student = new mongoose.Schema({
//   id: String,
//   Name: String,
//   Surname: String,
//   thumbnail: String
// });
const BlackPink = new mongoose.Schema({
  Amount: Number,
  AmountMax : Number,
  OnSale : Date,
  ReceiptTicket: [
    {
      id: String,
      date: Date,
    }
  ]
});
const BlackPinks = mongoose.model("BlackPink", BlackPink);
mongoose.startSession()

module.exports = BlackPinks
const express = require("express");
const fs = require("fs");
const path = require("path");
const { GetBookedData, BookSeats } = require("./booking.js");

const app = express();
require("dotenv").config();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
const main = fs.readFileSync("public/Main.html");

app.get("/", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.send(main);
});

app.post("/book-seats",BookSeats);
app.get("/booked-status", GetBookedData);

app.listen(process.env.PORT || 3000, () => {
  console.log("listening at port 3000");
});

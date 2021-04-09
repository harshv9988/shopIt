const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");

let cors = require("cors");

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileupload());
app.use(cors());

//setting up cloudinary config

//import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");
app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//error middleware
app.use(errorMiddleware);

module.exports = app;

const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileupload());

//setting up cloudinary config

//import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

//error middleware
app.use(errorMiddleware);

module.exports = app;

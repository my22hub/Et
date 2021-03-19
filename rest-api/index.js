const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require('dotenv').config();

/// REST-API CONFIG
const PORT = process.env.PORT || 5000

const app = express();


/// DB CONNECTION
const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@heckar-news.d3u83.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(mongoString, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

mongoose.connection.on("error", function(error) {
    if (process.env.NODE_ENV === "development") {
        console.log(error)
    }
});

mongoose.connection.on("open", function() {
    console.log("Connected to MongoDB database.")
});


/// REST-API CONFIG
app.use(helmet());

app.use(cors({
    origin: process.env.NODE_ENV === "development" ? "http://localhost:3000" : /domain\.com$/,
    credentials: true
}));


// PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());


/// ROUTES
app.get("/", (_, res) => {
    res.send("rest-api is working, kel!");
});


/// RUN SERVER
app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}`);
});

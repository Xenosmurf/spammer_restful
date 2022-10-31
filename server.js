"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app_serv/config/config_bd");
const db = require("./app_serv/models");
const mongoose = require("mongoose");
const Address = db.address;

const app = express();

//TODO:Change on my routes
let corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.set("view engine", "twig");
app.set("views", ".");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

let a = process.env.DB_CONNECTION;

db.mongoose.connect(`mongodb+srv://user:pass@cluster0.wjw0d20.mongodb.net/?retryWrites=true&w=majority`,
    {useNewUrlParser: true}
    )
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

// routes
require("./app_serv/routes/main_rout")(app);
require("./app_serv/routes/email_rout")(app);
require("./app_serv/routes/send_rout")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
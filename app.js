require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser= require("body-parser");
const apiRouter = require('./api');
const morgan = require('morgan');
const client = require('./db/client');
const path = require ("path");

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.use('/api', apiRouter);

app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log("BODY LOGGER START");
    console.log(req.body);
    console.log("BODY LOGGER END");

    next();
})

client.connect();

// Setup your Middleware and API Router here
// const { PORT = 8080} = process.env;
// app.listen(PORT, ()=> {
//     console.log(`Server running in PORT ${PORT}`)
// });

module.exports = app;

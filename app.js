// set up the server
const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the 
app.use(express.static(__dirname + '/public'));

// define middleware that logs all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
} );

// define a route for the default home page

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

//start the server

app.listen(port, () => {
    console.log(`App server listening on ${port}`);
})

//define a route for the assignment list page

app.get( "/assignments", ( req, res ) => {
    res.sendFile( __dirname + "/views/assignments.html" );
} );

// define a route for the assignment detail page
app.get( "/detail", ( req, res ) => {
    res.sendFile( __dirname + "/views/detail.html" );
} );


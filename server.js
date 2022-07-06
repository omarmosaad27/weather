// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000; 
const server = app.listen(port, listening)


function listening() {
    console.log("listening");
    console.log(`server listening on port ${port}`);
}

// function to destructure data received and add it as anew entry to endpoint
function addDataToServer(req,res) {
    const newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        feelings:req.body.feelings
    }
    projectData = newEntry
    console.log(projectData);
    res.send(projectData)
}
// post route 
app.post("/addNewData", addDataToServer)

// when we call serverData Route we will send project data to the client side 
function retrieveData(req, res) {
    res.send(projectData)
}
// get route
app.get('/serverData',retrieveData)
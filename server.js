
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 3000;

const server = app.listen(port, ()=> console.log(`running on localhost:${port}`));


// GET route
app.get('/home', sendData);
function sendData (req, res) {
  res.send(projectData);
};



// POST route
app.post('/add', (req, res)=> {

      // add incoming data to projectData array
     let newEntry = {
        
        date : req.body.date,
        temperature : req.body.temperature,
        userResponse : req.body.userResponse
     };

      // projectData.unshift(newEntry);
      projectData = newEntry;
      res.send(projectData);

});

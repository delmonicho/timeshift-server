const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// create express app
const app = express();

//enable cors
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to TimeShift application. Write to-do list. Let TimeShift organize and keep track of all your tasks."});
});

// Handle production
if(process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html'));
}
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Shaka brah! Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// ........

// Require Events routes
require('./app/routes/entry.routes.js')(app);

// ........

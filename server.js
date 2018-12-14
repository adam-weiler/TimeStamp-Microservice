// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


/*User can input 4 different options:
Case 1: 2015-12-15 - A valid date.
Case 2: 1450137600 - A valid date.
Case 3: 1450137600abcdefg - An invalid date.
Case 4: (Empty) - An empty string.
*/

app.get('/api/timestamp/:input', function (req, res) { //User input something. Case 1, 2, and 3. 
  let user_input = req.params.input;
 
   if(!isNaN(user_input)) { //User input is a string, not a number. Case 1.
     user_input = parseInt(user_input) * 1000; 
   }
  
  let unix = new Date(user_input).getTime(); //Converts user_input to a Unix timestamp.
  let utc = new Date(user_input).toUTCString(); //Converts user_input to a UTC timestamp.
  
  res.json({"unix": unix, "utc": utc})
})


app.get('/api/timestamp/', function (req, res) { //User input nothing. Case 4.
  let date_string = new Date(); //Will use current time.
  let date_time = date_string.toUTCString(); //Converts current time to a date_time.
  
  res.json({"unix": date_string, "utc": date_time})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

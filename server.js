// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const e = require("express");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});


app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;
  console.log(dateString, typeof dateString, isNaN(dateString));
  let date;
  if (dateString === undefined) {
    // * for /api/ => sends current time
    // If Not pass Anythings as params 
    date = new Date();
  } else {
    if (isNaN(dateString)) {
      // if value is yyyy-mm-dd
      date = new Date(dateString);
    } else {
      //if value is intString ex:1451001600000
      date = new Date(parseInt(dateString));
    }
  }
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

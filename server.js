// server.js
// where your node app starts

// init project
var express = require('express');
// setup a new database
// persisted using async file storage
// Security note: the database is saved to the file `db.json` on the local filesystem.
// It's deliberately placed in the `.data` directory which doesn't get copied if someone remixes the project.
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/db.json')
var db = low(adapter)
var app = express();

// default tag list
db.defaults({ tags: [
      {"tag":"analog-4317e1", "value":"Hancock"},
      {"tag":"analog-60b72c", "value":"Smith"},
      {"tag":"analog-8bd3f2", "value":"Khan"}
    ]
  }).write();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/tags", function (request, response) {
  var dbTags=[];
  var tags = db.get('tags').value() // Find all tags in the collection
  tags.forEach(function(tag) {
    dbTags.push([tag.tag,tag.value]); // adds their info to the dbTags value
  });
  response.send(dbTags); // sends dbTags back to the page
});

// creates a new entry in the tags collection with the submitted values
app.post("/storeavalue", function (request, response) {
  db.get('tags')
    .push({ tag: request.query.Tag, value: request.query.Value })
    .write()
  var res = new Array()
  res[0] = 'STORED'
  res[1] = request.query.Tag
  res[2] = request.query.Value 
  response.send(res)
});

// Search a tag from tags
app.get("/getvalue", function (request, response) {
  const data = db
    .get('tags')
    .find({ tag: request.query.tag })
    .value()
  var res = new Array()
  res[0] = 'VALUE'
  res[1] = data["tag"]
  res[2] = data["value"]  
  response.send(res)
});

// removes all entries from the collection
app.get("/clear", function (request, response) {
  // removes all entries from the collection
  db.get('tags')
  .remove()
  .write()
  console.log("Database cleared");
  response.redirect("/");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
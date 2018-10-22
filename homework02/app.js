// Justin Baskaran
// Homework 02
// CS 336 Calvin College

const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');


var peopleList;
var COMMENTS_FILE = path.join(__dirname, 'people.json');

 fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    peopleList= JSON.parse(data);
  });

app.use('/', express.static   (path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function Name(id){

	for(var i = 0; i < peopleList.length; i++) {
		if (peopleList[i].id == id) {
			return peopleList[i].firstname + peopleList[i].lastname;
		}
	}
	return "404 Not found";}

function Person(id){
	for(var i = 0; i < peopleList.length; i++) {
    //console.log(peopleList[i].id);
		if (peopleList[i].id == id) {
			return peopleList[i];
		}
	}
	return "404 Not found";
}


function Years(id){
	for(var i = 0; i < peopleList.length; i++) {
		if (peopleList[i].id == id) {
			return Math.floor((Date.now() - new Date(peopleList[i].start)) / 31536000000).toString();
		}
	}
	return "404 Not found";}


app.get('/people', function (req, res) {
  res.json(peopleList);
});


app.post('/people', function (req, res) {

  var newPerson = {
            id: peopleList.length + 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            start: req.body.start,
  };
  peopleList.push(newPerson);

  console.log(peopleList.length);


var json = JSON.stringify(peopleList);

 fs.writeFile(COMMENTS_FILE, json, function(err) {});

});
/*
curl -X POST localhost:3000/people -d '{"firstname":"123xyz","lastname":"xyz321","start":"1990-01-15"}' -H 'Content-Type: application/json'
*/



app.post('/response', function (req, res) {

  res.send('You entered <code><br></code> Firstname: ' + req.body.firstname 
                +'<code><br></code> Lastname: '+req.body.lastname
                  + '<code><br></code> Date: '+  req.body.date );


  var newPerson = {
            id: peopleList.length + 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            start: req.body.date,
  };
  peopleList.push(newPerson);

  console.log(peopleList.length);


var json = JSON.stringify(peopleList);

 fs.writeFile(COMMENTS_FILE, json, function(err) {});

});
app.post('/getPerson', function (req, res) {
  console.log(req.body.id);
  var pindex = Person(parseInt(req.body.id));
  console.log(pindex);
  if (pindex != "404 Not found")
  {
    res.json({"content" : pindex});
  }
  else 
  {
    res.send("404 Not found");
  }

});

app.get('/person/:id', function (req, res) {
  var pindex = Person(req.params.id);
  if (pindex != "404 Not found")
  {
  	res.json(pindex);
  }
  else 
  {
  	res.send("404 Not found");
  }
});

app.delete('/person/:id', function(req, res) {
for(var i = 0; i < peopleList.length; i++) {
    //console.log(peopleList[i].id);
    if (peopleList[i].id == req.params.id) {
      delete peopleList[i];
      res.send("Deleted the Person with ID=" + req.params.id);
    }
  }
  res.send( "404 Not found");
});
/*
curl -X DELETE localhost:3000/person/0 -H 'Content-Type: application/json'
*/
app.post('/person/:id', function (req, res) {
 for(var i = 0; i < peopleList.length; i++) {
    //console.log(peopleList[i].id);
    if (peopleList[i].id == req.params.id) {
      peopleList[i].firstname = req.body.firstname;
      peopleList[i].lastname = req.body.lastname;
      peopleList[i].start = req.body.start;
      res.send("Changed the Person with ID=" + req.params.id);
    }
  }
  res.send( "404 Not found");

});
/*
curl -X POST localhost:3000/person/0 
-d '{"firstname":"justin","lastname":"baskaran","start":"2001-01-15"}'
-H 'Content-Type: application/json'
*/








app.get('/person/:id/name', function (req, res) {
  var pindex = Name(req.params.id);
  if (pindex != "404 Not found")
  {
  	res.json(pindex);
  }
  else 
  {
  	res.send("404 Not found");
  }
});


app.get('/person/:id/years', function (req, res) {
  var pindex = Years(req.params.id);
  if (pindex != "404 Not found")
  {
  	res.json(pindex);
  }
  else 
  {
  	res.send("404 Not found");
  }
});

app.all("*", (req, res) => {
	res.sendStatus( 404 );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
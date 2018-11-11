// Justin Baskaran
// Homework 02
// CS 336 Calvin College

const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var password = process.env.MONGO_PASSWORD;
var dbo;
var peopleList;
MongoClient.connect('mongodb://cs336:' +password + '@ds151863.mlab.com:51863/cs336', function (err, client) {
  if (err) throw err

  dbo = client.db('cs336')
  
  dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err

    peopleList = result;

  })
  app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');


})
});

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static   (path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//////// FINDER METHODS ///////////
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



/// HTTP REQUEST METHODS /////////




app.get('/people', function (req, res) {
  dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      
  })

  res.json(peopleList);
});


app.post('/people', function (req, res) {
  dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      
  })

  var id = peopleList.length + 1;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var start = req.body.start;
 

  var collection = dbo.collection('homework3');


    collection.insertOne
    ({id: id, firstname: firstname, lastname: lastname, start: start});



    dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      //console.log(result);
      res.json(peopleList);
  })


});
/*
curl -X POST localhost:3000/people -d '{"firstname":"123xyz","lastname":"xyz321","start":"1990-01-15"}' -H 'Content-Type: application/json'
*/



app.post('/response', function (req, res) {
  dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      
  })


  var id = peopleList.length + 1;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var start = req.body.date;
 

  var collection = dbo.collection('homework3');


    collection.insertOne
    ({id: id, firstname: firstname, lastname: lastname, start: start});



    dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      
  })

     res.send('You entered <code><br></code> Firstname: ' + req.body.firstname 
                +'<code><br></code> Lastname: '+req.body.lastname
                  + '<code><br></code> Date: '+  req.body.date );

});


app.post('/getPerson', function (req, res) {
  dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      
  })

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
  dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      
  })
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
  dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      
  })

  var collection = dbo.collection('homework3');

  collection.deleteMany({ id : parseInt(req.params.id) });

  collection.find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
  })

  res.send("Deleted the Person with ID=" + req.params.id);
    
  
 
});
/*
curl -X DELETE localhost:3000/person/0 -H 'Content-Type: application/json'
*/
app.put('/person/:id', function (req, res) {
  dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      
  })

  var collection = dbo.collection('homework3');

  collection.updateMany({id:parseInt(req.params.id)}, {$set:
    {
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      start:req.body.start
    }})
  res.send("updated");
  collection.find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
  })

 

});
/*
curl -X PUT localhost:3000/person/0 -d '{"firstname":"justin","lastname":"baskaran","start":"2001-01-15"}' -H 'Content-Type: application/json'
*/

app.get('/person/:id/name', function (req, res) {
  dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      
  })

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
  dbo.collection('homework3').find().toArray(function (err, result) {
    if (err) throw err
      peopleList = result;
      
  })

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

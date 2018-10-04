const express = require('express')
const app = express()
const port = 3000


var peopleList = JSON.parse(`
[		{ "id": "1", "firstname": "john", "lastname":"smith", "start":"2006-01-24" },
		{ "id": "2", "firstname": "Joe", "lastname":"Fiore", "start":"2005-05-31" },
		{ "id": "3", "firstname": "Critius", "lastname":"Peel", "start":"2004-04-21" },
		{ "id": "4", "firstname": "Feelman", "lastname":"Trotter", "start":"2003-04-16" },
		{ "id": "5", "firstname": "Bag", "lastname":"Doggy", "start":"2002-04-17" },
		{ "id": "6", "firstname": "Jimmy", "lastname":"Hope", "start":"2001-04-12" },
		{ "id": "7", "firstname": "Calvin", "lastname":"College", "start":"2017-12-10" }
]
`
);
function Name(id)
{

	for(var i = 0; i < peopleList.length; i++) {
		if (peopleList[i].id == id) {
			return peopleList[i].firstname + peopleList[i].lastname;
		}
	}
	return "404 Not found";

}
function Person(id)
{
	for(var i = 0; i < peopleList.length; i++) {
		if (peopleList[i].id == id) {
			return peopleList[i];
		}
	}
	return "404 Not found";
}
function Years(id)
{
	for(var i = 0; i < peopleList.length; i++) {
		if (peopleList[i].id == id) {
			return Math.floor((Date.now() - new Date(peopleList[i].start)) / 31536000000).toString();
		}
	}
	return "404 Not found";
}





app.get('/people', function (req, res) {
  res.json(peopleList);
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
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var password = process.env.MONGO_PASSWORD;
var db;
var data;
MongoClient.connect('mongodb://cs336:' +password + '@ds151863.mlab.com:51863/cs336', function (err, client) {
  if (err) throw err

  db = client.db('cs336')
  
  db.collection('cs336collection').find().toArray(function (err, result) {
    if (err) throw err

    data = result;

  })
  app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');


})
  });

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.get('/api/comments', function(req, res) {
  res.json(data);
});

app.post('/api/comments', function(req, res) {

    var id = Date.now();
    var author = req.body.author;
    var text = req.body.text;
 
   var collection = db.collection('cs336collection');


    collection.insertOne
    ({id: id, author: author, text: text});

    db.collection('cs336collection').find().toArray(function (err, result) {
    if (err) throw err

      data = result;
      console.log(result);
      res.json(result);
      

  })

 
});




var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var password = process.env.MONGO_PASSWORD;
var db;
var data;
// Add this at the top, just after the imports.
var APP_PATH = path.join(__dirname, 'dist');


MongoClient.connect('mongodb://cs336:' +password + '@ds151863.mlab.com:51863/cs336', function (err, client) {
  if (err) throw err

  db = client.db('cs336')
  
  db.collection('cs336collection').find().toArray(function (err, result) {
    if (err) throw err
   // console.log(result);
    data = result;

  })
  

app.set('port', (process.env.PORT || 3000));

// Modify the current app.use() command.
app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.get('/api/comments', function(req, res) {
   db.collection('cs336collection').find().toArray(function (err, result) {
    if (err) throw err
   // console.log(result);
    data = result;

  })
   
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

app.get('/api/comments/:id', function(req, res) {
    db.collection("cs336collection").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.put('/api/comments/:id', function(req, res) {
    var updateId = Number(req.params.id);
    var update = req.body;
    db.collection('cs336collection').updateOne(
        { id: updateId },
        { $set: update },
        function(err, result) {
            if (err) throw err;
            db.collection("cs336collection").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

app.delete('/api/comments/:id', function(req, res) {
    db.collection("cs336collection").deleteOne(
        {'id': Number(req.params.id)},
        function(err, result) {
            if (err) throw err;
            db.collection("cs336collection").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});



// Add this at the bottom, just before starting the server.
app.use('*', express.static(APP_PATH));


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');


})



});
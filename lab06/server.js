/**
 * This implements some HTTP method/code, form and cookie examples.
 */

const express = require('express');
const app = express();
const htppstautscode = require('http-status-code');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var HTTPStatusCode = require('http-status-code');

const HOST = "localhost";
const PORT = 3000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// --------------------------------
// HTTP route and return code examples.

// These routes respond to non-GET requests.
app.put('/request', function(req, res) {
    res.send('Hello, PUT Username:'
         + req.body.username + ' Password: ' + req.body.password);
});
app.post('/request', function(req, res) {
  res.send('Hello, POST Username:'
         + req.body.username + ' Password: ' + req.body.password);
});
app.delete('/request', function(req, res) {
    res.send("Hello, DELETE!");
});
app.get('/request', function (req, res) {
  res.send('Hello GET!')
});
app.head('/request', function(req, res) {
    res.send("Hello, HEAD!");
});
app.get('*', function(req, res) {
   res.send("400 Bad Request");
});

// --------------------------------
// HTTP form example

// Responds to form posts from the forms/index.html example.
app.post('/forms', function(req, res) {
    res.send('Hello, form POST!<br>Username: <code>'
	     + req.body.user_name + '</code>' + ' UserEmail: <code>' + req.body.user_mail + '</code>' 
         + ' User Message: <code>' + req.body.user_message + '</code>');
});

// // --------------------------------
// // HTTP cookies examples

// // This implements routes to list/create/delete cookies.
// app.get("/cookies", function(req, res) {
//     let cookieMessage = 'cookieName not set...';
//     if (req.cookies.cookieName) {
//         cookieMessage = "cookieName: " + req.cookies.cookieName;
//     }
//     res.send("Hello, cookies!<br> " + cookieMessage);
// });
// app.get("/cookies/set", function(req, res) {
//     res.cookie("cookieName", "cookieValue");
//     res.send("Cookie is set.");
// });
// app.get("/cookies/clear", function(req, res) {
//     res.clearCookie("cookieName");
//     res.send("Cookie is deleted.");
// });

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});

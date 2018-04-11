// Server
var express = require ('express');
var app = express ();
var bodyParser = require ('body-parser');

// parse application/json
app.use(bodyParser.json());

// MongoDB dependencies
var Gremlin = require("gremlin");
var assert = require('assert');

// CRUD API for CosmosDB (MongoDB API)
var gremlin_api = require ('./services/graph-crud');

// Configuration
var config = require ('./config');

// Data
// var customer = require ('./data/customer.json');

const client = Gremlin.createClient(
    443, 
    config.graph.connectionURI, 
    { 
        "session": false, 
        "ssl": true, 
        "user": `/dbs/${config.graph.database}/colls/${config.graph.collection}`,
        "password": config.graph.primaryKey
    }
);

app.post('/graph/vertex', function (req, res) {
    gremlin_api.addVertex (client, req.body, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Add V'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.post('/graph/edge', function (req, res) {
    gremlin_api.addEdge (client, req.body, (err, data) => {
        if (err) {
            console.log (err);
            res.send (JSON.stringify ({'err':'Cannot Add E'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.get('/graph/all', function (req, res) {
    gremlin_api.queryAll (client, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.get('/graph/', function (req, res) {
    gremlin_api.queryV (client, req.query.id, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.put('/graph/', function (req, res) {
    gremlin_api.update (client, req.body, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Update'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.delete('/graph/vertex', function (req, res) {
    gremlin_api.deleteV (client, req.query.id, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Delete V'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.delete('/graph/edge', function (req, res) {
    gremlin_api.deleteE (client, req.body, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Delete E'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

var server = app.listen(4200, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("App listening at http://%s:%s", host, port);
});

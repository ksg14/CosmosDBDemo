// Server
var express = require ('express');
var app = express ();
var bodyParser = require ('body-parser');

// parse application/json
app.use(bodyParser.json());

// MongoDB dependencies
var MongoDB = require("mongodb");
var assert = require('assert');

// CRUD API for CosmosDB (MongoDB API)
var mongo_api = require ('./services/mongodb_crud');

// Configuration
var config = require ('./config');

// Data
var customer = require ('./data/customer.json');

var mongodb;
var database = config.mongo.database;
var collection = config.mongo.collection;

app.post('/mongodb/', function (req, res) {
    mongo_api.insert (mongodb, collection, req.body, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Add'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.get('/mongodb/all', function (req, res) {
    mongo_api.findAll (mongodb, collection, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.get('/mongodb/', function (req, res) {
    mongo_api.find (mongodb, collection, req.query.customerId, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.put('/mongodb/', function (req, res) {
    mongo_api.update (mongodb, collection, req.body, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Update'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.delete('/mongodb/', function (req, res) {
    mongo_api.delete (mongodb, collection, req.query.customerId, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});


var cosmosClientCallback = (err, db) => {
    if (err) console.log (err);
    else {
        assert.notEqual (null, db);

        mongodb = db;
        console.log ('Successfully connected');

        var server = app.listen(4200, function () {
            var host = server.address().address;
            var port = server.address().port;
            
            console.log("App listening at http://%s:%s", host, port);
        });
    }
    
};

MongoDB.MongoClient.connect (config.mongo.connectionURI, cosmosClientCallback);

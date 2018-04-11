// Server
var express = require ('express');
var app = express ();
var bodyParser = require ('body-parser');

// parse application/json
app.use(bodyParser.json());

// Cassandra dependencies
var cassandra = require("cassandra-driver");
var assert = require('assert');
var tls = require('tls');
var fs = require('fs');

// CRUD API for CosmosDB (Cassandra API)
var cassandra_api = require ('./services/cassandra_crud');

// Configuration
var config = require ('./config');

// Data
// var ratings = require ('./data/ratings.json');

var ssl_option = {
    cert : fs.readFileSync("./certs/bc2025.crt"),
    secureProtocol: 'TLSv1_2_method'
};

const authProviderLocalCassandra = new cassandra.auth.PlainTextAuthProvider(config.cassandra.userName, config.cassandra.password);

const client = new cassandra.Client({contactPoints: [config.cassandra.connectionURI], authProvider: authProviderLocalCassandra, sslOptions:ssl_option});

app.post('/cassandra/', function (req, res) {
    // mongo_api.insert (mongodb, collection, req.body, (err, data) => {
    //     if (err) {
    //         res.send (JSON.stringify ({'err':'Cannot Add'}));
    //     }
    //     else {
    //         res.send (JSON.stringify (data));
    //     }
    // });
});

app.get('/cassandra/all', function (req, res) {
    // mongo_api.findAll (mongodb, collection, (err, data) => {
    //     if (err) {
    //         res.send (JSON.stringify ({'err':'Cannot Get'}));
    //     }
    //     else {
    //         res.send (JSON.stringify (data));
    //     }
    // });
});

app.get('/cassandra/', function (req, res) {
    // mongo_api.find (mongodb, collection, req.query.customerId, (err, data) => {
    //     if (err) {
    //         res.send (JSON.stringify ({'err':'Cannot Get'}));
    //     }
    //     else {
    //         res.send (JSON.stringify (data));
    //     }
    // });
});

app.put('/cassandra/', function (req, res) {
    // mongo_api.update (mongodb, collection, req.body, (err, data) => {
    //     if (err) {
    //         res.send (JSON.stringify ({'err':'Cannot Update'}));
    //     }
    //     else {
    //         res.send (JSON.stringify (data));
    //     }
    // });
});

app.delete('/cassandra/', function (req, res) {
    // mongo_api.delete (mongodb, collection, req.query.customerId, (err, data) => {
    //     if (err) {
    //         res.send (JSON.stringify ({'err':'Cannot Get'}));
    //     }
    //     else {
    //         res.send (JSON.stringify (data));
    //     }
    // });
});


var cosmosClientCallback = (err) => {
    if (err) console.log (err);
    else {
        console.log ('Successfully connected');

        var server = app.listen(4200, function () {
            var host = server.address().address;
            var port = server.address().port;
            
            console.log("App listening at http://%s:%s", host, port);
        });
    }
    
};

cassandra_api.connect (client, next, cosmosClientCallback);


// Server
var express = require ('express');
var app = express ();
var bodyParser = require ('body-parser');

// parse application/json
app.use(bodyParser.json());

// Azure Table dependencies
const storage = require ('azure-storage');

// CRUD API for CosmosDB (Table API)
var TableClient = require ('./services/table_crud');

// Configuration
var config = require ('./config');

// Data
var session = require ('./data/session.json');

var table;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
  

app.post('/table/', function (req, res, next) {
    table.addItem (req.body, (err) => {
        if (err) {
            console.log (err);
            res.send (JSON.stringify ({'err':'Cannot Add'}));
        }
        else {
            res.send (JSON.stringify ({'status':'Added'}));
        }
    });
});

app.get('/table/all', function (req, res, next) {
    table.findAll ( (err, data) => {
        if (err) {
            console.log (err);
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.get('/table/', function (req, res, next) {
    table.find (req.query.row, (err, data) => {
        if (err) {
            console.log (err);
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});



var server = app.listen(config.table.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    const storageClient = storage.createTableService(config.table.connectionString);

    table = new TableClient (storageClient, config.table.tableName, config.table.partition, (err) => {
        if (err) {
            console.log ("Cannot Get/Create Table " + config.table.tableName);
        }
        console.log("App listening at http://%s:%s", host, port);
    });
});


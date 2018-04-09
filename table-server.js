
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

app.post('/table/', function (req, res) {
    table.addItem (req.body, (err) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Add'}));
        }
        else {
            res.send (JSON.stringify ({'status':'Added'}));
        }
    });
});

app.get('/table/all', function (req, res) {
    table.findAll ( (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.get('/table/', function (req, res) {
    table.find (req.query.row, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});



var server = app.listen(4200, function () {
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


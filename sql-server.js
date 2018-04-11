// Server
var express = require ('express');
var app = express ();
var bodyParser = require ('body-parser');

// parse application/json
app.use(bodyParser.json())

// Dependencies
var DocumentDBClient = require ('documentdb').DocumentClient;

// Services
var TaskDao = require ("./services/taskDao");

// Configuration
var config = require ("./config");

// Data
var products = require ("./data/inventory.json");
// set NODE_TLS_REJECT_UNAUTHORIZED=0

var sql_db, sqlDbClient;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.post('/sql/', function (req, res, next) {
    sql_db.addItem (req.body, (err) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Add'}));
        }
        else {
            res.send (JSON.stringify ({'status':'added'}));
        }
    });
});

app.get('/sql/all', function (req, res, next) {
    sql_db.getAllItems ( (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    } );
});

app.get('/sql/', function (req, res, next) {
    sql_db.getItem (req.query.productId, (err, data) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Get'}));
        }
        else {
            res.send (JSON.stringify (data));
        }
    });
});

app.put('/sql/', function (req, res, next) {
    sql_db.updateItem (req.body, (err) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Update'}));
        }
        else {
            res.send (JSON.stringify ({'status':'updated'}));
        }
    } );
});

app.delete('/sql/', function (req, res, next) {
    sql_db.removeItem (req.query.productId, (err) => {
        if (err) {
            res.send (JSON.stringify ({'err':'Cannot Delete'}));
        }
        else {
            res.send (JSON.stringify ({'status':'deleted'}));
        }
    } );
});


var server = app.listen(config.sql.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    sqlDbClient = new DocumentDBClient(config.sql.host, {
        masterKey: config.sql.primaryKey
    });

    sql_db = new TaskDao (sqlDbClient, config.sql.db, config.sql.col);

    sql_db.init ( (err) => {
        if (err) {
            console.log (err);
        } else {
            console.log("App listening at http://%s:%s", host, port);
        }
    });

});
var config = require ("../config");

class CRUD {

    static connect(client, next, callback) {
        client.connect(next);
    }
    
    static createKeyspace(client, next, callback) {
        var query = "CREATE KEYSPACE IF NOT EXISTS " + config.cassandra.Keyspace + " WITH replication = {\'class\': \'NetworkTopologyStrategy\', \'datacenter\' : \'1\' }";
        client.execute(query, next);
        console.log("created keyspace");    
    }

    static createTable(client, next, callback) {
        var query = "CREATE TABLE IF NOT EXISTS " + config.cassandra.Keyspace + ".user (user_id int PRIMARY KEY, user_name text, user_bcity text)";
        client.execute(query, next);
        console.log("created table");
}

    static insert(client, next, callback) {
        const queries = [
            {
                query: 'INSERT INTO  ' + config.cassandra.Keyspace + '.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
                params: [1, 'LyubovK', 'Dubai', '2017-10-3132']
            },
            {
                query: 'INSERT INTO  ' + config.cassandra.Keyspace + '.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
            params: [2, 'JiriK', 'Toronto', '2017-10-3133']
            },
            {
                query: 'INSERT INTO  ' + config.cassandra.Keyspace + '.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
            params: [3, 'IvanH', 'Mumbai', '2017-10-3134']
            },
            {
            query: 'INSERT INTO  ' + config.cassandra.Keyspace + '.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
            params: [4, 'IvanH', 'Seattle', '2017-10-3135']
        },
                    {
            query: 'INSERT INTO  ' + config.cassandra.Keyspace + '.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
            params: [5, 'IvanaV', 'Belgaum', '2017-10-3136']
            },
            {
            query: 'INSERT INTO  ' + config.cassandra.Keyspace + '.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
            params: [6, 'LiliyaB', 'Seattle', '2017-10-3137']
        },
            {
                query: 'INSERT INTO  ' + config.cassandra.Keyspace + '.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
                params: [7, 'JindrichH', 'Buenos Aires', '2017-10-3138']
            },
            {
                query: 'INSERT INTO  ' + config.cassandra.Keyspace + '.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
            params: [8, 'AdrianaS', 'Seattle', '2017-10-3139']
        },
            {
            query: 'INSERT INTO  ' + config.cassandra.Keyspace + '.user  (user_id, user_name , user_bcity) VALUES (?,?,?)',
            params: [9, 'JozefM', 'Seattle', '2017-10-3140']
            }
        ];
        client.batch(queries, { prepare: true}, next);
    }

    static selectAll(client, next, callback) {
        console.log("\Select ALL");
        var query = 'SELECT * FROM ' + config.cassandra.Keyspace + '.user';
        client.execute(query, { prepare: true}, function (err, result) {
        if (err) return next(err);
        result.rows.forEach(function(row) {
            console.log('Obtained row: %d | %s | %s ',row.user_id, row.user_name, row.user_bcity);
        }, this);
        next();
    });
    }

    static selectById(client, next, callback) {
        console.log("\Getting by id");
        var query = 'SELECT * FROM ' + config.cassandra.Keyspace + '.user where user_id=1';
        client.execute(query, { prepare: true}, function (err, result) {
        if (err) return next(err);
        result.rows.forEach(function(row) {
            console.log('Obtained row: %d | %s | %s ',row.user_id, row.user_name, row.user_bcity);
        }, this);
        next();
        });
    }
}

module.exports = CRUD;
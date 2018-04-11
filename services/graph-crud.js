
class CRUD {

    static dropGraph(client, callback)
    {
        client.execute('g.V().drop()', { }, (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        });
    }

    static addVertex(client, obj, callback)
    {
        var query = "", label;

        if (obj.CustomerID)
            label = "customer";
        else if (obj.ProductID)
            label = "product";
        else if (obj.Relation)
            label = "relation";
        else
            label = "other";

        query = "g.addV ('" + label + "')";

        for (var key in obj) {
            if (key == "CustomerID" || key == "ProductID" )
                query += ".property ('id', '" + obj[key] + "')";
            else 
            query += ".property ('" + key + "', '" + obj[key] + "')";
        }
        
        client.execute(query, { }, (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        });
    }

    static addEdge(client, obj, callback)
    {
        // var edgeProperties = "";
        // for (var key in obj) {
        //     if (key == "v1" || key == "v2" )
        //         continue;
        //     else 
        //         edgeProperties += "'" + key + "', '" + obj [key] + "',";
        // }
        // edgeProperties = edgeProperties.slice (0, -1);

        var query = "g.V('" + obj.v1 + "').addE('" + obj.Relation + "').to(g.V('" + obj.v2 + "'))";
        
        // console.log (query);
        // callback (null, {});
        client.execute(query, { }, (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        });
    }

    static countVertices(client, callback)
    {
        client.execute("g.V().count()", { }, (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        });
    }

    static queryAll (client, callback)
    {
        console.log("Running Query");
        client.execute("g.V()", { }, (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        });
    }

    static queryV (client, id, callback)
    {
        client.execute("g.V().has('id', '" + id + "')", { }, (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        });
    }

    static update (client, obj, callback)
    {
        var query = "g.V().has('id', '" + obj.id + "')";
        
        for (var key in obj) {
            if (key == "id")
                continue;
            query += ".property ('" + key + "', '" + obj[key] + "')";
        }
        // console.log (query); 
        // callback (null, {});   
        client.execute(query, { }, (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        });
    }

    static deleteV (client, id, callback)
    {
        client.execute("g.V().has('id', '" + id + "').drop ()", { }, (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        });
    }

    static deleteE (client, obj, callback)
    {
        var query = "g.V('" + obj.v1 + "').outE('" + obj.Relation + "').where(inV().has('id', '" + obj.v2 + "')).drop()";

        client.execute(query, { }, (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        });
    }

}

module.exports = CRUD;
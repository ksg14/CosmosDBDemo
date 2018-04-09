var assert = require ('assert');

class CRUD {

    static insert (db, col, obj, callback) {
        db.collection(col).insertOne( obj, function(err, result) {
                callback (err, result);
        });
    }

    static findAll (db, col, callback) {
        db.collection(col).find ({}).toArray ( function (err, data) {
            callback (err, data);
        });
    }

    static find (db, col, customerId, callback) {
        db.collection(col).find ({ "Customer Details.Customer ID" : customerId }).toArray ( function (err, data) {
            callback (err, data);
        });
    }
    
    static update (db, col, obj, callback) {
        var query = { "Customer Details.Customer ID" : obj['Customer Details']['Customer ID'] };
        // var newValues = { $set: { "Customer Details.ADDRESS" : obj['Customer Details']['ADDRESS'], "Customer Details.Email" : obj['Customer Details']['Email'], "Customer Details.Phone" : obj['Customer Details']['Phone'] } };
        var newValues = { $set: { "Customer Details" : obj['Customer Details'] } };

        db.collection(col).updateOne(
            query, newValues, function(err, results) {
                callback(err, results);
        });
    }
    
    static delete (db, col, customerId, callback) {
        db.collection(col).deleteMany(
            { "Customer Details.Customer ID" : customerId },
            function(err, results) {
                callback (err, results);
            }
        );
    }

}

    
module.exports = CRUD;
    
var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('./docdbUtils');

function TaskDao(documentDBClient, databaseId, collectionId) {
  this.client = documentDBClient;
  this.databaseId = databaseId;
  this.collectionId = collectionId;

  this.database = null;
  this.collection = null;
}

TaskDao.prototype = {
  init: function(callback) {
    var self = this;

    docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function(err, db) {
      if (err) {
        callback(err);
      }
      else {
        self.database = db;

        docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function(err, coll) {
            if (err) {
                callback(err);
            }

            self.collection = coll;
            callback (null);
        });
      }
    });
  },

  find: function(querySpec, callback) {
    var self = this;

    self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, results) {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  addItem: function(item, callback) {
    var self = this;
    item.Quantity = parseInt (item.Quantity);
    item.Price = parseInt (item.Price);

    self.client.createDocument(self.collection._self, item, function(err, doc) {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },

  updateItem: function(item, callback) {
    var self = this;

    self.getItem(item.ProductID, function(err, doc) {
      if (err) {
        callback(err);
      } else {
        // Update Document attributes
        doc.ProductName = item.ProductName;
        doc.Quantity = parseInt (item.Quantity);
        doc.Price = parseInt (item.Price);

        self.client.replaceDocument(doc._self, doc, function(err, replaced) {
          if (err) {
            callback(err);
          } else {
            callback(null);
          }
        });
      }
    });
  },

  getItem: function(itemId, callback) {
    var self = this;

    var querySpec = {
      query: 'SELECT * FROM root r WHERE r.ProductID=@productId',
      parameters: [{
        name: '@productId',
        value: itemId
      }]
    };

    self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, results) {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  },

  getAllItems: function(callback) {
    var self = this;

    var querySpec = {
      query: 'SELECT * FROM root r'
    };
    
    self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, results) {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  removeItem: function(itemId, callback) {
    var self = this;

    self.getItem(itemId, function(err, doc) {
      if (err) {
        callback(err);
      } else {
        self.client.deleteDocument(doc._self, function(err, resource, responseHeaders) {
          if (err) {
            callback(err);
          } else {
            callback(null);
          }
        });
      }
    });
  }
};

module.exports = TaskDao;

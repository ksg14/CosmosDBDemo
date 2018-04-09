var azure = require('azure-storage');
var uuid = require('node-uuid');

var entityGen = azure.TableUtilities.entityGenerator;

function Task(storageClient, tableName, partitionKey, callback) {
  this.storageClient = storageClient;
  this.tableName = tableName;
  this.partitionKey = partitionKey;
  this.storageClient.createTableIfNotExists(tableName, function tableCreated(error) {
    if(error) { callback (error) }
    else { callback (null) }
  });
};

Task.prototype = {

    find: function(rowKey, callback) {
        self = this;

        var query = new azure.TableQuery()
        .where('PartitionKey == ? and RowKey == ?', self.partitionKey, rowKey);

        self.storageClient.queryEntities(self.tableName, query, null, null, function entitiesQueried(error, result) {
            if(error) {
                callback(error, null);
            } else {
                callback(null, result.entries);
            }
        });
    },

    findAll: function(callback) {
        self = this;

        var query = new azure.TableQuery();
        self.storageClient.queryEntities(self.tableName, query, null, null, function entitiesQueried(error, result) {
            if(error) {
                callback(error, null);
            } else {
                callback(null, result.entries);
            }
        });
    },
  
    addItem: function(item, callback) {
        self = this;
        // use entityGenerator to set types
        // NOTE: RowKey must be a string type, even though
        // it contains a GUID in this example.
        var itemDescriptor = {};

        for(var key in item) {
            if (typeof item [ key ] == "string")
                itemDescriptor [ key ] = entityGen.String (item [ key ]);
            else if (typeof item [ key ] == "number")
                itemDescriptor [ key ] = entityGen.Int32 (item [ key ]);
            else 
                itemDescriptor [ key ] = entityGen.String (item [ key ]);
        }
        itemDescriptor.PartitionKey = entityGen.String(self.partitionKey),
        itemDescriptor.RowKey = entityGen.String(uuid())

        // var itemDescriptor = {
        //     PartitionKey: entityGen.String(self.partitionKey),
        //     RowKey: entityGen.String(uuid()),
        //     name: entityGen.String(item.name),
        //     category: entityGen.String(item.category),
        //     completed: entityGen.Boolean(false)
        // };
    
        self.storageClient.insertEntity(self.tableName, itemDescriptor, (error) => {
            if (error) { callback(error); }
            else { callback(null); }
        });
    },
  
    updateItem: function(rKey, callback) {
      self = this;
      self.storageClient.retrieveEntity(self.tableName, self.partitionKey, rKey, function entityQueried(error, entity) {
        if(error) {
          callback(error);
        }
        entity.completed._ = true;
        self.storageClient.replaceEntity(self.tableName, entity, function entityUpdated(error) {
          if(error) {
            callback(error);
          }
          callback(null);
        });
      });
    }
  }

module.exports = Task;
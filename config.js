/**
 * Configuration settings (connection strings, keys, etc) for CosmosDB APIs.
 */

var config = {}

config.table = {}
config.table.connectionString = "DefaultEndpointsProtocol=https;AccountName=cosmos-table-sub;AccountKey=rtCKJ74JcOB54dq35uvnXae4HrHOxofpMv6HeXTmUVmUdlZf1k3XZFb7vMJB5wPeCV3UAMZs2tTnPQQxPVWTyw==;TableEndpoint=https://cosmos-table-sub.table.cosmosdb.azure.com:443/;";
config.table.tableName = "Session";
config.table.partition = "log";
config.table.port = 4300;

config.sql = {};
config.sql.host = "https://localhost:8081/";
config.sql.primaryKey = "kI0SVMTRbpVu6CjP1iyc4hzYF0jlJIrApfKA7FYwIBHhzWvKxZdoU8wtCVKyjH60Rs9yeDoS1MGPkgV3Kt8ZHg==";
config.sql.db = "Inventory";
config.sql.col =  "Products";
config.sql.port = 4301;


config.mongo = {};
config.mongo.connectionURI = "mongodb://localhost:kI0SVMTRbpVu6CjP1iyc4hzYF0jlJIrApfKA7FYwIBHhzWvKxZdoU8wtCVKyjH60Rs9yeDoS1MGPkgV3Kt8ZHg==@localhost:10255/CustomerDB?ssl=true";
config.mongo.database = "CustomerDB";
config.mongo.collection = "customerCol";
config.mongo.port = 4302;

config.cassandra = [];
config.cassandra.userName = "";
config.cassandra.password = "";
config.cassandra.connectionURI = "";
config.cassandra.Keyspace = "";

config.graph = {};
config.graph.connectionURI = "cosmos-graph-sub.gremlin.cosmosdb.azure.com";
config.graph.primaryKey = "on9V9yeIbaF2Xq8SM3gIYLUkavknQycRVTkXGN7jaZ4UbAJGkFEFsAuSBUhhdjZ6cv57wjoEaH7tAErEe6et9w==";
config.graph.database = "Ratings";
config.graph.collection = "Products";
config.graph.port = 4303;

module.exports = config;
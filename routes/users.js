var mongo = require('mongodb');
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('users', server);

db.open(function(err, db){
 if(!err){
   console.log("Connected to 'users' database");
   db.collection('users', {strict:true}, function(err, collection){
   if (err) {
   console.log("The 'users' collection doesn't exist. Creating it with sample data...");
   populateDB();
   }
});	
}
});

exports.findAll = function(req, res) {
db.collection('users', function(err, collection) {
collection.find().toArray(function(err, items) {
res.send(items);
});
});
};

exports.addUser = function(req, res) {
var user = req.body;
console.log('Adding user: ' + JSON.stringify(user));
db.collection('users', function(err, collection) {
collection.insert(user, {safe:true}, function(err, result) {
if (err) {
res.send({'error':'An error has occurred'});
} else {
console.log('Success: ' + JSON.stringify(result[0]));
res.send(result[0]);
}
});
});
}

var populateDB = function() {
 
var users = [
{   name: 'Robert Amanfu',
    device: {'id':  '9740b735-d545-4bab-bcdc-ba00a1e76d3a',
   'label':  'Motion Sensor',
   'name':  'Motion Sensor',
   'state': { 'date':  '2015-02-05T01:41:59.865Z',
    'name':  'motion',
    'type': None,
    'unit': None,
    'unixTime': 1423100519865,
    'value':  'inactive'}}}
];
 
db.collection('users', function(err, collection) {
collection.insert(users, {safe:true}, function(err, result) {});
});
 
};




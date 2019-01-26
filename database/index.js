const mongoose = require('mongoose');
const explain = require('mongoose-explain');

mongoose.connect(
  'mongodb://localhost/MyCompass',
  { useNewUrlParser: true, useCreateIndex: true, autoIndex: false }
);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

// define schema

var usersSchema = mongoose.Schema({
  _id: {
    type: Number,
    index: true
  },
  username: String,
  password: String
});

// var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;

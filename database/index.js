const mongoose = require('mongoose');
const explain = require('mongoose-explain');

mongoose.connect(
  'mongodb://localhost/MyCompass',
  { useNewUrlParser: true, useCreateIndex: true }
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
  username: {
    type: String,
    required: [true, 'username required'],
    unique: true
  },
  password: { type: String, required: [true, 'password required'] }
});

// define models

var Users = mongoose.model('users', usersSchema);

module.exports = { Users };

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datadateSchema = new Schema({
  letter: Date,
  frequency: Number
});

module.exports = mongoose.model('Datadate',datadateSchema);

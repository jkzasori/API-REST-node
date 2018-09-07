const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
	
}, {
	timestamps: true
})

var petSchema = new Schema({
	
}, {
	timestamps: true
});

var Pets = mongoose.model('Pet', petSchema);

module.exports = Pets;
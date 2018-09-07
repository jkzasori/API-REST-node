const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var providerSchema = new Schema({
	
}, {
	timestamps: true
});

var Providers = mongoose.model('Provider', providerSchema);

module.exports = Providers;
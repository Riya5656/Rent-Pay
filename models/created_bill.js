const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    issued_to:String,
    issued_data:String,
    total_amount:String,
    deadline:String,
});

module.exports = mongoose.model('Bill', BillSchema);



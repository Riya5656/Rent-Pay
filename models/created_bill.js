const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    id:Number,
    issued_to:String,
    issued_date:String,
    total_amount:String,
    deadline:String,
});

module.exports = mongoose.model('Bill', BillSchema);



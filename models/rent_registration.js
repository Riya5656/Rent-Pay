const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const regSchema = new Schema({
    fname:String,
    lname:String,
    email:String,
    phno:String,
    pass:String,
});

module.exports = mongoose.model('Rent', regSchema);



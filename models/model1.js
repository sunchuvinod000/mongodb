const mongoose = require("mongoose")
const sc = mongoose.Schema({
    full_name:String,
    email:String,
    number:String,
    city:String,
    url:String,
});

module.exports = mongoose.model('sc',sc)
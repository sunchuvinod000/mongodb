const mongoose = require("mongoose")
const sc1 = mongoose.Schema({
    full_name:String,
    email:String,
    team_name:String,
});

module.exports = mongoose.model('sc2',sc1)
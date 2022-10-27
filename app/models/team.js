const mongoose = require("mongoose");
const TeamSchema = new mongoose.Schema({
    name : {typr : String , required : true},
    descriptaion : {typr : String},
    users : {type : [mongoose.Types.ObjectId] , default : []},
    owner : {type : mongoose.Types.ObjectId , required : true},
},{
    timestamps : true
});

const TeamModel = mongoose.model("team", TeamSchema);
module.exports = {
    TeamModel
}
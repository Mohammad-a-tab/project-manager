const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
    title : {typr : String , required : true},
    text : {typr : String},
    image : {type : String , default : "/public/defaults/default.png" },
    owner : {type : mongoose.Types.ObjectId , required : true},
    team : {type : mongoose.Types.ObjectId},
    Private : {type : Boolean , default : true},
},{
    timestamps : true
});

const ProjectModel = mongoose.model("project", ProjectSchema);
module.exports = {
    ProjectModel
}
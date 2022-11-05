const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs =require("fs")
const path = require("path")

function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str,salt)
}

function tokenGenerator(payload){
    const token = jwt.sign(payload,process.env.SECERET_KEY, {expiresIn : "365 days"})
    return token
}

function verifyJwtToken(token){
   const result = jwt.verify(token,process.env.SECERET_KEY)
   if(!result?.username) throw {status : 401, message : "لطفا وارد حساب کاربری خود شوید"}
   return result
}

function createUploadPath(){
    let date = new Date();
    const month = date.getMonth() + 1;
    const Year = "" + date.getFullYear();
    const Month = "" + month;
    const Day = "" + date.getDate();
    const uploadPath = path.join(__dirname,".." , ".." , "public" , "Uploads" , Year,Month,Day);
    fs.mkdirSync(uploadPath , {recursive :true});
    return path.join("public" , "Uploads" , Year,Month,Day)
}
function createlinkForFiles(fileAddress,req){
    return fileAddress? (req.protocol + "://" + req.get("host") + "/" + (fileAddress.replace(/[\\\\]/gm , "/"))) : []
}
module.exports = {
    hashString,
    tokenGenerator,
    verifyJwtToken,
    createlinkForFiles,
    createUploadPath
}
const expressFileUpload = require("express-fileupload");
const path = require("path");
const { createUploadPath } = require("./functions");
const uploadFile = async (req,res,next) => {
     try {
        if(req.file || Object.keys(req.files).length == 0 ) throw {status : 400, message : "تصویر شاخص پروژه را انتخاب نمایید"}
        let image = req.files.image;
        const image_path = path.join(createUploadPath() , (Date.now() + path.extname(image.name)))
        req.body.image = image_path;
        let uploadPath = path.join(__dirname , ".." , ".." , image_path )
        console.log(uploadPath)
        image.mv(uploadPath , (err) => {
           if(err) throw {status : 400 , message : "تصویر بارگذاری نشد"}
           next();
        });
     } catch (error) {
         next()
     }
}

module.exports = {
    uploadFile
}
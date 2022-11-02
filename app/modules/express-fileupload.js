const expressFileUpload = require("express-fileupload");
const path = require("path");
const { createUploadPath } = require("./functions");
const uploadFile = async (req,res,next) => {
     try {
        if(req.file || Object.keys(req.files).length == 0 ) throw {status : 400, message : "تصویر شاخص پروژه را انتخاب نمایید"}
        let image = req.files.image;
        let type = path.extname(image.name);
        if(![".png",".jpeg",".jpg",".webp",".gif"].includes(type)) throw {status : 400, message : "فرمت تصویر صحیح نمی باشد"}
        const image_path = path.join(createUploadPath() , (Date.now() + type))
        req.body.image = image_path.substring(7);
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
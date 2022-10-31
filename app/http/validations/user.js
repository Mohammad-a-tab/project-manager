const { body } = require("express-validator");
const path = require("path")

function imageValidator() {
    return [
      body("image").custom((image , {req}) => {
       
        if(Object.keys(req.file) == 0 ) throw "لطفا یک تصویر را انتخاب کنید"
        const ext = path.extname(req.file.originalname);
        const exts = [".jpg" , ".png" , ".gif" , ".webp" , ".jpeg"];
        if(!exts.includes(ext)) throw "فرمت تصویر صحیح نمیباشد";
        const maxSize = 2* 1024 * 1024;
        if(req.file.size > maxSize) throw "حجم فایل نمیتواند بزرگتر از 2 مگابایت باشد"
        return true 

      })
    ]
}

module.exports = {
    imageValidator
}
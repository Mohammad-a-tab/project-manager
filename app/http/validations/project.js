const { body } = require("express-validator");

function createProjectValidator(){
    return [
        body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        body("text").notEmpty().isLength({min : 20}).withMessage("توضیحات پروژه نمیتواند خالی باشد و حداقل باید شامل 20 نویسه باشد ")
    ]

}

module.exports = {
    createProjectValidator
}
const {body} = require("express-validator");
const { UserModel } = require("../../models/user");

function registerValidator(){
    return [
        body("username").custom(async(value,ctx) => {
            if(value){
              const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
              if(usernameRegex.test(value)){
                const user = await UserModel.findOne({username : value})
                if(user) throw "نام کاربری تکراری می باشد"
                return true
              }
              throw "نام کاربری صحیح نمی باشد"
            }
            throw "نام کاربری نمی تواند خالی باشد"
        }),
        body("email").isEmail().withMessage("ایمیل وارد شده صحیح نمی باشد")
        .custom(async email => {
            const user = await UserModel.findOne({email})
            if(user) throw "ایمیل تکراری می باشد"
            return true
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل وارد شده صحیح نمی باشد")
        .custom(async mobile => {
            const user = await UserModel.findOne({mobile})
            if(user) throw "شماره موبایل تکراری می باشد"
            return true
        }),
        body("password")
        .custom((value,ctx) => {
            if(!value) throw "رمز عبور نمیتواند خالی باشد"
            if(value !== ctx?.req?.body?.confirm_password) throw "رمز عبور با تکرار آن همسان نیست"
            return true
        })
    ]
}

module.exports = {
    registerValidator
}
const {body, param} = require("express-validator")
const { TeamModel } = require("../../models/team");
const { UserModel } = require("../../models/user");
function createTeamValidator(){
    return[
        body("name").isLength({min : 5}).withMessage("نام تیم نمیتواند کمتر از 5 نویسه باشد"),
        body("descriptaion").notEmpty().withMessage(" بخش توضیحات نمیتواند خالی باشد"),
        body("username").custom((async username => {
            const usernameRegaxp = /^[a-z]+[a-z0-9\_\.]{3,}$/gim;
            if(usernameRegaxp.test(username)){
                const team = await TeamModel.findOne({username});
                if(team) throw "این نام کاربری قبلا توسط تیم دیگری استفاده شده است";
                return true
            }
            throw "نام کاربری را به طور صحیح وارد کنید"
        }))

    ]
}



module.exports = {
    createTeamValidator
}
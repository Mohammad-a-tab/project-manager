const { UserModel } = require("../../models/user");
const { hashString } = require("../../modules/functions");

class AuthController{
   async register(req,res,next){
       try {
        const {username,email,mobile,password} = req.body;
        const hash_password = hashString(password)
        const user =await UserModel.create({username,mobile,email,password : hash_password})
        .catch(err => {
          if(err?.code ==11000){
            throw {status : 400,message : "نام کاربری قبلا در سیستم ثبت شده است"}
          }
        })
        return res.json(user)
        
       } catch (error) {
           next(error)
       }
    }
    login(){

    }
    resetPassword(){

    }
}

module.exports = {
    AuthController : new AuthController()
}
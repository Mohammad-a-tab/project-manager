const { UserController } = require("../http/controllers/user.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkerrors");
const { imageValidator } = require("../http/validations/user");
const { upload_multer } = require("../modules/multer");

const router = require("express").Router();

router.get("/profile" , checkLogin,UserController.getProfile)
router.post("/profile" , checkLogin,UserController.editProfile)
router.get("/requests" , checkLogin,UserController.getAllRequests)
router.get("/requests/:status" , checkLogin,UserController.getRequestsByStatus)
router.post("/profile-image" , upload_multer.single("image"),
imageValidator(),expressValidatorMapper, checkLogin , UserController.uploadProfileImage)
module.exports = {
    userRoutes : router
}
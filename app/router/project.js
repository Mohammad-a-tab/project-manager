const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkerrors");
const { createProjectValidator } = require("../http/validations/project");
const expressFileUpload = require("express-fileupload");
const { uploadFile } = require("../modules/express-fileupload");
const { mongoIDValidator } = require("../http/validations/public");

const router = require("express").Router();

router.post("/create" , expressFileUpload(), checkLogin, uploadFile, createProjectValidator(), expressValidatorMapper , ProjectController.createProject)
router.post("/list" , checkLogin, ProjectController.getAllProject)
router.post("/:id" , checkLogin, mongoIDValidator(), expressValidatorMapper , ProjectController.getProjectByID)
router.post("/remove/:id" , checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject)
router.post("/edit/:id" , checkLogin, mongoIDValidator(), expressValidatorMapper , ProjectController.updateProject)


module.exports = {
    projectRoutes : router
}
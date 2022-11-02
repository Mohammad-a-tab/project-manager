const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkerrors");
const { createProjectValidator } = require("../http/validations/project");
const expressFileUpload = require("express-fileupload");
const { uploadFile } = require("../modules/express-fileupload");
const { mongoIDValidator } = require("../http/validations/public");

const router = require("express").Router();

router.post("/create" , expressFileUpload(), checkLogin, uploadFile, createProjectValidator(), expressValidatorMapper , ProjectController.createProject)
router.get("/list" , checkLogin, ProjectController.getAllProject)
router.get("/:id" , checkLogin, mongoIDValidator(), expressValidatorMapper , ProjectController.getProjectByID)
router.delete("/remove/:id" , checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject)
router.put("/edit/:id" , checkLogin, mongoIDValidator(), createProjectValidator(), expressValidatorMapper , ProjectController.updateProject)
router.patch("/edit-projectImage/:id" , expressFileUpload(), checkLogin, uploadFile, mongoIDValidator(), expressValidatorMapper , ProjectController.updateProjectImage)


module.exports = {
    projectRoutes : router
}
const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkerrors");
const { createProjectValidator } = require("../http/validations/project");

const router = require("express").Router();

router.post("/create" , checkLogin, createProjectValidator(), expressValidatorMapper , ProjectController.createProject)

module.exports = {
    projectRoutes : router
}
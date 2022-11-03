const { TeamController } = require("../http/controllers/team.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { createTeamValidator } = require("../http/validations/team");
const { expressValidatorMapper } = require("../http/middlewares/checkerrors");

const router = require("express").Router();

router.post("/create" , checkLogin , createTeamValidator(), expressValidatorMapper ,TeamController.createTeam)
router.get("/list" , checkLogin , TeamController.getListOfTeam)

module.exports = {
    teamRoutes : router
}
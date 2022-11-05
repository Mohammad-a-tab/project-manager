const { TeamController } = require("../http/controllers/team.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { createTeamValidator } = require("../http/validations/team");
const { expressValidatorMapper } = require("../http/middlewares/checkerrors");
const { mongoIDValidator } = require("../http/validations/public");

const router = require("express").Router();

router.post("/create" , checkLogin , createTeamValidator(), expressValidatorMapper ,TeamController.createTeam)
router.get("/list" , checkLogin , TeamController.getListOfTeam)
router.get("/me" , checkLogin , TeamController.getMyTeams)
router.put("/update/:teamID" , checkLogin , TeamController.updateTeam)
router.get("/invite/:teamID/:username" , checkLogin , TeamController.inviteUserToTeam)
router.get("/:id" , checkLogin , mongoIDValidator() , expressValidatorMapper, TeamController.getTeamByID)
router.delete("/remove/:id" , checkLogin , mongoIDValidator() , expressValidatorMapper, TeamController.removeTeamBID)

module.exports = {
    teamRoutes : router
}
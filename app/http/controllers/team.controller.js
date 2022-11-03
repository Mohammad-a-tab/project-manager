const { TeamModel } = require("../../models/team");

class TeamController{
    async createTeam(req,res,next) {
        try {
            const {name , descriptaion , username} = req.body;
            const owner = req.user._id;
            const team = await TeamModel.create({name,descriptaion,owner,username});
            if(!team) throw {status : 500, message : "در ایجاد تیم مشکلی بوجود آمده لطفا دوباره تلاش کنید"}
            return res.status(201).json({
                status : 201,
                success : true,
                message : "ایجاد تیم با موفقیت انجام شد"
            })
        } catch (error) {
             next(error)
        }

    }
    async getListOfTeam(req,res,next){
        try {
            const teams = await TeamModel.find({});
            return res.status(200).json({
                status : 200,
                success : true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }
    inviteUserToTeam(){

    }
    removeTeamBID(){

    }
    updateTeam(){

    }
    removeUserFromTeam(){
        
    }
}

module.exports = {
    TeamController : new TeamController()
}
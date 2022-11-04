const autoBind = require("auto-bind");
const { TeamModel } = require("../../models/team");
const { UserModel } = require("../../models/user");

class TeamController{
    constructor(){
        autoBind(this)
    }
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
    async getTeamByID(req,res,next){
        try {
            const teamID = req.params.id;
            const team = await TeamModel.findById(teamID);
            if(!team) throw {status : 400, message : "تیمی یافت نشد"}
            return res.status(200).json({
                status : 200,
                success : true,
                team
            });
        } catch (error) {
             next(error)
        }
    }
    async getMyTeams(req,res,next){
        try {
            const userID = req.user._id;
            const teams = await TeamModel.find({
                $or : [
                    {owner : userID},
                    {users : userID}
                ]
            });
            return res.status(200).json({
                status : 200,
                success : true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }
    async findUserInTeam(teamID,userID){
        const result = await TeamModel.findOne({$or : [{owner : userID}, {users : userID}] , _id : teamID});
        return !!result
    }
    async inviteUserToTeam(req,res,next){
        try {
            const userID = req.user._id;
            const {username , teamID} = req.params;
            const team = await this.findUserInTeam(teamID,userID)
            if(!team) throw {status : 400, message : "تیمی جهت دعوت کردن افراد یافت نشد"}
            const user = await UserModel.findOne({username});
            if(!user) throw {status : 400, message : "کاربر مورد نظر جهت دعوت به تیم یافت نشد"}
            const userivited = await this.findUserInTeam(teamID,user._id)
            if(userivited) throw {status : 400, message : "کاربر مورد نظر قبلا به تیم دعوت شده است"}
            const request = {
                caller : req.user?.username,
                requestDate : new Date(),
                teamID,
                status : "pending"
            }
            const updateUserResult = await UserModel.updateOne({username},{
                $push : {inviteRequests : request}
            });
            if(updateUserResult.modifiedCount == 0) throw {status : 500,message : "عملیات دعوت انجام نشد"};
            return res.status(200).json({
                status : 200,
                success : true,
                message : "عملیات با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async removeTeamBID(req,res,next){
         try {
            const teamID = req.params.id;
            const team = await TeamModel.findById(teamID);
            if(!team) throw {status : 400, message : "تیمی یافت نشد"}
            const result = await TeamModel.deleteOne({_id : teamID});
            if(result.deletedCount == 0) throw {status : 500, message : "حذف تیم انجام نشد لطفا مجددا تلاش کنید"}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "تیم مورد نظر با موفقیت حذف شد"
            })
            
         } catch (error) {
            next(error)
         }
    }
    updateTeam(){

    }
    removeUserFromTeam(){
        
    }
}

module.exports = {
    TeamController : new TeamController()
}
const { ProjectModel } = require("../../models/project");
const autoBind = require("auto-bind");
const { createlinkForFiles } = require("../../modules/functions");

class ProjectController{
    constructor(){
        autoBind(this)
    }
   async createProject(req,res,next){
            try {
                const {text , title , image, tags} = req.body;
                const owner = req.user._id;
                const result = await ProjectModel.create({title,text,owner,image , tags})
                if(!result) throw {status : 400 , message : "ایجاد پروژه با مشکل مواجه شد"}
                return res.status(201).json({
                    status : 201,
                    success : true,
                    message : "ایجاد پروژه با موفقیت ایجاد شد"
                })
            } catch (error) {
                next(error)
            }
    }
    async updateProject(req,res,next){
        try {
            let data = {...req.body};
            const projectID = req.params.id; 
            const owner = req.user._id;
            const project = await this.findProject(projectID,owner);
            let fields = ["title","text","tags"]
            let badValues = [""," ",NaN,null,undefined,0,-1,[],{}];
            Object.entries(data).forEach(([key,value]) => {
               if(!fields.includes(key)) delete data[key]
               if(badValues.includes(value)) delete data[key]
               if(key == "tags" && (data["tags"].constructor === Array)){
                data["tags"] = data["tags"].filter(val => {
                    if(![""," ",NaN,null,undefined,0,-1,[],{}].includes(val)) return val
                });
                if(data["tags"].length == 0 ) delete data["tags"]
               }
            })
            const result =  await ProjectModel.updateOne({_id : projectID},{$set : data})
            if(result.modifiedCount > 0){
                return res.status(200).json({
                    status : 200,
                    success : true,
                    message : "بروزرسانی با موفقیت انجام شد"
                })
            }
            throw {status : 400,message : "بروزرسانی انجام نشد"}


        } catch (error) {
            next(error)
        }

    }
    async updateProjectImage(req,res,next){
        try {
            const {image} = req.body;
            const projectID = req.params.id;
            const owner = req.user._id;
            await this.findProject(projectID,owner)
            const updateImageResult = await ProjectModel.updateOne({_id : projectID} , {$set : {image}});
            if(updateImageResult.modifiedCount == 0) throw {status : 400, message : "بروزرسانی انجام نشد"}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "بروزرسانی با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllProject(req,res,next){
        try {
            const owner = req.user._id;
            const projects = await ProjectModel.find({owner});
            for (const project of projects) {
                
                project.image = createlinkForFiles(project.image,req)
            }
            return res.status(200).json({
                status : 200,
                success : true,
                projects
            })
        } catch (error) {
            next(error)
        }

    }
    async findProject(projectID , owner){

        const project = await ProjectModel.findOne({owner , _id : projectID});
        if(!project) throw {status : 400, message : "پروژه ای یافت نشد"}
        return project
    }
    async getProjectByID(req,res,next){
       try {
        const owner = req.user._id;
        const projectID = req.params.id;
        const project = await this.findProject(projectID,owner);
        project.image = createlinkForFiles(project.image,req)
        return res.status(200).json({
            status : 200,
            success : true,
            project
        })
       } catch (error) {
          next(error)
       }

    }
    async removeProject(req,res,next){
       try {
            const owner = req.user._id;
            const projectID = req.params.id;
            await this.findProject(projectID,owner);
            const deleteProjectResult = await ProjectModel.deleteOne({_id : projectID});
            if(deleteProjectResult.deletedCount == 0) throw {status : 400, message : "پروژه حذف نشد"}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "پروژه با موفقیت حذف شد"
            })
       } catch (error) {
          next(error)
       }

    }
    getAllProjectOfTeam(){

    }
    getProjectOfUser(){

    }
   
  
}

module.exports = {
    ProjectController : new ProjectController()
}
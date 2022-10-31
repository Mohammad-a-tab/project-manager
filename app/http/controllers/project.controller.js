const { ProjectModel } = require("../../models/project");

class ProjectController{
   async createProject(req,res,next){
            try {
                const {text , title} = req.body;
                const owner = req.user._id;
                const result = await ProjectModel.create({title,text,owner})
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
    getAllProject(){

    }
    getProjectByID(){

    }
    getAllProjectOfTeam(){

    }
    getProjectOfUser(){

    }
    updateProject(){

    }
    removeProject(){

    }
}

module.exports = {
    ProjectController : new ProjectController()
}
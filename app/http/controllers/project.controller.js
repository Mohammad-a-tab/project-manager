class ProjectController{
    createProject(req,res,next){
            try {
                const {text , title} = req.body;
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
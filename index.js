const Application = require("./app/server");
const DB_URL = "mongodb://localhost:27017/ProjectManagerDB";
require("dotenv").config(); 
new Application(3300,DB_URL)
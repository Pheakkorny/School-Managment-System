//import from controller
const { validate_token } = require("../config/service");
const {getList,create,update,remove,getOne} = require("../controller/teacher.controller");
// teacher.route.js

const teacher = (app) => {
    app.get("/node2-api/teacher",validate_token(),getList); // query
    app.get("/node2-api/teacher/:Id",validate_token(),getOne);// params
    app.post("/node2-api/teacher/",validate_token(),create);
    app.put("/node2-api/teacher/",validate_token(),update);
    app.delete("/node2-api/teacher/:Id",validate_token(),remove);

};

module.exports = {
    teacher
};

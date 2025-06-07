//import from controller
const { validate_token } = require("../config/service");
const {getList,create,update,remove,getOne} = require("../controller/classroom.controller");
// classroom.route.js

const classroom = (app) => {
    app.get("/node2-api/classroom",validate_token() ,getList); // query
    app.get("/node2-api/classroom/:Id",validate_token(),getOne);// params
    app.post("/node2-api/classroom/",validate_token(),create);
    app.put("/node2-api/classroom/",validate_token(),update);
    app.delete("/node2-api/classroom/:Id",validate_token(),remove);

};

module.exports = {
    classroom
};

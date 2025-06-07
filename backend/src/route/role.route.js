//import from controller
const { validate_token } = require("../config/service");
const {getList,getOne,create,update,remove} = require("../controller/role.controller");
// teacher.route.js

const role = (app) => {
    app.get("/node2-api/role", validate_token(),getList); // query
    app.get("/node2-api/role/:id", validate_token(),getOne);// params
    app.post("/node2-api/role", validate_token(),create);
    app.put("/node2-api/role", validate_token(),update);
    app.delete("/node2-api/role/:id", validate_token() ,remove);
}

module.exports = {
    role
}
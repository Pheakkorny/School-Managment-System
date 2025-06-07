//import from controller
const {getList,login,getOne,create,update,remove, refresh_token} = require("../controller/user.controller");
const {validate_token} = require("../config/service");
// user.route.js

const user = (app) => {
    app.get("/node2-api/user",validate_token(), getList); // query
    app.post("/node2-api/user/login",login);
    app.get("/node2-api/user/:id",validate_token() ,getOne);// params
    app.post("/node2-api/user",validate_token(),create);
    app.put("/node2-api/user",validate_token(),update);
    app.delete("/node2-api/user/:id", validate_token() ,remove);
    app.post("/node2-api/user/refresh_token", refresh_token);
}

module.exports = {
    user
}
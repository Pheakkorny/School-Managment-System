//import from controller
const { validate_token } = require("../config/service");
const {getList,getOne,create,update,remove} = require("../controller/category.controller");
// teacher.route.js

const category = (app) => {
    app.get("/node2-api/category",validate_token(),getList); // query
    app.get("/node2-api/category/:id",validate_token(),getOne);// params
    app.post("/node2-api/category",validate_token(),create);
    app.put("/node2-api/category",validate_token(),update);
    app.delete("/node2-api/category/:id",validate_token(),remove);
}

module.exports = {
    category
}
//import from controller
const { validate_token } = require("../config/service");
const {getList,create,update,remove,getOne} = require("../controller/course.controller");
// course.route.js

const course = (app) => {
    app.get("/node2-api/course",validate_token() ,getList); // query
    app.get("/node2-api/course/:Id",validate_token(),getOne);// params
    app.post("/node2-api/course/",validate_token(),create);
    app.put("/node2-api/course/",validate_token(),update);
    app.delete("/node2-api/course/:Id",validate_token(),remove);

};

module.exports = {
    course
};

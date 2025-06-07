//import from controller
const { validate_token } = require("../config/service");
const {getList,create,update,remove,getOne} = require("../controller/student.controller");
// student.route.js

const student = (app) => {
    app.get("/node2-api/student", validate_token(),getList); // query
    app.get("/node2-api/student/:Id", validate_token() ,getOne);// params
    app.post("/node2-api/student/", validate_token() ,create);
    app.put("/node2-api/student/", validate_token(),update);
    app.delete("/node2-api/student/:Id", validate_token(),remove);

};

module.exports = {
    student
};

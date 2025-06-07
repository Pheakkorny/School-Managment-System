const express = require("express");
// cors
const cors = require("cors");
// Call teacher.route 
const { teacher } = require("./src/route/teacher.route");
//call student
const {student} = require("./src/route/student.route");
// call category
const {category} = require("./src/route/category.route");
// call role
const {role} = require("./src/route/role.route");
// call user
const {user} = require("./src/route/user.route");
const {course} = require("./src/route/course.route");
const {classroom} = require("./src/route/classroom.route");
const app = express();
app.use(cors({origin:"*"})); // allow all interface
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Root route
app.get("/", (req, res) => {
    res.send("Hello Express in Node.js");
});

// Route for listing students
app.get("/node2-api/list_student", (req, res) => {
    res.send("You have requested list student");
});

// Register teacher routes
teacher(app);
// Register student route
student(app);
//
category(app);
// Teacher route is registered.
// You can similarly register other routes here (e.g., student, user)
role(app);
user(app);
course(app);
classroom(app);
// Start the server
const port = 5000;

// Your API routes and logic here...

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

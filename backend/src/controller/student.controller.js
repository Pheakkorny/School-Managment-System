const {logError, isEmptyOrNull} = require("../config/service");
const {Config} = require("../config/config");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getList = async (req,res) =>{ // http://localhost:8081/node2-api/student?page=23&name=dara
    try{
        var sql = "SELECT * FROM student";
        const [data] = await db.query(sql);
        res.json({
            list: data,
        });
    }catch(error){
        logError("student.getList",error,res);
    }
   
}
const getOne = async (req,res) => {
    try{
        var sql = "SELECT * FROM student WHERE Id = :Id";
        var param = {
            Id: req.params.Id,
        };
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("student.getOne",error,res);
    }
}
const create = async (req,res) =>{ 
    try{
        var { FirstName, LastName, Gender, Dob, Tel, Image, Email, Current_Address, Note, IsActive, CreateBy } = req.body;
        var error = {};
        if(isEmptyOrNull(FirstName)){
            error.FirstName = "FirstName Required!";
        }
        if(isEmptyOrNull(LastName)){
            error.LastName = "LastName Required!";
        }
        if(isEmptyOrNull(Tel)){
            error.Tel = "Tel Required!";
        }
        if(Object.keys(error).length>0){
            res.json({
                error: error,
            });
        }
        var param = {
            FirstName:FirstName,
            LastName:LastName,
            Gender:Gender,
            Dob:Dob,
            Tel:Tel,
            Image:Image,
            Email:Email,
            Current_Address:Current_Address,
            Note:Note,
            IsActive:IsActive,
            CreateBy: req.user_name,
        };
        const [finestudent] = await db.query("SELECT Id FROM student WHERE (Tel = :Tel OR Email = :Email)",param);
        if(finestudent.length > 0){
            res.json({
                error:{
                    account_exist : "Account Already Exist! Please try other!.",
                }
            });
        }
        var sql = "INSERT INTO student (FirstName, LastName, Gender, Dob, Tel, Image, Email, Current_Address, Note, IsActive, CreateBy)" + 
        "VALUES (:FirstName, :LastName, :Gender, :Dob, :Tel, :Image, :Email, :Current_Address, :Note, :IsActive, :CreateBy)";
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("student.create",error,res);
    }
}
const update = async (req,res) =>{
    try{
        var { Id, FirstName, LastName, Gender, Dob, Tel, Image, Email, Current_Address, Note, IsActive, CreateBy } = req.body;
        var error = {};
        if(isEmptyOrNull(Id)){
            error.Id = "Id Required!";
        }
        if(Object.keys(error).length>0){
            res.json({
                error: error,
            });
        }
        var param = {
            Id:Id,
            FirstName:FirstName,
            LastName:LastName,
            Gender:Gender,
            Dob:Dob,
            Tel:Tel,
            Image:Image,
            Email:Email,
            Current_Address:Current_Address,
            Note:Note,
            IsActive:IsActive,
            CreateBy: req.user_name
        };
        const [finestudent] = await db.query("SELECT Id FROM student WHERE (Tel = :Tel OR Email = :Email) AND Id != :Id ",param);
        if(finestudent.length > 0){
            res.json({
                error:{
                    account_exist : "Account Already Exist! Please try other!.",
                }
            });
        }
        var sql = "Update student SET FirstName = :FirstName, LastName = :LastName, Gender = :Gender, Dob = :Dob, Tel = :Tel, Image = :Image, " +
         "Email = :Email, Current_Address = :Current_Address, Note = :Note, IsActive = :IsActive, CreateBy = :CreateBy WHERE Id = :Id";
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("student.update",error,res);
    }
}
const remove = async (req,res) =>{
    try{
        var sql = "DELETE FROM student WHERE Id = Id:";
        var param = {
            Id: req.params.Id,
        };
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("student.remove",error,res);
    }
}

module.exports = {
    getList,
    create,
    update,
    remove,
    getOne
}
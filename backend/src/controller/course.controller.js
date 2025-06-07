const {logError, isEmptyOrNull} = require("../config/service");
const {Config} = require("../config/config");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getList = async (req,res) =>{ // http://localhost:8081/node2-api/course?page=23&name=dara
    try{
        var sql = "SELECT * FROM course";
        const [data] = await db.query(sql);
        res.json({
            list: data,
        });
    }catch(error){
        logError("course.getList",error,res);
    }
   
}
const getOne = async (req,res) => {
    try{
        var sql = "SELECT * FROM course WHERE Id = :Id";
        var param = {
            Id: req.params.Id,
        };
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("course.getOne",error,res);
    }
}
const create = async (req,res) =>{ 
    try{
        var { CategoryId, Name, Description, Image, TotalHour, Price, IsActive } = req.body;
        var error = {};
        if(isEmptyOrNull(CategoryId)){
            error.CategoryId = "CategoryId Required!";
        }
        if(isEmptyOrNull(Name)){
            error.Name = "Name Required!";
        }
        if(Object.keys(error).length>0){
            res.json({
                error: error,
            });
        }
        var param = {
            CategoryId:CategoryId,
            Name:Name,
            Description:Description,
            Image:Image,
            TotalHour:TotalHour,
            Price:Price,
            IsActive:IsActive,
        };
        const [finecourse] = await db.query("SELECT Id FROM course WHERE (Name = :Name)",param);
        if(finecourse.length > 0){
            res.json({
                error:{
                    account_exist : "Course Already Exist! Please try other!.",
                }
            });
        }
        var sql = "INSERT INTO course (CategoryId, Name, Description, Image, TotalHour, Price, IsActive)" + 
        "VALUES (:CategoryId, :Name, :Description, :Image, :TotalHour, :Price, :IsActive)";
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("course.create",error,res);
    }
}
const update = async (req,res) =>{
    try{
        var { Id, CategoryId, Name, Description, Image, TotalHour, Price, IsActive } = req.body;
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
            CategoryId:CategoryId,
            Name:Name,
            Description:Description,
            Image:Image,
            TotalHour:TotalHour,
            Price:Price,
            IsActive:IsActive,
        };
        var sql = "Update course SET CategoryId = :CategoryId, Name = :Name, Description = :Description, Image = :Image, TotalHour = :TotalHour, " +
         "Price = :Price, IsActive = :IsActive  WHERE Id = :Id";
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("course.update",error,res);
    }
}
const remove = async (req,res) =>{
    try{
        var sql = "DELETE FROM course WHERE Id = Id:";
        var param = {
            Id: req.params.Id,
        };
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("course.remove",error,res);
    }
}

module.exports = {
    getList,
    create,
    update,
    remove,
    getOne
}
const {logError, isEmptyOrNull} = require("../config/service");
const {Config} = require("../config/config");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getList = async (req,res) =>{ // http://localhost:8081/node2-api/classroom?page=23&name=dara
    try{
        var sql = "SELECT * FROM classroom";
        const [data] = await db.query(sql);
        res.json({
            list: data,
        });
    }catch(error){
        logError("classroom.getList",error,res);
    }
   
}
const getOne = async (req,res) => {
    try{
        var sql = "SELECT * FROM classroom WHERE Id = :Id";
        var param = {
            Id: req.params.Id,
        };
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("classroom.getOne",error,res);
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
        const [fineclassroom] = await db.query("SELECT Id FROM classroom WHERE (Name = :Name)",param);
        if(fineclassroom.length > 0){
            res.json({
                error:{
                    account_exist : "classroom Already Exist! Please try other!.",
                }
            });
        }
        var sql = "INSERT INTO classroom (CategoryId, Name, Description, Image, TotalHour, Price, IsActive)" + 
        "VALUES (:CategoryId, :Name, :Description, :Image, :TotalHour, :Price, :IsActive)";
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("classroom.create",error,res);
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
        var sql = "Update classroom SET CategoryId = :CategoryId, Name = :Name, Description = :Description, Image = :Image, TotalHour = :TotalHour, " +
         "Price = :Price, IsActive = :IsActive  WHERE Id = :Id";
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("classroom.update",error,res);
    }
}
const remove = async (req,res) =>{
    try{
        var sql = "DELETE FROM classroom WHERE Id = Id:";
        var param = {
            Id: req.params.Id,
        };
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("classroom.remove",error,res);
    }
}

module.exports = {
    getList,
    create,
    update,
    remove,
    getOne
}
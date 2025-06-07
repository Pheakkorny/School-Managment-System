const {logError, isEmptyOrNull} = require("../config/service");
const {Config} = require("../config/config");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getList = async (req,res) =>{ // http://localhost:8080/node2-api/teacher?page=23&name=dara
    var sqlTotal = "SELECT COUNT(Id) AS TotalRecords FROM teacher WHERE 1=1 ";
    const {page, txtSearch, fromDate, toDate, status,} = req.query;
    try{
        var sql = "SELECT * FROM teacher WHERE 1=1";
        var sqlWhere = "";
        sqlParm = {};
        if (!isEmptyOrNull(txtSearch)) {
            sqlWhere += " AND (FirstName LIKE :txtSearch OR LastName LIKE :txtSearch OR Tel LIKE :txtSearch)";
            sqlParm.txtSearch = "%" + txtSearch + "%";
        }
        if (!isEmptyOrNull(fromDate) && !isEmptyOrNull(toDate)) {
            sqlWhere += " AND CreateAt BETWEEN :fromDate AND :toDate";
            sqlParm.fromDate = fromDate;
            sqlParm.toDate = toDate;
        }
        if (!isEmptyOrNull(status)) {
            sqlWhere += " AND IsActive = :status";
            sqlParm.status = status;
        }
        const sqlOrder = " ORDER BY Id DESC";
        const pageSize = 5;
        const offset = (page - 1) * pageSize;
        const limit = ` LIMIT ${offset}, ${pageSize}`;
        const [data] = await db.query(sql + sqlWhere + sqlOrder + limit, sqlParm);
        var totalRecords = 0;
        if (page == 1){
            const [total] = await db.query(sqlTotal + sqlWhere, sqlParm);
            totalRecords = total[0].TotalRecords;
        }
        res.json({
            list: data,
            totalRecords: totalRecords,
        });
    }catch(error){
        logError("teacher.getList",error,res);
    }
};
const getOne = async (req,res) => {
    try{
        var sql = "SELECT * FROM teacher WHERE Id = :Id";
        var param = {
            Id: req.params.Id,
        };
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("teacher.getOne",error,res);
    }
}
const create = async (req,res) =>{ 
    try{
        var { FirstName, LastName, Gender = 1, Dob, Tel, Image, Email, Current_Address, Note, IsActive = 1, CreateBy } = req.body;
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
        const [fineTeacher] = await db.query("SELECT Id FROM teacher WHERE (Tel = :Tel OR Email = :Email) ",param);
        if(fineTeacher.length > 0){
            res.json({
                error:{
                    account_exist : "Account Already Exist! Please try other!.",
                }
            });
        }
        var sql = "INSERT INTO teacher (FirstName, LastName, Gender, Dob, Tel, Image, Email, Current_Address, Note, IsActive, CreateBy)" + 
        "VALUES (:FirstName, :LastName, :Gender, :Dob, :Tel, :Image, :Email, :Current_Address, :Note, :IsActive, :CreateBy)";
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("teacher.create",error,res);
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
        const [fineTeacher] = await db.query("SELECT Id FROM teacher WHERE (Tel = :Tel OR Email = :Email) AND Id != :Id ",param);
        if(fineTeacher.length > 0){
            res.json({
                error:{
                    account_exist : "Duplicate Tel or Email with another account.",
                }
            });
            return;
        }
        var sql = "Update teacher SET FirstName = :FirstName, LastName = :LastName, Gender = :Gender, Dob = :Dob, Tel = :Tel, Image = :Image, " +
         "Email = :Email, Current_Address = :Current_Address, Note = :Note, IsActive = :IsActive, CreateBy = :CreateBy WHERE Id = :Id";
        const [data] = await db.query(sql,param);
        res.json({
            list: data,
        });
    }catch(error){
        logError("teacher.update",error,res);
    }
}
const remove = async (req,res) =>{
    try{
        var sql = "DELETE FROM teacher WHERE Id = :Id";
        var param = {
            Id: req.params.Id,
        };
        const [data] = await db.query(sql,param);
        res.json({
            message: "Remove Success",
            list: data,
        });
    }catch(error){
        logError("teacher.remove",error,res);
    }
}

module.exports = {
    getList,
    create,
    update,
    remove,
    getOne
}
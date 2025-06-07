const db = require("../config/db");
const {logError} = require("../config/service");
const getList = async (req,res) =>{
    try{
        const [data] = await db.query("SELECT * FROM role;");
        res.json({
        list: data,
        // show who is request this
        user_that_try_req: req.user
    });
    }catch(error){
        logError("role.getList", error, res);
    }
};
const getOne = async (req,res) =>{
    try{
        var param = {
            Id : req.params.id,
        };
        console.log(req.params);
        const [data] = await db.query("SELECT * FROM role WHERE Id = :Id", param);
        res.json({
            list: data,
        });
        console.log(data);
    } catch (error) {
        logError("role.getOne", error, res);
    } 
}
const create = async (req,res) =>{
    try{
        var param = {
            Name: req.body.Name,
            Code: req.body.Code,
        };
        const [data] = await db.query("INSERT INTO role(Name, Code) VALUES (:Name,:Code);", param);
        res.json({
            list: data,
        });

    } catch(error){
        logError("role.create", error, res);
    }
}
const update = async (req,res) =>{
    try{
        var param = {
            Id: req.body.Id,
            Name: req.body.Name,
            Code: req.body.Code,
        };
        const [data] = await db.query("UPDATE role SET Name = :Name, Code = :Code WHERE Id = :Id;", param);
        res.json({
            list: data,
        });

    } catch(error){
        logError("role.update", error, res);
    }
}
const remove = async (req,res) =>{
    try{
        var param = {
            Id: req.params.id,
        };
        const [data] = await db.query("DELETE FROM role WHERE Id = :Id;", param);
        res.json({
            list: data,
        });

    } catch(error){
        logError("role.remove", error, res);
    }
}
module.exports = {
    getList,
    getOne,
    create,
    update,
    remove
}
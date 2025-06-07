const {Config} = require("./config");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const moment = require("moment");
const { error } = require("console");
// npm insall moment
//create folder logs
const logError = async (controller, message, res) => {
    try {
        const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
        const path = "./logs/" + controller + ".txt";
        const logMessage = "[" + timestamp + "] " + message + "\n\n";
        await fs.appendFile(path, logMessage);
    } catch (error) {
        console.error("Error writing to logfile:", error);
    }

    // ✅ Prevent double-response crash
    if (!res.headersSent) {
        res.status(500).send("Internal Server Error!");
    }
};

const isEmptyOrNull = (value) => {
    if(value === "" || value === null || value === undefined){
        return true;
    }
    return false;
}
//jwt
const validate_token = () => { //call in middleware like routes
    return (req, res, next) => {
        const authorization = req.headers.authorization; // request token from client
        let token_from_client = null;

        if (authorization != null && authorization != "") {
            token_from_client = authorization.split(" "); // authorization : "Bearer kawhfwefjwufwfffuffjjff"
            token_from_client = token_from_client[1]; //get only access_token
        }
        if(token_from_client == null) {
            res.status(401).json({ 
                message: "Unauthorized",
            });
        } else {
            jwt.verify(token_from_client, Config.ACCESS_TOKEN_KEY, (error, result) => {
            if (error) {
                console.error("Token verification error:", error); // Log the specific error
                res.status(401).json({
                    message: "Unauthorized",
                    error: error,
                });
            } else {
                req.user = result.data; // Attach user data to request
                req.user_id = result.data.Id;
                req.user_name = result.data.User_name
                next();
            }
        });
            
        }       
    };
};

module.exports = {
    logError,
    isEmptyOrNull,
    validate_token,
};
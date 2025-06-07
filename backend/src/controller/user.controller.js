const {Config} = require("../config/config");
const db = require("../config/db");
const {logError, isEmptyOrNull} = require("../config/service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get the list of users
const getList = async (req, res) => {
    try {
        var sql = "SELECT user.*, role.Name as RoleName FROM user LEFT JOIN role ON (user.RoleId = role.Id);";
        const [list] = await db.query(sql);
        res.json({
            list: list,
            user_that_try_req: req.user,
        });
    } catch (error) {
        logError("user.getList", error, res);
    }
};

// Get a single user
const getOne = async (req, res) => {
    try {
        var paramater = { Id: req.params.id };
        const [list] = await db.query("SELECT * FROM user WHERE Id = :Id", paramater);
        res.json({
            list: list,
        });
    } catch (error) {
        logError("user.getOne", error, res);
    }
};

// Create a new user
const create = async (req, res) => {
    try {
        var Username = req.body.Username;
        var Password = req.body.Password;
        var RoleId = req.body.RoleId;
        var error = {};

        if (isEmptyOrNull(Username)) {
            error.Username = "Username required!";
        }
        if (isEmptyOrNull(Password)) {
            error.Password = "Password required!";
        }

        // If there are validation errors, return them
        if (Object.keys(error).length > 0) {
            return res.json({ error: error });
        }

        // Check if the username already exists
        const [existingUser] = await db.query("SELECT * FROM user WHERE Username = :Username", { Username });
        if (existingUser.length > 0) {
            return res.json({ error: { Username: "Username already taken!" } });
        }

        // Hash the password before saving
        var hashPassword = bcrypt.hashSync(Password, 10);
        var paramater = { Username, Password: hashPassword, RoleId };

        // Insert the new user
        const [list] = await db.query("INSERT INTO user (Username, Password, RoleId) VALUES (:Username, :Password, :RoleId)", paramater);
        res.json({ list: list });
    } catch (error) {
        logError("user.create", error, res);
    }
};

// Update an existing user
const update = async (req, res) => {
    try {
        var { Username, Password, RoleId, Id } = req.body;
        var error = {};

        if (isEmptyOrNull(Id)) error.Id = "Id required!";
        if (isEmptyOrNull(Username)) error.Username = "Username required!";
        if (isEmptyOrNull(Password)) error.Password = "Password required!";
        if (isEmptyOrNull(RoleId)) error.RoleId = "RoleId required!";

        if (Object.keys(error).length > 0) {
            return res.json({ error: error });
        }

        // Hash the password before updating
        var hashPassword = bcrypt.hashSync(Password, 10);
        var paramater = { Id, Username, Password: hashPassword, RoleId };

        // Check if the username already exists
        const [existingUser] = await db.query("SELECT Id FROM user WHERE Username = :Username AND Id != :Id", paramater);
        if (existingUser.length > 0) {
            return res.json({ error: { Username: "Username already exists!" } });
        }

        // Update the user record
        const [list] = await db.query("UPDATE user SET Username = :Username, Password = :Password, RoleId = :RoleId WHERE Id = :Id", paramater);
        res.json({ list: list });
    } catch (error) {
        logError("user.update", error, res);
    }
};

// Remove a user
const remove = async (req, res) => {
    try {
        var id = req.params.id;
        var error = {};

        if (isEmptyOrNull(id)) error.id = "Id required!";
        if (Object.keys(error).length > 0) {
            return res.json({ error: error });
        }

        var paramater = { id };
        const [list] = await db.query("DELETE FROM user WHERE id = :id", paramater);
        res.json({ message: "User deleted successfully!" });
    } catch (error) {
        logError("user.remove", error, res);
    }
};

// Login user
const login = async (req, res) => {
    try {
        var Username = req.body.Username;
        var Password = req.body.Password;
        var error = {};

        if (isEmptyOrNull(Username)) {
            error.Username = "Username required!";
        }
        if (isEmptyOrNull(Password)) {
            error.Password = "Password required!";
        }

        // If there are validation errors, return them
        if (Object.keys(error).length > 0) {
            return res.json({ error: error });
        }

        // Trim spaces from username and password for consistent comparison
        Username = Username.trim();
        Password = Password.trim();

        // Check if the user exists
        const [data] = await db.query("SELECT * FROM user WHERE Username = :Username", { Username });

        if (data.length > 0) {
            var user = data[0];

            // Log the stored password hash and entered password for debugging
            console.log("Stored Password Hash: ", user.Password);
            console.log("Entered Password: ", Password);

            // Use bcrypt.compare() for asynchronous comparison
            bcrypt.compare(Password, user.Password, async (err, isCorrectPassword) => {
                if (err) {
                    console.error("Error comparing passwords", err);
                    return res.status(500).json({ error: "Server error during password comparison" });
                }

                if (isCorrectPassword) {
                    // Log success
                    console.log("Password match successful!");

                    // Remove password from the response object
                    delete user.Password;

                    // Generate JWT tokens
                    var access_token = await jwt.sign({ data: user }, Config.ACCESS_TOKEN_KEY, { expiresIn: "60s" });
                    var refresh_token = await jwt.sign({ data: user }, Config.REFRESH_TOKEN_KEY);

                    return res.json({
                        message: "Login Success",
                        user: user,
                        access_token: access_token,
                        refresh_token: refresh_token,
                    });
                } else {
                    // Log failure
                    console.log("Password mismatch!");
                    return res.json({
                        error: {
                            Password: "Incorrect password!"
                        },
                    });
                }
            });
        } else {
            return res.json({
                error: {
                    Username: "Username doesn't exist!"
                },
            });
        }
    } catch (error) {
        logError("user.login", error, res);
    }
};


// Refresh Token
const refresh_token = async (req, res) => {
    try {
        const { refresh_token } = req.body;

        jwt.verify(refresh_token, Config.REFRESH_TOKEN_KEY, async (error, result) => {
            if (error) {
                res.status(401).json({
                    message: "Unauthorized",
                    error: error,
                });
            } else {
                const user_from_token = result.data;
                const [data] = await db.query("SELECT * FROM user WHERE Id = :Id", { Id: user_from_token.Id });
                const user = data[0];
                delete user.Password;

                // Generate new tokens
                const new_access_token = await jwt.sign({ data: user }, Config.ACCESS_TOKEN_KEY, { expiresIn: "1d" });
                const new_refresh_token = await jwt.sign({ data: user }, Config.REFRESH_TOKEN_KEY);

                res.json({
                    message: "Refresh token success",
                    user: user,
                    access_token: new_access_token,
                    refresh_token: new_refresh_token,
                });
            }
        });
    } catch (error) {
        logError("user.refresh_token", error, res);
    }
};

module.exports = {
    getList,
    getOne,
    create,
    update,
    remove,
    login,
    refresh_token,
};

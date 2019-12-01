const express = require("express");
const path = require("path");
const { CheckUser } = require("../model/dbManager")
const { UpdateUser } = require("../model/dbManager");
const {
    UPDATE_USER,
    USER_NOT_FOUND,
    PASSWORD_NOT_MATCH
  } = require("../model/config");

const router = express.Router();

router.get("/edit", (req, res) => {
    res.sendFile(path.join(__dirname, "../" ,"views", "update.html"));
});

router.post("/edit", (req,res) => {
    let formData = {
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        repassword: req.body.repassword,
        oldLogin: req.body.oldLogin
    }
    let {login, email, password, repassword, oldLogin } = formData;
    if (password == repassword){
        CheckUser(login, function(result){
            if (result == "true"){
                // console.log("true");
                UpdateUser(login, email, password, oldLogin, function(result){
                    if (result == "true"){
                        // let msg = "User update!";
                        // res.send(msg);
                        res.send(UPDATE_USER);
                    } else{
                        // let msg = "User not update!";
                        // res.send(msg);
                        res.send(UNKNOWN_ERROR);
                    }
                });
            }
            else{
                // let msg = "User does not exist!";
                // res.send (msg);
                res.send(USER_NOT_FOUND);
            }
        });
    }
    else{
        // console.log("Password not match!");
        res.send(PASSWORD_NOT_MATCH);
    }
});

module.exports = router;
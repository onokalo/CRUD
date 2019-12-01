const express = require("express");
const path = require("path");
const { CheckUser } = require("../model/dbManager")
const { UpdateUser } = require("../model/dbManager");

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
                console.log("true");
                UpdateUser(login, email, password, oldLogin, function(result){
                    if (result == "true"){
                        let msg = "User update!";
                        res.send(msg);
                    } else{
                        let msg = "User not update!";
                        res.send(msg);
                    }
                });
            }
            else{
                let msg = "User does not exist!";
                res.send (msg);
            }
        });
    }
    else{
        console.log("Password not match!");
    }
});

module.exports = router;
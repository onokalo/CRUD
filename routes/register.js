const express = require("express");
const path = require("path");
const { CheckUser } = require("../model/dbManager");
const { CreateUser } = require("../model/dbManager");
const { PASSWORD_NOT_MATCH, USER_EXIST } = require("../model/config");

const router = express.Router();

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../" ,"views", "register.html"));
});

router.post("/register", (req,res) => {
    //console.log(req.body);
    const formData = {
        username: req.body.login,
        email: req.body.email,
        password: req.body.password,
        repassword: req.body.repassword
    }

    // res.send(formData);
    // res.send("Ok");

    if (formData.password != formData.repassword) {
        // res.send("Password not match!");
        res.send(PASSWORD_NOT_MATCH);
      } else {
       
        CheckUser(formData.username, function(result) {
          if (result == "false"){
            CreateUser(formData, function(createResult){
              // console.log("Outside", createResult);
              res.send(`<h1>${createResult}</h1>`);
            })
          }
          else{
            // res.send("<h1>User exist. </h1>")
            res.send(USER_EXIST);
          }
          
        });
    }
  
});

module.exports = router;
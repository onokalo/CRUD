const express = require("express");
const path = require("path");    
const dbManager = require("../model/dbManager");

const router = express.Router();

router.get("/login", (req, res) => {
res.sendFile(path.join(__dirname, "../" ,"views", "login.html"));
});   //dlia zchutyvannia html storinku

router.post("/login", (req,res) => {
    const formData = {
        login: req.body.login,
        password: req.body.password
    }
    // console.log(formData);
    let sql = "SELECT login FROM users WHERE login LIKE \'" + formData.login + "\'";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            console.log(result);
            res.send(`<h2>Welcome, ${formData.login}</h2>`);
        }
    })
});

module.exports = router;
const express = require("express");
const path = require("path");
const { CheckUser } = require("../model/dbManager");
const { DeleteUser } = require("../model/dbManager");

const router = express.Router();

router.get("/delete", (req, res) => {
    res.sendFile(path.join(__dirname, "../" ,"views", "delete.html"));
});

// router.post("/delete", (req,res) => {
//     const formData = {
//         login: req.body.login
//     }

//     DeleteUser(formData, function(result){
//         res.send(result);
//     });
        
// });

router.post("/delete", (req,res) => {
    let formData = {
        login: req.body.login
    }
    CheckUser(formData.login, function(result){
        if (result === "true"){
            DeleteUser(formData.login, function(result){
                if (result == "true"){
                    let msg = "User Deleted!";
                    res.send(msg);
                }
               
            });
        }
        else{
            let msg = "User dous not exist!";
            res.send(msg);
        }
    })
})

module.exports = router;
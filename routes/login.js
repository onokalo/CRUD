const express = require("express");
const path = require("path");    

const router = express.Router();

router.get("/login", (req, res) => {
res.sendFile(path.join(__dirname, "../" ,"views", "login.html"));
});

router.post("/login", (req,res) => {
    
        let sql = "SELECT login FROM users";
        db.query(sql, (err, result) => {
            if (err){
                res.send(err);
            }
            else{
                
            }
        });

});

module.exports = router;
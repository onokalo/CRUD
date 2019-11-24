const mysql = require("mysql");

// MYSQL Server
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "company"
});

db.connect(err => {
    if (err) {
    throw err;
    console.log("Connection error => ", err);
    }
    console.log("Mysql server connected...");
});

CheckUser = (username, callback) => {
    let sql = "SELECT login FROM users WHERE login LIKE \'" + username + "\'";
    db.query(sql, (err, result) => {
        if (err) {
        } else if (result.length != 0) {
          console.log("true");
          return callback("true");
        } else {
          console.log("false");
          return callback("false");
        }
    });
}

// CheckUser(formData){
//     let sql = "SELECT login FROM users WHERE login LIKE \'" + formData.username + "\'";
//     db.query(sql, (err, result) => {
//         if (err){
//             return err;
//         }
//         else{
            
//             if (result.length == 0){
//             const sql = "INSERT INTO `users` SET ? " ;
//             const data = {
//                 login: formData.username,
//                 email: formData.email,
//                 password: formData.password
//             }    
//                 db.query(sql, data, (err, result) => {
//                     if (err){
//                         return err;
//                     }
//                     else{
//                         let msg = "<h2>User created!</h2";
//                         return msg;
//                     }
//                 })
//             }
//             else{
//                 let msg = "<h2>User exist!</h2>";
//                 return msg;
//             }
//         }
//     });
// }

module.exports = {
    CheckUser
};
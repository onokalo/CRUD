const mysql = require("mysql");
const { INCORRECT_LOGIN_OR_PASS } = require("./config");

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
        //   console.log("true");
          return callback("true");
        } else {
        //   console.log("false");
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

CreateUser = (formData, callback) => {
    const sql = "INSERT INTO `users` SET ? ";
    const data = {
      login: formData.username,
      email: formData.email,
      password: formData.password
    }
    db.query(sql, data, (err, result) => {
      if (err){
        throw err;
      }else{
        // console.log(result);
        return callback(CREATED_USER);
      }
    })
}

SignIn = (formData, callback) => {
    let sql = "SELECT login, password FROM users WHERE login LIKE \'" + formData.login + "\'" + "and password LiKE \'" + formData.password + "\'";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
            // console.log(err);
        }
        else if (result.length !=0) {
            // console.log(result);
            let res = `<h2>Welcome, ${formData.login}</h2>`;  
            return callback(res);
        }
        else{
            // let res = `<h2>Login or password incorrect.</h2>`;
            // res.send(INCORRECT_LOGIN_OR_PASS);
            return callback(INCORRECT_LOGIN_OR_PASS);
        }
    })
}

// DeleteUser = (formData, callback) => {
//     let sql = "SELECT login, password FROM users WHERE login LIKE \'" + formData.login + "\'";
//     db.query(sql, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         else if (result.length !=0) {
//             let sql = "DELETE FROM users WHERE login LIKE \'" + formData.login + "\'";
//             let res = `<h2>User ${formData.login} delete!</h2>`;  
//             db.query(sql, (err, result) => {
//                 if (err) {
//                     throw err;
//                     console.log(err);
//                 }
//                 else result;
//             });
//             return callback(res);
//         }
//         else{
//             let res = `<h2>Login no exist!</h2>`;
//             return callback(res);
//         }
//     })
// }

DeleteUser = (username, callback) =>{
    let sql = "DELETE FROM `users` WHERE login=\'" + username + "\'";
    db.query(sql, (err, result) => {
      if (err){
        throw err;
      } else if (result.length != 0) {
        return callback("true");
      } else {
        return callback("false");
      }
    })
}

UpdateUser = (login, email, password, oldLogin, callback) => {
    let sql = "UPDATE `users` SET ? WHERE login = '" + oldLogin + "'";
    let data = {
        login,
        email, 
        password
    };
    db.query(sql, data, (err,result) => {
        if (err){
            throw err;
        }
        else if (result.length != 0){
            return callback("true");
            // console.log("Result Ok = ", result);
        }
        else{
            // console.log("Result !Ok = ", result);
            return callback("false");
        }
    })
}

module.exports = {
    CheckUser,
    CreateUser,
    SignIn,
    DeleteUser,
    UpdateUser
};

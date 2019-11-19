const express = require("express");
const bodyParser = require("body-parser");

// Web Server
const app = express();
const PORT = 3000;

// Body-parser
app.use(bodyParser.urlencoded({extended: false}))


const homeRoute = require("./routes/home");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
app.use(homeRoute);
app.use(registerRoute);
app.use(loginRoute);

// app.get("/", (req, res) => {
// res.send("<h1>Server runnig...</h1>");
// });

app.listen(PORT, () => console.log("Server running on port ", PORT));

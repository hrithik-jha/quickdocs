const express       = require('express');
const app           = express();
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var Doc = require('./database');
var Auth = require('./auth');

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.send("You at the base.");
    });

    app.get("/login", (req, res) => {
        res.sendFile(__dirname + "/static/" + "login.html");
    });

    app.post("/login", (req, res) => {
        //console.log(req.body.name + " " + req.body.pass);
        var usern = req.body.usern;
        var passw = req.body.passw;
        var response = Auth.checkCreds(usern, passw, res);
        //res.send(response);
        //console.log(response);
        let sess = {
            user: usern,
        };
        //res.clearCookie('user');
        res.cookie("user", usern);
        console.log("Cookie creation done.");
        console.log(req.cookies);
        var cook = String(req.headers.cookie);
        console.log(cook.substring(0, 5));
        res.send();
    });

    app.get("/register", (req, res) => {
        res.sendFile(__dirname + "/static/" + "register.html");
    });

    app.post("/register", (req, res) => {
        //console.log(req.body.name + " " + req.body.pass);
        var usern = req.body.usern;
        var passw = req.body.passw;
        res.send(insertCreds(usern, passw));
    });

    app.get("/document", (req, res) => {
        res.sendFile(__dirname + "/static/" + "doc.html");
    });

    app.get("/logout", (req, res) => {
        res.send("Logged out successfully.");
    });

    app.post("/document", (req, res) => {
        var myData = new Doc(req.body);
        console.log(req.body, myData);
        myData.save()
        .then(item => { 
            res.send("Saved successfully");
        })
        .catch(err => {
            res.status(400).send("Unable to save file. Please try again.");
        });
    });

    app.get('/getuser', (req, res)=>{ 
        //shows all the cookies 
        res.send(req.cookies); 
        console.log(req.cookies);
    });

    app.get("/forgot", (req, res) => {
        res.send("Forgot password?");
    });
}

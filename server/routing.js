const express       = require('express');
const app           = express();
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser'); 
const path          = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'static')));

var Doc = require('./database');
var Auth = require('./auth');

function trimmedCookie(user) {
    if(user == undefined) {
        return '';
    }
    var pos = user.indexOf("user=");
    var userString = user.substring(pos + 5, user.length);
    return userString;
}

module.exports = function(app) {
    app.get("/", (req, res) => {
        if(trimmedCookie(req.headers.cookie)) {
            res.redirect('/document');
        }
        else {
            res.redirect('/login');
        }
    });

    app.get("/login", (req, res) => {
        res.sendFile(__dirname + "/static/" + "login.html");
    });

    app.post("/login", (req, res) => {
        //console.log(req.body.name + " " + req.body.pass);
        var usern = String(req.body.usern);
        var passw = String(req.body.passw);
        //var response = Auth.checkCreds(usern, passw);

        res.cookie("user", usern);
        console.log("Cookie creation done.");
        
        var cook = String(req.headers.cookie);
        Auth.checkCreds(usern, passw).then((value) => {
            console.log("From checking side: " + value);
            res.redirect('/document');
        });
        //console.log(status);
    });

    app.get("/register", (req, res) => {
        res.sendFile(__dirname + "/static/" + "register.html");
    });

    app.post("/register", (req, res) => {
        //console.log(req.body.name + " " + req.body.pass);
        var usern = req.body.usern;
        var passw = req.body.passw;
        res.send(Auth.insertCreds(usern, passw));
    });

    app.get("/colab", (req, res) => {
        res.sendFile(__dirname + "/static/" + "colab.html");
    });

    app.get("/document", (req, res) => {
        if(req.query.state) {
            res.sendFile(__dirname + "/static/" + "doc.html");
        }
        else {
            res.sendFile(__dirname + "/static/" + "files.html");
        }
    });

    app.get("/allDocs", (req, res) => {
        var cook = String(req.headers.cookie);
        var name = trimmedCookie(cook);
        console.log(req.query.user + ' ' + name);
        if(req.query.user == name) {
            Doc.find({usern: name}, function(err, users) {
                var userMap = {};
                users.forEach(function(user) {
                  userMap[user._id] = user;
                });
                res.send(userMap);  
            });
        }
        else {
            res.send("Login please.");
        }
    });

    app.get("/logout", (req, res) => {
        res.clearCookie("user");
        //res.send("Logged out successfully.");
        res.redirect('/login');
    });

    app.post("/document", (req, res) => {
        var doc = String(req.body.docs);
        var cook = req.headers.cookie;
        var user = trimmedCookie(cook);
        var timen = String(Date.now());
        console.log(req.body)
        var coll = {
            usern: user,
            docs: doc,
            time: timen,
        };
        
        var myData = new Doc(coll);
        console.log(req.body, myData);
        myData.save()
        .then(item => { 
            res.redirect('/document');
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

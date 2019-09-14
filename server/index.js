const express = require('express');       
const app = express();
const bodyParser = require('body-parser');

//Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./routing')(app);
//require('./cookie')(app);

const port = 8000;

app.listen(port, () => {
    console.log("Server listening on " + port + ". Alas, it's not over 9000.");
});
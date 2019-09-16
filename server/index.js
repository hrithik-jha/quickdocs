const express       = require('express');       
const app           = express();
const bodyParser    = require('body-parser');
const path          = require('path');
const socket        = require('socket.io');

//Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'static')));

require('./routing')(app);
//require('./cookie')(app);

const port = 8000;

var server = app.listen(port, () => {
    console.log("Server listening on " + port + ". Alas, it's not over 9000.");
});

var io = socket(server);
io.on('connection', function(socket){
    console.log('Socket is also listening.', socket.id);

    socket.on('update', function(data){
        io.sockets.emit('update', data);
    });
});


//Initiating Socket connection
var socket = io.connect('http://localhost:8000/');

//Getting content
var user = document.cookie;
var pos = user.indexOf("user=");
var userString = user.substring(pos + 5, user.length);
var doc = $('#doc').value,
    usern = userString;

var source = $('#doc');
//Emit Events
function emitChange(){
    console.log("Just been called to change.");
    socket.emit('update', {
        doc: "$('textarea').value",
        handle: usern
    });
    console.log("Emit MAX");
};

//Listening to events
socket.on('update', function(data){
    console.log("Catching emits.");
    $('textarea').value = data.doc;
    console.log(data.doc);
});
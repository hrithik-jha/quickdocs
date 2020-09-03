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
function emitChange() {
    var value = document.getElementById('doc').value;
    emission(usern, value);
}

function emission(usern, value){
    socket.emit('update', {
        doc: value,
        handle: usern
    });
    console.log("Emit MAX");
};

//Listening to events
socket.on('update', function(data){
    console.log("Catching emits.");
    //document.getElementById("doc").value += data.doc;
    console.log(data.doc);
});
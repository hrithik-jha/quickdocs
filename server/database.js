const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/quickdocs').then(() => {
    console.log("Connected to database.");
}).catch((err) => {
    console.log(err);
});
var docSchema = new mongoose.Schema ({
    usern: String,
    name: String,
    docs: String,
    time: String,
});

//var Doc = mongoose.model("Doc", docSchema);
//try with async await PS: Naveen Kumar

module.exports = mongoose.model("docs", docSchema); 

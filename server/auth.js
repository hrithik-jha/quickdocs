const request       = require('request');
const querystring   = require('querystring');

let currUser = "";

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

module.exports = { 
    insertCreds: function(user, pass) {
        var form = {
            user: user,
            pass: pass,
        };

        var formData = querystring.stringify(form);
        var contentLength = formData.length;

        var response;

        request({
            headers: {
              'Content-Length': contentLength,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: 'http://localhost:80/php-practice/dbInsert.php',
            body: formData,
            method: 'POST'
            }, function (err, res, body) {
            if(err) {
                console.log(err);
            }
            sleep(2000);
            response = body;
        });
        console.log("Checking the time " + response);
        return response;
    },

    checkCreds: function(user, pass) {
        var form = {
            user: user,
            pass: pass,
        };

        var formData = querystring.stringify(form);
        var contentLength = formData.length;

        let responseReq;

        request({
            headers: {
              'Content-Length': contentLength,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: 'http://localhost:80/php-practice/dbCheck.php',
            body: formData,
            method: 'POST'
            }, function (err, res, body) {
            if(err) {
                console.log(err);
            }
            console.log(body);
        });
    }
    //console.log("Epic games " + responseReq);
    //return responseReq;
}
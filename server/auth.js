const request       = require('request');
const querystring   = require('querystring');

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
            console.log(err);
            response = body;
        });

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
            responseReq = body;
            if(err) {
                console.log(err);
            }
        });
    }
    //console.log("Epic games " + responseReq);
    //return responseReq;
}
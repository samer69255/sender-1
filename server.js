var express = require('express');
var app = express();

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
    to: 'zaincashu@gmail.com',
    from: 'paypal-confirm@paypal-confirm.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);

app.get('/', function (req, res) {





    res.send('Hello World');
});

var server = app.listen(4000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
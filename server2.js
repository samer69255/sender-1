//===========

//==================

//==============
var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var run = false;
var n = 0;
var f = 0;
io.on('connection', function(socket){

    if (run == true)
    {
        socket.emit('disabled');
        console.log(run);
    }

    socket.on('disconnect',function () {
        console.log('user is disconnet')
    });

    socket.on('set',function (data) {
        var fs = require('fs');
        fs.writeFile('list.txt',data,function (err) {
            if (err) console.log(err);
            socket.emit('success');
        });
    });


    socket.on('start',function (user) {
        run = true;
        user = JSON.parse(user);
        socket.emit('disabled');
        var fs = require('fs');
        fs.readFile('list.txt',function (error,data) {

            data = data.toString();
             list = data.trim().split('\n');
            f = list.length;



             mailOptions = {
                from: user.from,
                to:null,
                subject: user.subject,
                html: user.code
            };

            sendemail(list[0]);

        });
    });




    console.log('user is connected');
});
server.listen(process.env.PORT||3000);
app.use(express.static('public'));

//================


//==================
app.get('/',function (req,res) {

    res.sendFile( __dirname + '/index.html');
});

//==============





var transport = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
        user: "apikey",
        pass: "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"
    }
});





function sendemail(to) {

    console.log(n);
    var data = {
        n:n+1,
        f:f,
        to:to
    }

    io.sockets.emit("status",JSON.stringify(data));

    mailOptions.to = to;
    console.log('sending to ' + JSON.stringify(mailOptions));

    transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            n++;
            if (n == f)
            {
                    console.log('success');
                    io.sockets.emit('endabled',n);
                    run = false;
                    n = 0;
                    f = 0;
            }
            else
            {
                sendemail(list[n]);

            }
        }
    });
}

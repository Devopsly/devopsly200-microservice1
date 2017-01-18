var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');

var ip = require("ip");
var thisAddress = ip.address();
var localAddress = ip.address();
console.log("IP address is ");
console.log(thisAddress);

var http = require('http');


var User;
var mongoDbUrl;
var mongoPort = process.env.DATABASE_PORT;
// var mongoPort=27017;

var starterServicePort = process.env.STARTER_SERVICE_PORT;
// var starterServicePort = 8000;

// Have to move this to local variable and call service 2 each time on greetuser
var finalGreeting = "Whatever";



var options = {
  host: 'myip.dnsomatic.com',
  path: '/'
};

var callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log("Internet address is " + str);
    thisAddress = str;
    mongoDbUrl = thisAddress + ":" + mongoPort;
    mongoose.connect(`mongodb://${mongoDbUrl}/userdb`);
    User = mongoose.model('User', { name: String });

    var options1= {
        host: thisAddress, //'localhost' 
        path: '/',
        port: starterServicePort
    };
    var callback1 = function(response1) {

       var greeting = '';

        //another chunk of data has been recieved, so append it to `str`
        response1.on('data', function (chunk1) {
                greeting += chunk1;
        });

        //the whole response has been recieved, so we just print it out here
        response1.on('end', function () {
                finalGreeting = greeting;
                console.log(finalGreeting);
        });

    };
    http.request(options1, callback1).end();
  });
};
http.request(options, callback).end();





var app = express();

app.use(bodyParser.json());




app.get('/greetuser', (reqGreet, resGreet) => {
  const startTime = Date.now();


  User.find((err, users) => {
    if (err)  {
      return resGreet.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    var options2= {
        host: thisAddress, //'localhost' 
        path: '/',
        port: starterServicePort
    };
    var callback2 = function(response2) {

       var greeting2 = '';

        //another chunk of data has been recieved, so append it to `str`
        response2.on('data', function (chunk2) {
                greeting2 += chunk2;
        });

        //the whole response has been recieved, so we just print it out here
        response2.on('end', function () {
                finalGreeting = greeting2;
                console.log(finalGreeting);
		
		resGreet.writeHead(200, {"Content-Type": "json"});

    		resGreet.send({
      		  greeting: finalGreeting,
      		  data: users
    		});
        });

    };
    http.request(options2, callback2).end();
  });
});





app.get('/greetuser1', (req, res) => {
  const startTime = Date.now();


  User.find((err, users) => {
    if (err)  {
      return res.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    res.send({
      greeting: finalGreeting,
      data: users
    });
  });
});


app.get('/users', (req, res) => {
  const startTime = Date.now();

  User.find((err, users) => {
    if (err)  {
      return res.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    res.send({
      time: timestamp,
      data: users
    });
  });
});

app.post('/users', (req, res) => {
  const startTime = Date.now();
  const name = req.body.name;

  const user = new User({ name });
  user.save((err) => {
    if (err)  {
      return res.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    res.send({
      time: timestamp,
      data: user
    });
  });
});

app.get('/createoneuser', (req, res) => {
  const startTime = Date.now();
  const name = "Joe Johnson";

  const user = new User({ name });
  user.save((err) => {
    if (err)  {
      return res.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    res.send({
      time: timestamp,
      data: user
    });
});
});

app.put('/users/:id', (req, res) => {
  const startTime = Date.now();
  const name = req.body.name;

  User.findOneAndUpdate({ _id: req.params.id }, { name }, (err, user) => {
    if (err) {
      return res.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    res.send({
      time: timestamp,
      data: user
    });
  });
});

app.delete('/users/:id', (req, res) => {
  const startTime = Date.now();

  User.findOneAndRemove(req.params.id, (err, user) => {
    if (err) {
      return res.send('Something went wrong');
    }

    const timestamp = Date.now() - startTime;

    res.send({
      time: timestamp,
      data: user
    });
  });
});


// Start server
var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

});


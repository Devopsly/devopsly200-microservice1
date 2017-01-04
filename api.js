var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');

var ip = require("ip");
var thisAddress = ip.address();
console.log("IP address is ");
console.log(thisAddress);

var http = require('http');


var User;
var mongoDbUrl;
var mongoPort=27017;

var options = {
  host: 'myip.dnsomatic.com',
  path: '/'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
    thisAddress = str;
    mongoDbUrl = thisAddress + ":" + mongoPort;
    mongoose.connect(`mongodb://${mongoDbUrl}/userdb`);
    User = mongoose.model('User', { name: String });

  });
}

http.request(options, callback).end();

var app = express();

app.use(bodyParser.json());

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


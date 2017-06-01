const routes = require("route");
const path = require("path");
const fs = require("fs");

'use strict';

const http = require('http');
const port = process.env.PORT || 8000;
const pets = path.join(__dirname, 'pets.json');
const petRegExp = /^\/pets\/(.*)$/;


const server = http.createServer(function(req, res) {
  res.setHeader('Content-Type', 'text/plain');

  // READ FILE, GET DATA
  let myData = fs.readFileSync(pets, 'utf8');
  myData = JSON.parse(myData);

  let id = -1;
  if (req.url.match(petRegExp)) {
    id = req.url.match(petRegExp);
    id = parseInt(id[1]);
  }

  // CHOOSE route
  if (req.method === 'GET') {
    if (req.url === '/pets') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(myData));
    } else if (id !== -1 && id < myData.length) {
      let myItem = myData[id];
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(myItem));
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  }

  if (req.method === 'POST') {
    if (req.url === '/pets') {
      var body = '';
      req.on('data', function(data) {
        body += data;
      });
      req.on('end', function() {
        body = JSON.parse(body);
        if (body.age && body.name && body.kind) {
          myData.push(body);
          myData = JSON.stringify(myData);
          console.log(pets, 'pets');
          console.log(myData, 'myData');
          fs.writeFile(pets, myData, function() {});
          res.setHeader('Content-Type', 'application/json');
          console.log(JSON.stringify(body), 'body');
          res.end(JSON.stringify(body));
        } else {
          res.statusCode = 400;
          res.end('Bad Request');
        }
      });
    } else {
      res.statusCode = 400;
      res.end('Not Found');
    }
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});


module.exports = server;;

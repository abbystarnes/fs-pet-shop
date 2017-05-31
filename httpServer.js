const routes = require("route");
const path = require("path");
const fs = require("fs");

'use strict';

const http = require('http');
const port = process.env.PORT || 8000;
const pets = path.join(__dirname, 'pets.json');
const petRegExp = /^\/pets\/(.*)$/;

// read guests file, return Promise
// test given url for /pets, /pets/0,1 etc
/*cases:
  /pets send data
  /pets/validnumber send data at index
  /pets/invalidnumber 404
  /404
*/
// let cases = {
//   'pets'
//   'id'
// }

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
  if (req.method === 'GET' && req.url === '/pets') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(myData));
  } else if (id !== -1 && id < myData.length) {
    let data = myData;
    let myItem = data[id];
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(myItem));
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }

});

server.listen(port, function() {
  console.log('Listening on port', port);
});


module.exports = server;

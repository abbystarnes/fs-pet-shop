'use strict';
const routes = require("route");
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const http = require('http');
const port = process.env.PORT || 3000;
const petsFile = path.join(__dirname, 'pets.json');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const path = require("path");
// const express = require('express');
const router = express.Router();
// const petsFile = path.join(__dirname, 'pets.json');
let pets = undefined;
let updatePets = function() {
  pets = fs.readFileSync(petsFile, 'utf8');
  pets = JSON.parse(pets);
}

updatePets();

router.get('/pets', function(req, res) {
  res.send(pets);
});

router.get('/pets/:id', function(req, res) {
  let id = req.params.id;
  if (id >= 0 && id < pets.length) {
    let pet = pets[id];
    res.send(pet);
  } else {
    console.log('got to error');
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    res.end('Not Found');
  }
});

router.post('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 404;
  res.end('Not Found');
});

router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 404;
  res.end('Not Found');
});

router.post('/pets', function(req, res) {
  if (req.body.age && req.body.name && req.body.kind) {

    let pet = {};
    pet.age = parseInt(req.body.age);
    pet.kind = req.body.kind;
    pet.name = req.body.name;
    console.log(pet);
    pets.push(pet);
    let updateFile = new Promise(function(resolve, reject) {
      fs.writeFile(petsFile, JSON.stringify(pets), 'utf8');
    });
    updateFile.then(() => {
      updatePets();
    });
    res.send(pet);

  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 400;
    res.end('Not Found');
  }
})

module.exports = router;

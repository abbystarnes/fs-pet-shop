const routes = require("route");
const app = require('express');
const path = require("path");
const fs = require("fs");
const http = require('http');
const port = process.env.PORT || 3000;
const pets = path.join(__dirname, 'pets.json');

'use strict';

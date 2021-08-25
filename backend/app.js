// Imports //
const express = require('express');
const dotendv = require('dotenv').config()
const helmet = require("helmet");
const bodyParser = require('body-parser'); //npm install --save body-parser
const path = require('path');

// Const Routes //

//
const app = express();

app.use((req, res, next) => { // middleware permettant l'accès à l'api, contournant la sécurité par défaut CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // accès toutes origines
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // headers autorisés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // méthodes autorisées
    next();
  });
  
  app.use(helmet());

  app.use(bodyParser.json());

  app.get('/', function(req, res) {
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send('<h1>Groupomania API launched</h1>');
  });
  // route testing //
  app.get('/test-route', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Groupomania API - First route created</h1>')
});

app.use('/images', express.static(path.join(__dirname, 'images'))); // indique à express qu'il faut gérer la ressources images comme un dossier statique

module.exports = app; // export pour utilisation par server
const dotenv = require('dotenv').config(); // Env variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Groupomania API" });
});

app.get("/testingApi", (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`${ User }`);
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync({force: true, match: /adb$/}).then(() => { // For production : delete force:true, console.log and initial, just setting db.sequelize.sync()
  console.log('Drop and Resync Db');
  initial();
});

const Role = db.role;
const Users = db.user;
const UserRoles = db.user_roles;
const Medias = db.medias;

if (process.env.NODE_ENV == "development") {

function initial() {

  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
  var bcrypt = require("bcryptjs");

  Users.create({
    id: 1,
    username: "administrator",
    email: "admin@groupo.fr",
    password: bcrypt.hashSync("administrator", 8),
    roles: ["admin"]
  });

  Users.create({
    id: 2,
    username: "johndoe",
    email: "john@groupo.fr",
    password: bcrypt.hashSync("jonhdoe99", 8),
    roles: ["user"]
  });

  Users.create({
    id: 3,
    username: "moderator",
    email: "modo@groupo.fr",
    password: bcrypt.hashSync("moderator", 8),
    roles: ["moderator", "user"]
  });

  Users.create({
    id: 4,
    username: "usertest",
    email: "test@test.com",
    password: bcrypt.hashSync("testing", 8),
    roles: ["user"]
  });
  }

  Medias.create({
    id: 1,
    author: "usertest",
    contain: "https://pixabay.com/get/g2dfffed41e8b9072c09402301d43f10c4b4f0f73e811c7580756b590cdf0182983298493cad0abe667c904024b1b3432_640.jpg",
    category: "hollidays",
    archived: 0
  });
}
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
require('./app/routes/articles.routes')(app);
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
const User = db.user;
const UserRoles = db.user_roles;
const Media = db.media;
const Article = db.article;

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

  User.create({
    id: 1,
    username: "administrator",
    email: "admin@groupo.fr",
    password: bcrypt.hashSync("administrator", 8),
    roles: ["admin"]
  });

  User.create({
    id: 2,
    gender: "H",
    birthday: "1986-10-10",
    firstname: "John",
    lastname: "Doe",
    username: "johndoe",
    email: "john@groupo.fr",
    password: bcrypt.hashSync("johndoe99", 8),
    roles: ["user"]
  });

  User.create({
    id: 3,
    username: "moderator",
    email: "modo@groupo.fr",
    password: bcrypt.hashSync("moderator", 8),
    roles: ["moderator", "user"]
  });

  User.create({
    id: 4,
    username: "usertest",
    email: "test@test.com",
    password: bcrypt.hashSync("testing", 8),
    roles: ["user"]
  });

  Media.create({
    id: 1,
    author: 3,
    content: "https://pixabay.com/get/g2dfffed41e8b9072c09402301d43f10c4b4f0f73e811c7580756b590cdf0182983298493cad0abe667c904024b1b3432_640.jpg",
    category: "hollidays",
    archived: 0
  });

  Article.create({
    id: 1,
    authorId: 2,
    title: "Moi c'est John, et vous ?",
    authorName: "johndoe",
    content: "Salut, moi c'est Johny, du service compta. Je profite de chat pour me présenter : 35ans, marié, 1 enfant et déjà 6 ans de boite ! Pour apprendre à se connaitre un peu mieux, je propose que chacun fasse ici sa petite présentation rapide. Ca vous dit ?",
    category: "Ma présentation",
    archived: 0,
    likes: 1,
    dislikes: 0,
    createdAt: "2021-06-22",
    updatedAt: "2021-06-22"
    });

  Article.create({
    id: 2,
    authorId: 4,
    authorName: "usertest",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet quam non augue gravida aliquam. In eleifend est ut ipsum dapibus, ut porta dui venenatis. Cras scelerisque eu leo eleifend rutrum. Suspendisse ipsum est, pharetra non est et, porta semper neque. Vestibulum vulputate lacus ut tincidunt sollicitudin. Pellentesque vel felis eros. Nullam eu tellus porta, molestie ipsum eget, pharetra metus. Vivamus ullamcorper sed est nec gravida. Integer vitae mollis orci. Suspendisse et ex metus. Curabitur cursus porttitor lorem in elementum. Cras feugiat augue a neque maximus viverra. Pellentesque venenatis semper nibh. Donec aliquet est vel tortor interdum scelerisque. Nulla id ipsum risus. Nam consequat quam eros, eu consequat lacus varius ac. In venenatis, nulla in sagittis bibendum, nulla purus aliquam tellus, et aliquam massa elit at lacus. Fusce nec porta mauris. Etiam eget aliquam enim, et porttitor velit. Nam dapibus felis vel risus tempus imperdiet. Maecenas malesuada velit eu elit tincidunt, a viverra dui molestie. Ut in tincidunt mi. Nulla tincidunt erat ipsum, at sagittis odio pharetra quis. Duis elementum odio hendrerit, porta odio vel, volutpat metus. Duis aliquam nec leo vel tristique. Fusce sodales feugiat hendrerit. Praesent vitae tortor a arcu dictum dapibus.",
    category: "Le lorem ipsum",
    archived: 0,
    likes: 1,
    dislikes: 5,
    createdAt: "2021-08-10",
    updatedAt: "2021-08-10",
    });

    Article.create({
      id: 3,
      authorId: 2,
      title: "Game",
      authorName: "johndoe",
      content: "C'est encore moi Johny, j'espère que vous allez tous très bien. Je vous donne rdv ce soir vers 17h devant la machine à café pour un petit game entre nous ;)",
      category: "Jonhy ideas",
      archived: 0,
      likes: 3,
      dislikes: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      });
    
  }//initial end
} // if end
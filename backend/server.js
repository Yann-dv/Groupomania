const dotenv = require('dotenv').config(); // Env variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const config = require("./app/config/db.config");

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
require('./app/routes/messages.routes')(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Groupomania API" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Assurez-vous que config.DB est défini avant de synchroniser la base de données
if (config.DB) {
  db.sequelize.sync({ force: true, match: /adb$/ }).then(() => {
    console.log('Drop and Resync Db');
    initialize();
  });
} else {
  console.error("Erreur: La variable config.DB n'est pas définie correctement.");
  process.exit(1); // Terminer le processus avec un code d'erreur
}

const Role = db.role;
const User = db.user;
const Article_messages = db.article_messages;
const User_roles = db.user_roles;
const Article = db.article;
const Message = db.message;

if (process.env.NODE_ENV == "development") {  

function initialize() {

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
    gender: "H",
    birthday: "2021-09-18",
    firstname: "administrator",
    lastname: "admin",
    username: "admin",
    email: "admin@groupo.fr",
    password: bcrypt.hashSync("administrator", 8),
    roles: ["admin"],
    archived: 0,
    archivedAt: null
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
    roles: ["user"],
    archived: 0,
    archivedAt: null
  });

  User.create({
    id: 3,
    gender: "F",
    birthday: "1976-07-10",
    firstname: "test",
    lastname: "user",
    username: "usertest",
    email: "test@test.com",
    password: bcrypt.hashSync("testing", 8),
    roles: ["user"],
    archived: 0,
    archivedAt: null
  });

  User.create({
    id: 4,
    gender: "F",
    birthday: "1989-10-10",
    firstname: "Jane",
    lastname: "Dohey",
    username: "janeD",
    email: "janeDh@groupo.fr",
    password: bcrypt.hashSync("janedoe", 8),
    roles: ["user"],
    archived: 0,
    archivedAt: null
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
    createdAt: "2021-08-22",
    updatedAt: "2021-08-22"
    });

  Article.create({
    id: 2,
    authorId: 3,
    authorName: "usertest",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet quam non augue gravida aliquam. In eleifend est ut ipsum dapibus, ut porta dui venenatis. Cras scelerisque eu leo eleifend rutrum. Suspendisse ipsum est, pharetra non est et, porta semper neque. Vestibulum vulputate lacus ut tincidunt sollicitudin. Pellentesque vel felis eros. Nullam eu tellus porta, molestie ipsum eget, pharetra metus. Vivamus ullamcorper sed est nec gravida. Integer vitae mollis orci. Suspendisse et ex metus. Curabitur cursus porttitor lorem in elementum. Cras feugiat augue a neque maximus viverra. Pellentesque venenatis semper nibh. Donec aliquet est vel tortor interdum scelerisque. Nulla id ipsum risus.",
    category: "Le lorem ipsum",
    archived: 0,
    likes: 1,
    dislikes: 5,
    createdAt: "2021-09-10",
    updatedAt: "2021-10-10",
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

      Article.create({
        id: 4,
        authorId: 1,
        authorName: "administrator",
        content: "Article au contenu archivé",
        category: "Archivé",
        archived: 1,
        archivedAt: "2021-10-01",
        likes: 0,
        dislikes: 0,
        createdAt: "2021-08-15",
        updatedAt: "2021-08-29",
        });

        Article.create({
        id: 4,
        authorId: 1,
        authorName: "administrator",
        content: "Article au contenu archivé",
        category: "Archivé",
        archived: 1,
        archivedAt: "2021-10-01",
        likes: 0,
        dislikes: 0,
        createdAt: "2021-08-15",
        updatedAt: "2021-08-29",
        });

      Article.create({
        id: 5,
        authorId: 4,
        title: "Covoiturage",
        authorName: "janeD",
        content: "Bonjour à tous et à toutes. Comme je sais que nous sommes nombreux à venir au travail en voiture quotidiennement et que nous sommes plusieurs à habiter proche les uns des autres, je souhaite proposer un système de covoiturage pour se rendre au travail. Qui serait partant ??",
        category: "transports",
        archived: 0,
        archivedAt: null,
        likes: 0,
        dislikes: 0,
        createdAt: "2021-09-19",
        updatedAt: "2021-09-19",
      });

      Message.create({
        id: 1,
        linkedArticle: 1,
        authorId: 2,
        authorName: "johndoe",
        content: "Super idée ! :D",
        archived: 0,
        archivedAt: null,
        likes: 0,
        dislikes: 0,
        createdAt: "2021-09-03",
        updatedAt: new Date(),
      });

      Message.create({
        id: 2,
        linkedArticle: 1,
        authorId: 3,
        authorName: "usertest",
        content: "Pourquoi pas, c'est une idée intéressante, d'autant que tout le monde ne se connait pas dans cette boite ! Bravo john belle initiative !",
        archived: 0,
        archivedAt: null,
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      Message.create({
        id: 3,
        linkedArticle: 1,
        authorId: 3,
        authorName: "usertest",
        content: "Contenu indésirable, faute de frappe, message supprimé/archivé !",
        archived: 1,
        archivedAt: new Date(),
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      Message.create({
        id: 4,
        linkedArticle: 2,
        authorId: 2,
        authorName: "johndoe",
        content: "Vraiment long ces textes en latin... surtout quand on ne le lit pas !",
        archived: 0,
        archivedAt: null,
        likes: 0,
        dislikes: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    
      Message.create({
        id: 5,
        linkedArticle: 3,
        authorId: 4,
        authorName: "janeD",
        content: "Extra, j'y serais !!",
        archived: 0,
        archivedAt: null,
        likes: 0,
        dislikes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  }//initialize end
} // if end
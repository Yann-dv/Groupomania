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
require('./app/routes/messages.routes')(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Groupomania API" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

db.sequelize.sync({force: true, match: /adb$/}).then(() => { // For production : delete force:true, console.log and initialize, just setting db.sequelize.sync()
  console.log('Drop and Resync Db');
  initialize();
  //deleteOldArchived();
});

const Role = db.role;
const User = db.user;
const Article_messages = db.article_messages;
const User_roles = db.user_roles;
const Article = db.article;
const Message = db.message;

if (process.env.NODE_ENV == "development") {
  
  /*function deleteOldArchived() {
    const archivedAt = new Date(archivedAt);
    const today = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = today.getTime() - archivedAt.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);
    const toDestroy= Article.findAll({where: {archived : 1}});
        if(diffInDays >= 30) {
          toDestroy.destroy()/.then(
            (article) => {
              if (!article) {
                return res.status(404).send(new Error('article not found!'));
              }
              res.status(200).json({message: "Article définitivement supprimé de la db"});
            }
          )
        }
  };*/
    

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
    username: "usertest",
    email: "test@test.com",
    password: bcrypt.hashSync("testing", 8),
    roles: ["user"]
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
    authorId: 3,
    authorName: "usertest",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet quam non augue gravida aliquam. In eleifend est ut ipsum dapibus, ut porta dui venenatis. Cras scelerisque eu leo eleifend rutrum. Suspendisse ipsum est, pharetra non est et, porta semper neque. Vestibulum vulputate lacus ut tincidunt sollicitudin. Pellentesque vel felis eros. Nullam eu tellus porta, molestie ipsum eget, pharetra metus. Vivamus ullamcorper sed est nec gravida. Integer vitae mollis orci. Suspendisse et ex metus. Curabitur cursus porttitor lorem in elementum. Cras feugiat augue a neque maximus viverra. Pellentesque venenatis semper nibh. Donec aliquet est vel tortor interdum scelerisque. Nulla id ipsum risus.",
    category: "Le lorem ipsum",
    archived: 0,
    likes: 1,
    dislikes: 5,
    createdAt: "2021-08-10",
    updatedAt: "2021-09-10",
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
        createdAt: "2021-07-15",
        updatedAt: "2021-07-29",
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
        createdAt: "2021-07-03",
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
    
  }//initialize end
} // if end
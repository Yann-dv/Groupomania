const { user } = require("../models");
const { media } = require("../models");
const { article } = require("../models");
const db = require("../models");
const User = db.user;
const Media = db.media;
const Article = db.article;


  exports.publicContent = (req, res, next) => {
    res.status(200).send("Public Content - Successfully accessed");
  };
  

  exports.userBoard = (req, res, next) => {
    Article.findAll().then(
      (articles) => {
        const mappedArticles = articles.map((article) => {
          return article;
        });
        res.status(200).json(mappedArticles);
      }
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    );

     /* Media.findOne({
        where: { id: 1 }
      })
      .then((media) =>
          res.status(200).json(media)
      ).catch(
        () => {
          res.status(500).send(new Error('Database error!'));
        }
      )*/
};
    /*User.findAll().then(
      (users) => {
        const mappedUsers = users.map((user) => {
          allUsers= user.username + '-' + user.id;
          return allUsers;
        });
        res.status(200).parse(mappedUsers)
        .catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    );
  });*/
  
  exports.adminBoard = (req, res, next) => {
    res.status(200).send("Admin Content - Successfully accessed");
  };
  
  exports.moderatorBoard = (req, res, next) => {
    res.status(200).send("Moderator Content - Successfully accessed");
  };
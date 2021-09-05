const db = require("../models");

const Article = db.article;
  

  exports.getAllArticles = (req, res, next) => {
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

const db = require("../models");

const User = db.user;


  exports.publicContent = (req, res, next) => {
    res.status(200).send("Public Content - Successfully accessed");
  };
  

  exports.userBoard = (req, res, next) => {
    User.findAll().then(
      (users) => {
        const mappedUsers = users.map((user) => {
          return user;
        });
        res.status(200).json(message= {users : mappedUsers.length});
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
  
  exports.adminBoard = (req, res, next) => {
    res.status(200).send("Admin Content - Successfully accessed");
  };
  
  exports.moderatorBoard = (req, res, next) => {
    res.status(200).send("Moderator Content - Successfully accessed");
  };
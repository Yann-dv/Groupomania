const db = require("../models");
const User = db.user;

  exports.allAccess = (req, res, next) => {
    User.findAll().then(
      (users) => {
        const mappedUsers = users.map((user) => {
          allUsers= user.username + '-' + user.id;
          return allUsers;
        });
        res.status(200).json(`Utilisateurs : ` + `${mappedUsers}`)
        .catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    );
    //res.status(200).send("Public Content - Successfully accessed");
  }
);
};
  

  exports.userBoard = (req, res, next) => {
    res.status(200).send("User Content - Successfully accessed");
  };
  
  exports.adminBoard = (req, res, next) => {
    res.status(200).send("Admin Content - Successfully accessed");
  };
  
  exports.moderatorBoard = (req, res, next) => {
    res.status(200).send("Moderator Content - Successfully accessed");
  };
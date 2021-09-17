const db = require("../models");

const User = db.user;

var bcrypt = require("bcryptjs");


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
    )
    };
    
  exports.getUserProfile = (req, res, next) => {
     User.findOne({
        where: { id: req.userId }
        })
        .then((user) =>
          res.status(200).json(user)
        ).catch(
          () => {
            res.status(500).send(new Error('Database error!'));
          })
  };
  
  exports.adminBoard = (req, res, next) => {
    res.status(200).send("Admin Content - Successfully accessed");
  };
  
  exports.moderatorBoard = (req, res, next) => {
    res.status(200).send("Moderator Content - Successfully accessed");
  };

  exports.updateUser = (req, res, next) => {
    User.update({
      gender: req.body.gender,
      birthday: req.body.birthday,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      updatedAt: new Date(),
      }, 
      {where:{ id: req.userId}})
      .then(
      res.status(200).json({message: `Données de l'utilisateur n°${req.userId} modifié dans la db`})
      ).catch(
        () => {
          res.status(500).send(new Error('Database error!'));
        }
      )
  }

  exports.deleteUser= (req, res, next) => {
    User.update({ archived: 1}, {
      where:{ id: req.body.id}})
      .then(
      res.status(200).json({message: `Utilisateur n°${req.body.id} archivé dans la db`})
      ).catch(
        () => {
          res.status(500).send(new Error('Database error!'));
        }
      )
    };
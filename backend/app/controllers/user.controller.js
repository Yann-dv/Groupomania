const Media = require('../models/medias.model.js');
const db = require('../config/db.config.js');

  exports.allAccess = (req, res, next) => {
    /*req.find()
      .then(medias => res.status(200).json(medias).send("Communication avec l'API réussi"))
      .catch(error => res.status(404).json({ error }));*/
      res.status(200).send("Communication avec l'API réussi");
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
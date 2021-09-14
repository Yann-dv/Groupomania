
const db = require("../models");

const Message = db.message;

exports.getAllMessages = (req, res, next) => {
    Message.findAll({where: {archived : 0}}).then( // éléments archivés non récupérés
      (messages) => {
        const mappedMessages = messages.map((message) => {
          return { // ne retourne pas authorId
          id: message.id,
          linkedArticle: message.linkedArticle,
          authorId: message.authorId,
          authorName: message.authorName,
          content: message.content,
          archived: message.archived,
          likes: message.likes,
          dislikes: message.dislikes,
          createdAt : message.createdAt,
          updatedAt: message.updatedAt
          };
        });
        res.status(200).json(mappedMessages);
      }
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    );
};

exports.getOneMessage= (req, res, next) => {
  Message.findOne({ where: { linkedArticle: req.body.id}}).then(
    (message) => {
      if (!message) {
        return res.status(404).send(new Error('message not found!'));
      }
      res.status(200).json(message);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  );
}; 

  exports.getAndCountMessage= (req, res, next) => {
    Message.findAndCountAll({linkedArticle: req.body.id, where:{archived: 0}}).then(
      (message) => {
        if (!message) {
          return res.status(404).send(new Error('message not found!'));
        }
        res.status(200).json(message.count); //disabling count for addinw rows details
      }
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    );
    };

  exports.createMessage = (req, res, next) => {
      Message.create({
      linkedArticle: req.body.linkedArticle,
      authorId: req.userId,
      authorName: req.username,
      content: req.body.content,
      archived: 0,
      archivedAt: null,
      likes: 0,
      dislikes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then(() => res.status(201).json({message : `Message envoyé dans la base de données`}))
    .catch(error => res.status(500).json({ error }));
  }

exports.deleteMessage= (req, res, next) => {
  Message.update({ archived: 1}, {
    where:{ id: req.body.id}})
    .then(
    res.status(200).json({message: `Message n°${req.body.id} archivé dans la db`})
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    )
};
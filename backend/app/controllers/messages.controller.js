
const db = require("../models");

const Message = db.message;

exports.getAllMessages = (req, res, next) => {
    Message.findAll({where: {archived : 0}}).then( // éléments archivés non récupérés
      (messages) => {
        const mappedMessages = messages.map((message) => {
          return { // ne retourne pas authorId
          id: message.id,
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
const { authJwt } = require("../middleware");
const messagesController = require("../controllers/messages.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/getAllMessages",
  [authJwt.verifyToken],
    messagesController.getAllMessages
  );

  app.get("/api/getOneMessage",
  [authJwt.verifyToken],
    messagesController.getOneMessage
  );

  app.get("/api/getAndCountMessage",
  [authJwt.verifyToken],
    messagesController.getAndCountMessage
  );

  app.put("/api/deleteMessage",
  [authJwt.verifyToken],
    messagesController.deleteMessage
  );

};
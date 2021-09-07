const { authJwt } = require("../middleware");
const articlesController = require("../controllers/articles.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  app.get("/api/allArticles",
  [authJwt.verifyToken],
    articlesController.getAllArticles
  );
  app.put("/api/allArticles/modifyOneArticle",
  [authJwt.verifyToken],
    articlesController.modifyOneArticle
  );

};
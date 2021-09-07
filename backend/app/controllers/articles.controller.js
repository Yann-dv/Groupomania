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
};

exports.modifyOneArticle = (req, res, next) => { // route pour la modification de l'objet, en fonction de son _id
  const articleObject = req.file ? // on vérifie qu'il existe un req.file et donc un fichier envoyé
  {// Si on trouve un file, on parse le body, et on l'utilise pour créer une nouvelle image et son url
      ...JSON.parse(req.body.article),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
  } : {...req.body}; // si pas de file, on récupère le corps de requête
    Article.updateOne({ _id: req.params.id}, {...articleObject, _id: req.params.id}) // objet en 1er argument, modif en 2ème avec un _id correspondant
    .then(() => res.status('200').json({message : 'Article modifié'}))
    .catch(error => res.status('400').json({ error }))
  };

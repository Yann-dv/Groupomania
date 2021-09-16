
const db = require("../models");

const Article = db.article;

  exports.getAllArticles = (req, res, next) => {
    Article.findAll({where: {archived : 0}}).then( // éléments archivés non récupérés
      (articles) => {
        const mappedArticles = articles.map((article) => {
          return { // ne retourne pas authorId
          id: article.id,
          authorId: article.authorId,
          authorName: article.authorName,
          title: article.title, 
          content: article.content,
          category: article.category, 
          archived: article.archived,
          archivedAt: article.archivedAt,
          likes: article.likes,
          dislikes: article.dislikes,
          createdAt : article.createdAt,
          updatedAt: article.updatedAt
          };
        });
        res.status(200).json(mappedArticles);
      }
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    );
};

exports.createArticle = (req, res, next) => {
    Article.create({
    authorId: req.userId,
    authorName: req.username,
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    archived: 0,
    likes: 0,
    dislikes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then(() => res.status(201).json({message : `Article publié dans la base de données`}))
  .catch(error => res.status(500).json({ error }));
}

exports.getOneArticle= (req, res, next) => {
Article.findOne({ where: { id: req.body.id}}).then(
  (article) => {
    if (!article) {
      return res.status(404).send(new Error('article not found!'));
    }
    //article.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + article.imageUrl;
    res.status(200).json(article);
  }
).catch(
  () => {
    res.status(500).send(new Error('Database error!'));
  }
);
}

exports.deleteArticle = (req, res, next) => {
  Article.update({ archived: 1}, {
    where:{ id: req.body.id}})
    .then(
    res.status(200).json({message: `Article n°${req.body.id} archivé dans la db`})
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    )
}

exports.updateArticle = (req, res, next) => {
  Article.update({authorId: req.body.authorId, title : req.body.title, 
    category: req.body.category, 
    content : req.body.content, 
    updatedAt: new Date()}, 
    {where:{ id: req.body.id }})
    .then(
    res.status(200).json({message: `Article n°${req.body.id} modifié dans la db`})
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    )
}

  /*exports.modifyOneArticle = (req, res, next) => { // route pour la modification de l'objet, en fonction de son _id
  const articleObject = req.file ? // on vérifie qu'il existe un req.file et donc un fichier envoyé
  {// Si on trouve un file, on parse le body, et on l'utilise pour créer une nouvelle image et son url
      ...JSON.parse(req.body.article),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
  } : {...req.body}; // si pas de file, on récupère le corps de requête
    Article.updateOne({ _id: req.params.id}, {...articleObject, _id: req.params.id}) // objet en 1er argument, modif en 2ème avec un _id correspondant
    .then(() => res.status('200').json({message : 'Article modifié'}))
    .catch(error => res.status('400').json({ error }))
  };*/

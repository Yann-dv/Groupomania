import api from './api';

class ArticleService {
  getAllArticles() {
    return api.get('/getAllArticles'); // retourne le contenu renvoyé par l'API -> user.controller allAccess
  }

  createArticle({ id, authorId, authorName,
    title, content, category, archived, likes, 
    dislikes, createdAt, updatedAt }) {
    return api.post('/createArticle', {
      id,
      authorId,
      authorName,
      title,
      content,
      category,
      archived,
      likes,
      dislikes,
      createdAt,
      updatedAt
    });
  }
  

  

}//ArticleService

export default new ArticleService();

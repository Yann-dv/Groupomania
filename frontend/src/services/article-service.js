import api from './api';

class ArticleService {
  getAllArticles() {
    return api.get('/getAllArticles'); // retourne le contenu renvoyé par l'API -> user.controller allAccess
  }

  getOneArticles() {
    return api.get('/getOneArticle');
  }

  deleteArticle(id) {
    return api.put('/deleteArticle', 
    { id });
  }

  updateArticle({
    id,
    authorId, 
    title, 
    category, 
    content, 
    updatedAt}) {

      
    return api.put('/updateArticle', 
    { id, 
      authorId, 
      title, category, 
      content, updatedAt }); 
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

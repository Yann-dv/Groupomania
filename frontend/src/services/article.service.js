import api from './api';

class ArticleService {
  getAllArticles() {
    return api.get('/allArticles'); // retourne le contenu renvoyé par l'API -> user.controller allAccess
  }

  modifyOneArticle() {
    return api.put('/allArticles/modifyOneArticle');
  }

}//ArticleService

export default new ArticleService();

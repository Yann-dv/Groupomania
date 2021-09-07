import api from './api';

class ArticleService {
  getAllArticles() {
    return api.get('/getAllArticles'); // retourne le contenu renvoyé par l'API -> user.controller allAccess
  }

  modifyOneArticle() {
    return api.put('/modifyOneArticle');
  }

  

}//ArticleService

export default new ArticleService();

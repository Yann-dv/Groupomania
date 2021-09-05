import api from './api';

class ArticleService {
  getAllArticles() {
    return api.get('/allArticles'); // retourne le contenu renvoyé par l'API -> user.controller allAccess
  }
}

export default new ArticleService();

import api from './api';

class ArticleService {
  getAllArticles() {
    return api.get('/allArticles'); // retourne le contenu renvoyé par l'API -> user.controller allAccess
  }

  modifyOneArticle() {
    return api.put('/allArticles/modifyOneArticle');
  }

  addModifyingPost() {
    // s'assurer que l'utilisateur a entré quelque chose
    if (!this.modifyingPost) {
      return;
    }
    this.modifyingPost.push(this.modifyingPost);
    this.modifyingPost = '';
    this.saveModifyingPost();
  }
  removeCat(x) {
    this.modifyingPost.splice(x, 1);
    this.saveModifyingPost();
  }
  saveModifyingPost() {
    const parsed = JSON.stringify(this.modifyingPost);
    localStorage.setItem('modifyingPost', parsed);
  }

}//ArticleService

export default new ArticleService();

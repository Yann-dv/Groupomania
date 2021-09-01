import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/test/all'); // retourne le contenu renvoyé par l'API -> user.controller allAccess
    
  }

  getUserBoard() {
    return api.get('/test/user');
  }

  getModeratorBoard() {
    return api.get('/test/mod');
  }

  getAdminBoard() {
    return api.get('/test/admin');
  }
}

export default new UserService();

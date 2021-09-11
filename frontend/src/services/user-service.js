import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/public'); // retourne le contenu renvoyé par l'API -> user.controller allAccess
  }

  getUserBoard() {
    return api.get('/user');
  }

  getUserProfile() {
    return api.get('/profile');
  }

  getModeratorBoard() {
    return api.get('/mod');
  }

  getAdminBoard() {
    return api.get('/admin');
  }
}

export default new UserService();

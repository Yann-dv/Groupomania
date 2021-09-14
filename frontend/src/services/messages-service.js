import api from './api';

class MessageService {
  getAllMessages() {
    return api.get('/getAllMessages'); // retourne le contenu renvoyé par l'API -> user.controller allAccess
  }

}
  export default new MessageService();


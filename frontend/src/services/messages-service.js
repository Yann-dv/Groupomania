import api from './api';

class MessageService {
  getAllMessages() {
    return api.get('/getAllMessages');
  }

  getOneMessage() {
    return api.get('/getOneMessage');
  }

  getAndCountMessage(id) {
    return api.get('/getAndCountMessage', 
    { id });
  }

  deleteMessage(id) {
    return api.put('/deleteMessage', 
    { id });
  }

}
  export default new MessageService();


import api from './api';

class MessageService {
  getAllMessages() {
    return api.get('/getAllMessages');
  }

  getOneMessage() {
    return api.get('/getOneMessage');
  }

  deleteMessage(id) {
    return api.put('/deleteMessage', 
    { id });
  }

}
  export default new MessageService();


import api from './api';

class MessageService {
  getAllMessages() {
    return api.get('/getAllMessages');
  }

  getOneMessage() {
    return api.get('/getOneMessage');
  }

  getLinkedMessages(id) {
    debugger;
    return api.put('/getLinkedMessages', 
    { id });
  }

  deleteMessage(id) {
    return api.put('/deleteMessage', 
    { id });
  }

  createMessage({ id, linkedArticle, authorId, authorName,
    content, archived, archivedAt, likes, 
    dislikes, createdAt, updatedAt }) {
    return api.post('/createMessage', {
      id,
      linkedArticle,
      authorId,
      authorName,
      content,
      archived,
      archivedAt,
      likes,
      dislikes,
      createdAt,
      updatedAt
    });
  }
}
  export default new MessageService();


import ArticleService from '../services/article-service';

  export const article = {
    namespaced: true,
    state: initialState,
    actions: {
        creation({ commit }, article) {
            return ArticleService.createArticle(article).then(
              response => {
                commit('Article publié avec succès');
                return Promise.resolve(response.data);
              },
              error => {
                commit('Erreur, article non publié');
                return Promise.reject(error);
              }
            );
          },
    
    },

};
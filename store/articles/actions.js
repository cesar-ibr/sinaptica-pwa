import { types } from './-types';

export default {
  async getMyArticles (ctx) {
    const articles = await this.$axios.$get('/');
    ctx.commit(types.SET_MY_ARTICLES, articles);
    return articles;
  },
};

import { types } from './-types';
// import defaultState from './state';

export default {
  [types.SET_MY_ARTICLES] (state, articles) {
    state.myArticles = articles;
  },
};

export const actions = {
  // Vuex Store init
  async vuexClientInit ({ commit, dispatch }, { req }) {
    await dispatch('auth/updateToken');
  },
};

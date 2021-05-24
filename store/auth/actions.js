import { types } from './-types';

export default {
  /**
   * This will be called when onAuthStateChanged() or onIdTokenChanged()
   * get triggered by Firebase
   * @param {Context} ctx
   * @param {Object} param1
   */
  async onAuthStateChangedAction (ctx, { authUser, claims }) {
    if (!authUser) {
      // claims = null
      // Perform logout operations
      ctx.commit(types.RESET_AUTH_USER);
      ctx.dispatch('logOut');
      return;
    }
    // Store firebase token
    const idToken = await this.$fire.auth.currentUser.getIdToken();
    authUser.firebaseToken = idToken;
    ctx.commit(types.SET_AUTH_USER, authUser);
    await ctx.dispatch('getUserProfile', { uid: authUser.uid });
  },

  onIdTokenChangedAction ({ dispatch }) {
    dispatch('updateToken');
  },

  async updateToken (ctx) {
    const idToken = await this.$fire.auth.currentUser.getIdToken();
    this.$axios.setToken(idToken, 'Bearer');
  },

  async getUserProfile (ctx, { uid }) {
    const profileRef = this.$fire.database.ref(`profile/${uid}`);
    const snapshot = await profileRef.once('value');
    ctx.commit(types.SET_PROFILE, snapshot.val() || {});
  },

  async setUserProfile (ctx, { uid, profile }) {
    const profileRef = this.$fire.database.ref(`profile/${uid}`);
    await profileRef.set(profile);
    ctx.commit(types.SET_PROFILE, profile);
  },

  async logOut () {
    if (this.$fire.auth.currentUser) {
      await this.$fire.auth.signOut();
    }
  },

  async whoAmI (ctx) {
    const res = await this.$axios.$get('/whoAmI');
    return res;
  },
};

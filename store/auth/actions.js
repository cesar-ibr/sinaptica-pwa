import { types } from './-types';

export default {
  /**
   * This will be called when onAuthStateChanged() or onIdTokenChanged()
   * get triggered by Firebase
   * @param {Context} ctx
   * @param {Object} param1
   */
  onAuthStateChangedAction (ctx, { authUser, claims }) {
    if (!authUser) {
      // claims = null
      // Perform logout operations
      ctx.commit(types.RESET_AUTH_USER);
    } else {
      ctx.commit(types.SET_AUTH_USER, authUser);
      ctx.dispatch('getUserProfile', { uid: authUser.uid });
    }
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
};

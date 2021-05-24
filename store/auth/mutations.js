import Vue from 'vue';
import { setKey } from '@/utils/local-storage';
import { types } from './-types';
import defaultState from './state';

export default {
  [types.SET_SIGN_IN_EMAIL] (state, email = '') {
    state.signInEmail = email;
    setKey('signInEmail', email);
  },
  [types.SET_AUTH_USER] (state, authUser) {
    const { uid, email, emailVerified, displayName, firebaseToken } = authUser;
    state.authUser = { uid, email, emailVerified, displayName, firebaseToken };
  },
  [types.RESET_AUTH_USER] (state) {
    state.authUser = defaultState().authUser;
  },
  [types.SET_PROFILE] (state, profile = {}) {
    Vue.set(state, 'profile', profile);
  },
};

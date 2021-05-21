const signedInGetter = 'auth/isUserSignedIn';

export default function ({ store, redirect }) {
  const isUserSignedIn = store.getters[signedInGetter];
  if (!isUserSignedIn) {
    redirect(403, '/auth/sign-in');
  }
};

<template>
  <Card class="m-auto w-11/12 lg:w-2/6 mt-10">
    <template v-if="signInError">
      <h1 class="mb-4">
        😬 Algo no salió bien
      </h1>
      <p>Parece ser que entraste desde otro dispositivo o el link expiró</p>
      <p class="text-right">
        <router-link to="/auth/sign-in" class="p-4 text-primary">
          Reintentar
        </router-link>
      </p>
    </template>
    <template v-if="!signInError">
      <h1 class="text-center">
        Validando...
      </h1>
    </template>
  </Card>
</template>
<script>
import Card from '@/components/Layout/Card';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Card,
  },
  layout: 'void',
  data () {
    return {
      signInError: false,
    };
  },
  computed: {
    ...mapState('auth', ['signInEmail']),
  },
  async mounted () {
    const isSignIn = this.$fire.auth.isSignInWithEmailLink(window.location.href);
    if (!this.signInEmail || !isSignIn) {
      this.signInError = true;
      return;
    }
    try {
      const result = await this.$fire.auth.signInWithEmailLink(this.signInEmail, window.location.href);
      if (result.additionalUserInfo.isNewUser) {
        await this.setDefaultProfile(result.user);
        this.$router.push('/profile');
        return;
      }
      await this.getUserProfile(result.user);
      this.$router.push('/home');
    } catch (e) {
      this.signInError = true;
      // TODO: Log errors
      // console.error(e);
    }
  },
  methods: {
    ...mapActions('auth', ['getUserProfile', 'setUserProfile']),

    async setDefaultProfile (user) {
      const defaultName = (user.email || '').split('@')[0];
      const profile = {
        name: defaultName || user.displayName,
        role: '',
        description: '',
      };

      try {
        await this.setUserProfile({
          uid: user.uid,
          profile,
        });
      } catch (e) {
        this.signInError = true;
        // TODO: Log errors
        // console.error(e);
      }
    },
  },
};
</script>

<template>
  <Card class="m-auto w-11/12 lg:w-2/6 flex flex-col mt-10">
    <template v-if="!loginWithEmail">
      <h1 class="mb-8 text-center">
        Ingresa con una de las siguientes opciones
      </h1>
      <Card
        class="mb-4"
        rounded
        clickable
        @click="googleSignIn"
      >
        <p>
          <Icon
            icon-name="google"
            class="inline mr-4"
            size="medium"
          />
          Cuenta de Google
        </p>
      </Card>
      <Card
        class="mb-4"
        rounded
        clickable
        @click="githubSignIn"
      >
        <p>
          <Icon
            icon-name="github"
            class="inline mr-4"
            size="medium"
          />
          Cuenta de GitHub
        </p>
      </Card>
      <Card
        class="mb-4"
        rounded
        clickable
        @click="emailSignIn"
      >
        <p>
          <Icon
            icon-name="email"
            class="inline mr-4"
            size="medium"
          />
          Email
        </p>
      </Card>
      <p
        v-if="signInError"
        class="text-red p-8"
        v-text="signInError"
      />
    </template>
    <template v-if="loginWithEmail && !emailSent">
      <Field
        v-model.trim="userEmail"
        f-type="email"
        name="email"
        label="Ingresa tu Email"
        class="mb-4"
        placeholder="micuenta@email.com"
        :error-message="emailError"
      />
      <Button
        class="self-end"
        :disabled="$v.userEmail.$invalid || sendingEmail"
        @click="sendEmail"
      >
        Continuar
      </Button>
      <span
        class="text-gray cursor-pointer"
        @click="loginWithEmail = false"
        v-text="'Regresar'"
      />
    </template>
    <template v-if="emailSent">
      <h1 class="text-center mb-4">
        ¡Listo! 📨
      </h1>
      <p>Revisa tu bandeja de entrada y da click en el link que te enviamos a tu correo</p>
    </template>
  </Card>
</template>
<script>
import Icon from '@/components/Icon/Icon';
import Card from '@/components/Layout/Card';
import Button from '@/components/Button/Button';
import Field from '@/components/Controls/Field';
import { required, email } from 'vuelidate/lib/validators';
import { types } from '@/store/auth/-types';
import { mapMutations, mapActions } from 'vuex';
import { error } from '@/utils/auth/error-codes';

export default {
  components: {
    Icon,
    Card,
    Button,
    Field,
  },
  layout: 'void',
  data () {
    return {
      signInError: false,
      loginWithEmail: false,
      sendingEmail: false,
      emailSent: false,
      userEmail: '',
    };
  },
  validations: {
    userEmail: {
      required,
      email,
    },
  },
  computed: {
    emailError () {
      if (!this.$v.userEmail.$invalid) { return ''; }
      return 'Ingresa una dirección de correo válida';
    },
  },
  methods: {
    ...mapMutations('auth', [types.SET_SIGN_IN_EMAIL]),
    ...mapActions('auth', ['logOut', 'setUserProfile', 'getUserProfile']),
    emailSignIn () {
      this.loginWithEmail = true;
      this.signInError = '';
    },
    async sendEmail () {
      this.sendingEmail = true;
      this.signInError = '';
      try {
        await this.logOut();
        const actionCode = {
          url: `${window.location.origin}/auth`,
          handleCodeInApp: true,
        };
        await this.$fire.auth.sendSignInLinkToEmail(this.userEmail, actionCode);
        // Persist email in localStorage
        this[types.SET_SIGN_IN_EMAIL](this.userEmail);
        this.emailSent = true;
      } catch (e) {
        this.handleError(e);
        // TODO: Log errors
      } finally {
        this.sendingEmail = false;
      }
    },

    async googleSignIn () {
      try {
        this.signInError = '';
        const provider = new this.$fireModule.auth.GoogleAuthProvider();
        const result = await this.$fire.auth.signInWithPopup(provider);
        const { additionalUserInfo, user } = result;
        // Set Profile for New Users
        if (additionalUserInfo && additionalUserInfo.isNewUser) {
          await this.setUserProfile({
            uid: user.uid,
            profile: additionalUserInfo.profile,
          });
          this.$router.push('/profile');
          return;
        }
        // Redirect to Home
        await this.getUserProfile(user);
        this.$router.push('/home');
      } catch (e) {
        // TODO: Log errors
        this.handleError(e);
      }
    },

    async githubSignIn () {
      try {
        this.signInError = '';
        const provider = new this.$fireModule.auth.GithubAuthProvider();
        const result = await this.$fire.auth.signInWithPopup(provider);
        const { additionalUserInfo, user } = result;
        // Set Profile for New Users
        if (additionalUserInfo && additionalUserInfo.isNewUser) {
          await this.setUserProfile({
            uid: user.uid,
            profile: additionalUserInfo.profile,
          });
          this.$router.push('/profile');
          return;
        }
        // Redirect to Home
        await this.getUserProfile(user);
        this.$router.push('/home');
      } catch (e) {
        // TODO: Log errors
        this.handleError(e);
      }
    },

    handleError (e) {
      // TODO: Log error
      // console.error(e);
      if (error[e.code]) {
        this.signInError = error[e.code].message;
        return;
      }
      this.signInError = '';
    },
  },
};
</script>

<template>
  <Card>
    <!-- Account Link -->
    <NavbarOption
      v-if="isUserSignedIn"
      icon-name="user-circle"
      :text="profile.name"
      :subtext="profile.role"
      route="/profile"
    />
    <!-- Create Articles (Unregistered Users) -->
    <NavbarOption
      v-if="!isUserSignedIn"
      icon-name="article"
      text="Crear Artículo"
      route="/auth/sign-in"
    />
    <!-- Articles -->
    <NavbarOption
      v-if="isUserSignedIn"
      icon-name="article"
      text="Artículos"
      route="/account/articles"
    >
      <template v-if="isUserSignedIn" #action>
        <router-link to="/account/articles/new" class="self-center">
          <Icon icon-name="add" />
        </router-link>
      </template>
    </NavbarOption>
    <!-- Posts -->
    <NavbarOption
      icon-name="post"
      text="Posts"
      route="/account/posts"
    />
    <!-- Settings -->
    <NavbarOption
      v-if="isUserSignedIn"
      icon-name="settings"
      text="Ajustes"
      :is-link-button="false"
    />
    <router-link
      v-if="!isUserSignedIn"
      to="/auth/sign-in"
    >
      <Button class="mt-4 w-full" light>
        Iniciar sesión
      </Button>
    </router-link>
    <hr class="mt-12 pb-4">
    <!-- About Sinaptica -->
    <template v-if="isOpen">
      <p class="text-center py-4">
        Sinaptica
      </p>
      <ul class="list-none font-light">
        <li class="pb-4">
          <router-link
            to="/sinaptica/manifiesto"
            active-class="text-primary"
            v-text="'Manifiesto'"
          />
        </li>
        <li class="pb-4">
          <router-link
            to="/sinaptica/bugs"
            active-class="text-primary"
            v-text="'Bugs y Sugerencias'"
          />
        </li>
        <li class="pb-4">
          <router-link
            to="/sinaptica/ayuda"
            active-class="text-primary"
            v-text="'Ayuda'"
          />
        </li>
        <li class="pb-4">
          <router-link
            to="/sinaptica/negocios"
            active-class="text-primary"
            v-text="'Negocios'"
          />
        </li>
      </ul>
    </template>
    <span
      v-if="isUserSignedIn"
      class="font-bold text-gray-dark pb-4 cursor-pointer"
      @click="execLogOut"
    >
      Salir
    </span>
  </Card>
</template>

<script>
import Card from '@/components/Layout/Card';
import Icon from '@/components/Icon/Icon';
import Button from '@/components/Button/Button';
import { mapState, mapActions, mapGetters } from 'vuex';
import NavbarOption from './NavbarOption';

export default {
  components: {
    Card,
    Icon,
    Button,
    NavbarOption,
  },
  data () {
    return {
      // TODO: Enable close and open
      isOpen: true,
    };
  },
  computed: {
    ...mapState('auth', {
      profile: state => state.profile || {},
    }),
    ...mapGetters('auth', ['isUserSignedIn']),
  },
  methods: {
    ...mapActions('auth', ['logOut']),
    async execLogOut () {
      await this.logOut();
      this.$router.push('/home');
    },
  },
};
</script>

<style>

</style>

<template>
  <Card>
    <!-- Account Link -->
    <NavbarOption
      icon-name="user-circle"
      text="Cesar Sanchez"
      subtext="@cesarsan"
      route="/profile"
      auto-select
    />
    <!-- Articles -->
    <NavbarOption
      icon-name="article"
      text="Artículos"
      route="/account/articles"
      auto-select
    >
      <template #action>
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
      auto-select
    />
    <!-- Settings -->
    <NavbarOption
      icon-name="settings"
      text="Ajustes"
      :is-link-button="false"
    />
    <hr class="mt-12 pb-4">
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
  </Card>
</template>

<script>
import Card from '@/components/Layout/Card';
import Icon from '@/components/Icon/Icon';
import NavbarOption from './NavbarOption';

export default {
  components: {
    Card,
    Icon,
    NavbarOption,
  },
  data () {
    return {
      // TODO: Enable close and open
      isOpen: true,
    };
  },
};
</script>

<style>

</style>

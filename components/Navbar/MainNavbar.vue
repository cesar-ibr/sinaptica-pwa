<template>
  <div class="p-6 rounded-xl shadow-md bg-white">
    <!-- Account Link -->
    <NavbarOption
      icon-name="user-circle"
      text="Cesar Sanchez"
      subtext="@cesarsan"
      route="/account"
    />
    <!-- Articles -->
    <NavbarOption
      icon-name="article"
      text="Artículos"
      route="/account/articles"
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
    />
    <!-- Settings -->
    <NavbarOption
      icon-name="settings"
      text="Ajustes"
      :is-link-button="false"
    />
    <div class="border-b border-gray h-px" />
    <template v-if="isOpen">
      <p class="text-center py-3">
        Sinaptica
      </p>
      <ul class="list-none leading-relaxed font-light">
        <li>
          <router-link to="/sinaptica/manifiesto" v-text="'Manifiesto'" />
        </li>
        <li>
          <router-link to="/sinaptica/bugs" v-text="'Bugs y Sugerencias'" />
        </li>
        <li>
          <router-link to="/sinaptica/ayuda" v-text="'Ayuda'" />
        </li>
        <li>
          <router-link to="/sinaptica/negocios" v-text="'Negocios'" />
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import Icon from '@/components/Icon/Icon';
import NavbarOption from './NavbarOption';

export default {
  components: {
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

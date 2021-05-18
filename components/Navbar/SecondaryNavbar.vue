<template>
  <div
    class="px-4 py-3 rounded-xl shadow-md bg-white flex justify-around m-auto"
    style="width: 500px"
  >
    <NavbarOption
      icon-name="home"
      text="Inicio"
      route="/home"
      auto-select
      minimal
    />
    <NavbarOption
      icon-name="article"
      text="Artículos"
      route="/articles"
      auto-select
      minimal
    />
    <NavbarOption
      icon-name="search"
      text="Buscar"
      route="/search"
      auto-select
      minimal
    />
  </div>
</template>

<script>
import NavbarOption from './NavbarOption';

export default {
  components: {
    NavbarOption,
  },
};
</script>

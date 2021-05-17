<template>
  <div
    class="px-6 rounded-xl shadow-md bg-white flex justify-around m-auto"
    style="width: 500px"
  >
    <NavbarOption
      icon-name="home"
      text="Inicio"
      route="/home"
      minimal
    />
    <NavbarOption
      icon-name="article"
      text="Artículos"
      route="/articles"
      minimal
    />
    <NavbarOption
      icon-name="search"
      text="Buscar"
      route="/search"
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

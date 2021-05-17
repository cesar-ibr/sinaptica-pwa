<template>
  <div class="flex">
    <section class="flex-none main-navbar p-3">
      <MainNavbar />
    </section>
    <section class="flex-grow main-content p-3">
      <SecondaryNavbar />
      <Nuxt />
    </section>
    <section class="flex-none main-column p-3" />
  </div>
</template>
<script>
import MainNavbar from '@/components/Navbar/MainNavbar';
import SecondaryNavbar from '@/components/Navbar/SecondaryNavbar';

export default {
  components: {
    MainNavbar,
    SecondaryNavbar,
  },
};
</script>
<style scoped>
.main-navbar {
  min-width: 100px;
  max-width: 300px;
  height: 800px;
}
.main-content {
  min-width: 500px;
}
.main-column {
  min-width: 300px;
}
</style>

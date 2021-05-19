<template>
  <button
    :class="['btn', cssColors]"
    :disabled="disabled"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    /**
     * Button color variant: 'primary', 'secondary', 'blue'...
     */
    color: {
      type: String,
      default: 'primary',
    },
    /**
     * Light version of the button
     */
    light: {
      type: Boolean,
      default: false,
    },
    /**
     * Disabled status
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cssColors () {
      const color = this.disabled ? 'gray' : this.color;
      const defaultCss =
        `text-white bg-${color} `.concat(this.disabled ? '' : 'shadow hover:shadow-md');
      const lightCss =
        `border border-${color} text-${color} hover:bg-${color} hover:text-white`;
      return this.light ? lightCss : defaultCss;
    },
  },
};
</script>
<style lang="postcss" scoped>
.btn {
  @apply px-8 py-4 font-medium font-semibold rounded-full;
}
</style>

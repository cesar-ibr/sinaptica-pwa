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
        `px-8 py-4 text-white font-semibold bg-${color}
        ${this.disabled ? '' : 'shadow hover:shadow-md'}
        `;
      const lightCss =
        `p-2 border border-${color} text-${color}
        ${this.disabled ? '' : `shadow hover:shadow-md hover:text-white hover:bg-${color}`}
        `;
      return this.light ? lightCss : defaultCss;
    },
  },
};
</script>
<style lang="postcss" scoped>
.btn {
  @apply font-medium rounded-full;
}
</style>

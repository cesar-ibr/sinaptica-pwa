<template>
  <img
    :width="iconSize"
    :height="iconSize"
    :src="iconPath"
    :alt="alt"
  >
</template>

<script>
const ICON_SIZES = {
  small: 16,
  medium: 24,
  big: 32,
};

export default {
  props: {
    /**
     * Just the name of the SVG icon file without ext
     */
    iconName: {
      type: String,
      required: true,
      default: '',
    },
    /**
     * ALT message
     */
    alt: {
      type: String,
      default: 'SVG Icon',
    },
    /**
     * Icon Size: 'small', 'medium', 'big'
     */
    size: {
      type: String,
      default: 'small',
      validator (val) {
        return ['small', 'medium', 'big'].includes(val);
      },
    },
  },
  computed: {
    iconPath () {
      return require(`~/assets/icons/${this.iconName}.svg`);
    },
    iconSize () {
      return ICON_SIZES[this.size];
    },
  },
};
</script>

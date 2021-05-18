<template>
  <svg
    :class="['stroke-current', iconColor]"
    :width="iconSize"
    :height="iconSize"
  >
    <use :xlink:href="iconRef" />
  </svg>
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
     * Icon identifier (ID) from the `sprite.svg` file
     */
    iconName: {
      type: String,
      required: true,
    },
    /**
     * Icon Color
     * - @options 'current', 'primary', 'secondary', 'white'...
     * - @default 'current'
     */
    color: {
      type: String,
      default: 'current',
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
    iconSize () {
      return ICON_SIZES[this.size];
    },
    iconColor () {
      return `text-${this.color}`;
    },
    iconRef () {
      const filePath = require('~/assets/icons/sprite.svg');
      return `${filePath}#${this.iconName}`;
    },
  },
};
</script>

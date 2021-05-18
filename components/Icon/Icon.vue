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
import { ICON_SIZES, getIconSize } from './icon.util';

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
     * Icon Size
     * - @options 'small', 'medium', 'big'
     * - @default 'small'
     */
    size: {
      type: String,
      default: 'small',
      validator (val) {
        return Object.keys(ICON_SIZES).includes(val);
      },
    },
  },
  computed: {
    iconSize () {
      return getIconSize(this.size);
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

<template>
  <div class="icon-button">
    <div
      class="rounded-full flex items-center justify-center"
      :class="[selected && 'bg-secondary' || '']"
    >
      <Icon
        :icon-name="iconName"
        :size="size"
        :color="selected ? selectedColor : color"
      />
    </div>
    <span v-if="label">{{ label }}</span>
  </div>
</template>

<script>
import Icon from './Icon';

export default {
  components: {
    Icon,
  },
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
     * Icon size.
     * - @options 'small', 'medium', 'big'
     * - @default `'medium'`
     */
    size: {
      type: String,
      default: 'medium',
    },
    /**
     * Turn `selected` state on/off
     */
    selected: {
      type: Boolean,
      default: false,
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
     * Icon color when `selected` is `true`
     * - @options 'current', 'primary', 'secondary', 'white'...
     * - @default 'primary'
     */
    selectedColor: {
      type: String,
      default: 'primary',
    },
    /**
     * Text below the icon
     */
    label: {
      type: String,
      default: '',
    },
  },
};
</script>

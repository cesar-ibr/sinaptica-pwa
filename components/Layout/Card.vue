<template>
  <div
    :class="[
      'shadow bg-white',
      padding,
      rounded ? 'rounded-full' : 'rounded-xl',
      clickable ? 'hover:shadow-lg cursor-pointer':''
    ]"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    padding: {
      type: String,
      default: 'p-6',
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

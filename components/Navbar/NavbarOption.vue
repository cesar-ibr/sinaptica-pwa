<template>
  <div :class="[minimal ? '' : 'flex']">
    <component
      :is="wrappingComponent"
      :to="route"
      :class="[minimal && '' || 'flex flex-grow', 'py-3', 'cursor-pointer']"
    >
      <IconButton
        v-if="iconName"
        :icon-name="iconName"
        :selected="selected"
        :label="minimal ? text : ''"
        size="big"
      />
      <p v-if="!minimal" class="self-center leading-none pl-3">
        <span v-if="text" class="" v-text="text" />
        <span v-if="subtext" class="text-sm">
          <br> {{ subtext }}
        </span>
      </p>
    </component>
    <slot
      v-if="!minimal"
      name="action"
    />
  </div>
</template>

<script>
import IconButton from '../Icon/IconButton.vue';

export default {
  components: {
    IconButton,
  },
  props: {
    /**
     * Just the name of the SVG icon file without ext
     */
    iconName: {
      type: String,
      default: '',
    },
    /**
     * Text or label for the current option
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * Text that comes below `text`. Just visible when
     * `minimal` is `false`
     */
    subtext: {
      type: String,
      default: '',
    },
    /**
     * Toggle selected state.
     * - @default `false`
     */
    selected: {
      type: Boolean,
      default: false,
    },
    /**
     * Route attribute for `router-link`
     */
    route: {
      type: [String, Object],
      default: '',
    },
    /**
     * When `minimal` is `true` the `NavbarOption` would be displayed
     * as a small `IconButton`.
     * - @default `false`
     */
    minimal: {
      type: Boolean,
      default: false,
    },
    /**
     * Determine if the `NavbarOption` should behave as a link button.
     * - @default `true`
     */
    isLinkButton: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    wrappingComponent () {
      return this.isLinkButton ? 'router-link' : 'div';
    },
  },
};
</script>

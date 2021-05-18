<template>
  <div :class="[minimal ? '' : 'flex', 'text-gray-dark']">
    <component
      :is="wrappingComponent"
      :to="route"
      :class="[minimal ? '' : 'flex flex-grow py-2', 'cursor-pointer']"
      active-class="text-primary"
    >
      <IconButton
        v-if="iconName"
        :class="{ 'flex flex-col items-center': minimal }"
        :icon-name="iconName"
        :selected="selected"
        selected-color="primary"
        :label="minimal ? text : ''"
        size="medium"
      />
      <p v-if="!minimal" class="self-center leading-none pl-3">
        <span v-if="text" class="" v-text="text" />
        <span v-if="subtext" class="text-sm font-light">
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
     * Icon ID from `sprite.svg`
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
    /**
     * Internally set `selected` state to `true` when the current
     * app route starts with the one defined in `route`
     */
    autoSelect: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    wrappingComponent () {
      return this.isLinkButton ? 'router-link' : 'div';
    },
    shouldBeSelected () {
      const matchRoute =
        Boolean(this.route.length) &&
          this.$route.path.startsWith(this.route);
      return this.selected || (this.autoSelect && matchRoute);
    },
  },
};
</script>

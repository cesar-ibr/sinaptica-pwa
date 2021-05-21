<template>
  <div class="flex flex-col">
    <label v-if="label" class="font-medium" v-text="label" />
    <input
      v-if="fType !== 'textarea'"
      :type="fType"
      :value="value"
      :name="name"
      :class="cssClasses"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="attributes"
      v-on="inputListeners"
    >
    <textarea
      v-if="fType === 'textarea'"
      :name="name"
      :value="value"
      :class="cssClasses"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="attributes"
      v-on="inputListeners"
    />
    <span
      v-if="errorMessage"
      class="text-red pl-8 font-medium"
      v-text="errorMessage"
    />
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    fType: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * Object with list of HTML input attributes
     * such as 'maxlength', 'minlength', etc.
     */
    attributes: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * If there are no errors this should be remain empty.
     */
    errorMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputListeners () {
      const vm = this;
      return Object.assign({},
        this.$listeners,
        {
          // This ensures that the component works with v-model
          input (event) {
            vm.$emit('input', event.target.value);
          },
        },
      );
    },
    cssClasses () {
      return [
        'input',
        this.fType === 'textarea' ? 'rounded-xl' : 'rounded-full',
        this.label ? 'mt-4' : '',
        this.errorMessage ? 'with--error' : '',
      ];
    },
  },
};
</script>
<style lang="postcss" scoped>
.input {
  @apply p-4 ring-2;
  @apply border border-transparent focus:outline-none focus:border-transparent;
  @apply ring-gray focus:ring-black;
}

.input.with--error {
  @apply ring-red focus:ring-red;
}
</style>

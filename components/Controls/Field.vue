<template>
  <div class="flex flex-col">
    <label v-if="label" class="font-medium" v-text="label" />
    <input
      :type="fType"
      :class="[
        'input',
        label ? 'mt-4' : '',
        errorMessage ? 'with--error' : ''
      ]"
      :placeholder="placeholder"
      v-on="inputListeners"
    >
    <span
      v-if="errorMessage"
      class="text-red text-center font-medium"
      v-text="errorMessage"
    />
  </div>
</template>
<script>
export default {
  props: {
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
     * Array with validators from 'vuelidate.js'.
     * NOTE: Not all validators are supported
     */
    validators: {
      type: Array,
      default: () => [],
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
  },
};
</script>
<style lang="postcss" scoped>
.input {
  @apply p-4 rounded-full ring-2;
  @apply border border-transparent focus:outline-none focus:border-transparent;
  @apply ring-gray focus:ring-black;
}

.input.with--error {
  @apply ring-red focus:ring-red;
}
</style>

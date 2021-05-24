<template>
  <div v-if="isOpen" class="modal-wrapper">
    <div class="modal-overlay">
      <Card class="modal-container w-1/2 lg:w-3/12">
        <slot />
        <div class="flex justify-around">
          <Button
            light
            color="gray"
            @click="cancelHandler"
            v-text="cancelButtonText"
          />
          <Button
            @click="okHandler"
            v-text="okButtonText"
          />
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import Card from '@/components/Layout/Card';
import Button from '@/components/Button/Button';

export default {
  components: {
    Card,
    Button,
  },
  props: {
    isOpen: {
      type: Boolean,
      defualt: false,
    },
    cancelButtonText: {
      type: String,
      default: 'Cancelar',
    },
    okButtonText: {
      type: String,
      default: 'Aceptar',
    },
  },
  methods: {
    cancelHandler () {
      this.$emit('cancel');
    },
    okHandler () {
      this.$emit('ok');
    },
  },
};
</script>
<style lang="postcss" scoped>
.modal-wrapper {
  @apply pointer-events-none items-center justify-center;
  @apply fixed w-full h-full top-0 left-0 flex;
}
.modal-overlay {
  @apply absolute w-full h-full bg-black bg-opacity-50 pt-20;
}
.modal-container {
  @apply z-50 m-auto pointer-events-auto;
}
</style>

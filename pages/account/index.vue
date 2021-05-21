<template>
  <Card class="m-auto flex flex-col mt-10">
    <h1 class="mb-4">
      Actualiza tu Perfil
    </h1>
    <Field
      f-type="text"
      name="Name"
      label="Nombre"
      class="mb-4"
      placeholder="Ana María, Luis Angel, José Roberto"
      :error-message="requiredErrorMsg('userName')"
      :attributes="{ maxlength: 50, value: profile.name }"
      @input="userName = $event"
    />
    <Field
      v-model.trim="headline"
      f-type="text"
      name="headline"
      label="Profesión (Encabezado)"
      class="mb-4"
      placeholder="Programador Web, Analísta de Datos, Mecatrónica"
      :error-message="requiredErrorMsg('headline')"
      :attributes="{ maxlength: 50 }"
    />
    <Field
      v-model.trim="description"
      f-type="textarea"
      name="description"
      label="Sobre ti"
      class="mb-4"
      placeholder="Programo robots 🤖..."
      :error-message="requiredErrorMsg('description')"
      :attributes="{ rows: 2, cols: 40, maxlength: 300 }"
    />
    <Button
      class="self-end"
      @click="saveProfile"
    >
      Continuar
    </Button>
  </Card>
</template>
<router>
{
  alias: ['/profile']
}
</router>
<script>
import Card from '@/components/Layout/Card';
import Field from '@/components/Controls/Field';
import { mapState } from 'vuex';

export default {
  components: {
    Field,
    Card,
  },
  middleware: ['auth'],
  data () {
    return {
      userName: '',
      headline: '',
      description: '',
      saveClicked: false,
    };
  },
  computed: {
    ...mapState('auth', ['profile']),
  },
  methods: {
    requiredErrorMsg (field) {
      if (!this.saveClicked) { return ''; }
      return this[field] === '' ? 'Este campo es requerido' : '';
    },
    formInvalid () {
      return [this.userName, this.headline, this.description].includes(val => val === '');
    },
    saveProfile () {
      this.saveClicked = true;
      if (this.formInvalid()) {
        return false;
      }
      // TODO: Save profile info
    },
  },
};
</script>

<template>
  <Card class="m-auto flex flex-col mt-10">
    <h1 class="mb-4">
      Actualiza tu perfil
    </h1>
    <Field
      v-model.trim="form.name"
      f-type="text"
      name="Name"
      label="Nombre"
      class="mb-4"
      placeholder="Ana María, Luis Angel, José Roberto"
      :error-message="requiredErrorMsg('name')"
      :attributes="{ maxlength: 50 }"
    />
    <Field
      v-model.trim="form.role"
      f-type="text"
      name="userRole"
      label="Headline (Rol, Profesión o Hobby)"
      class="mb-4"
      placeholder="Programador Web, Analísta de Datos, Mecatrónica"
      :error-message="requiredErrorMsg('role')"
      :attributes="{ maxlength: 50 }"
    />
    <Field
      v-model.trim="form.description"
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
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Field,
    Card,
  },
  middleware: ['auth'],
  data () {
    return {
      form: {
        name: '',
        role: '',
        description: '',
      },
      saveClicked: false,
    };
  },
  computed: {
    ...mapState('auth', ['authUser', 'profile']),
  },
  mounted () {
    const { name = '', role = '', description = '' } = this.profile;
    this.form.name = name;
    this.form.role = role;
    this.form.description = description || this.profile?.bio || '';
  },
  methods: {
    ...mapActions('auth', ['setUserProfile']),

    requiredErrorMsg (field) {
      if (!this.saveClicked) { return ''; }
      return this.form[field] === '' ? 'Es necesario agregar esta información' : '';
    },
    formInvalid () {
      return Object.values(this.form).includes('');
    },
    async saveProfile () {
      this.saveClicked = true;
      if (this.formInvalid()) {
        return false;
      }
      const profile = Object.assign({}, this.profile, this.form);
      try {
        await this.setUserProfile({
          uid: this.authUser.uid,
          profile,
        });
        this.$toast('Perfil actualizado ✅');
      } catch (e) {
        // TODO: Log errors
        // console.error(e);
      }
    },
  },
};
</script>

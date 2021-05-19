<template>
  <Card class="m-auto w-11/12 lg:w-2/6 flex flex-col mt-10">
    <template v-if="!loginWithEmail">
      <h1 class="mb-8 text-center">
        Ingresa con una de las siguientes opciones
      </h1>
      <Card class="mb-4" rounded clickable>
        <p>
          <Icon
            icon-name="google"
            class="inline mr-4"
            size="medium"
          />
          Cuenta de Google
        </p>
      </Card>
      <Card class="mb-4" rounded clickable>
        <p>
          <Icon
            icon-name="github"
            class="inline mr-4"
            size="medium"
          />
          Cuenta de GitHub
        </p>
      </Card>
      <Card
        class="mb-4"
        rounded
        clickable
        @click="loginWithEmail = true"
      >
        <p>
          <Icon
            icon-name="email"
            class="inline mr-4"
            size="medium"
          />
          Email
        </p>
      </Card>
    </template>
    <template v-if="loginWithEmail && !emailSent">
      <Field
        v-model.trim="userEmail"
        f-type="email"
        label="Ingresa tu Email"
        class="mb-4"
        placeholder="micuenta@email.com"
        :error-message="emailError"
      />
      <Button
        class="self-end"
        :disabled="$v.userEmail.$invalid"
        @click="emailSent = true"
      >
        Continuar
      </Button>
    </template>
    <template v-if="emailSent">
      <h1 class="text-center mb-4">
        ¡Listo! 📨
      </h1>
      <p>Revisa tu bandeja de entrada y da click en el link que te enviamos a tu correo</p>
    </template>
  </Card>
</template>
<script>
import Icon from '@/components/Icon/Icon';
import Card from '@/components/Layout/Card';
import Button from '@/components/Button/Button';
import Field from '@/components/Controls/Field';
import { required, email } from 'vuelidate/lib/validators';

export default {
  components: {
    Icon,
    Card,
    Button,
    Field,
  },
  layout: 'void',
  data () {
    return {
      loginWithEmail: false,
      emailSent: false,
      userEmail: '',
    };
  },
  validations: {
    userEmail: {
      required,
      email,
    },
  },
  computed: {
    emailError () {
      if (!this.$v.userEmail.$invalid) { return ''; }
      return 'Ingresa una dirección de correo válida';
    },
  },
};
</script>

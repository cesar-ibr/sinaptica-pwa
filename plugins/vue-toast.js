import Vue from 'vue';
import Toast from 'vue-toastification';
// Custom CSS
import '@/assets/css/vue-toast.css';

const options = {
  icon: false,
};

Vue.use(Toast, options);

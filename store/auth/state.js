import { getKey } from '@/utils/local-storage';

export default () => ({
  signInEmail: getKey('signInEmail'),
  authUser: {
    email: '',
  },
  profile: {
    name: '',
    role: '',
    description: '',
  },
});

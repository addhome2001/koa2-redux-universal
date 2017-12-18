import FormHOC from './FormHOC';

export default FormHOC({
  initialState: {
    email: '',
    username: '',
    password: '',
    page: 'Register',
  },
  errorMessage: 'Maybe you\'re missing something.',
});

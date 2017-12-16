import FormHOC from './FormHOC';

export default FormHOC({
  page: 'Register',
  initialState: {
    email: '',
    username: '',
    password: '',
  },
  errorMessage: 'Maybe you\'re missing something.',
});

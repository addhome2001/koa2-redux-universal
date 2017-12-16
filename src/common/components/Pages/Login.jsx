import FormHOC from './FormHOC';

export default FormHOC({
  page: 'Login',
  initialState: {
    username: '',
    password: '',
  },
  errorMessage: 'Invalid username or password.',
});

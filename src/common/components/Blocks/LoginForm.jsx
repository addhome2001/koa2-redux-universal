import FormHOC from 'common/components/Blocks/FormHOC';

export default FormHOC({
  initialState: {
    username: '',
    password: '',
  },
  page: 'Login',
  errorMessage: 'Invalid username or password.',
});

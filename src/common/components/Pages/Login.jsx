import React from 'react';
import LoginForm from 'common/containers/LoginForm';
import FormHOC from 'common/components/Blocks/FormHOC';
import Buttons from 'common/components/Layouts/Buttons';
import Btn from 'common/components/Elements/Btn';

const Form = LoginForm(
  FormHOC({
    initialState: {
      username: '',
      password: '',
    },
    page: 'Login',
    errorMessage: 'Invalid username or password.',
  }),
);

export default () => (
  <Form>
    {({ submit, loading }) => (
      <Buttons direction="column">
        <Btn purpose={submit} disabled={loading}>
          Login
        </Btn>
        <Btn purpose="/auth/facebook" external>
          Facebook
        </Btn>
        <Btn purpose="/auth/google" external>
          Google
        </Btn>
        <Btn purpose="/forgot" disabled={loading}>
          Forgot Password
        </Btn>
        <Btn rootLink disabled={loading}>
          Back
        </Btn>
      </Buttons>
    )}
  </Form>
);

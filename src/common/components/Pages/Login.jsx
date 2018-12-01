import React from 'react';
import * as Actions from 'common/redux/modules/auth/actions';
import makeFormController from 'common/components/Blocks/makeFormController';
import initForm from 'common/components/Blocks/initForm';
import Buttons from 'common/components/Layouts/Buttons';
import Btn from 'common/components/Elements/Btn';

const Form = makeFormController(
  Actions.loginAsync,
  Actions.setFailureMessage,
  initForm({
    initialState: {
      email: '',
      password: '',
    },
    page: 'Login',
    errorMessage: 'Invalid email or password.',
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

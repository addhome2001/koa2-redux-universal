import React from 'react';
import Btn from 'common/components/Elements/Btn';
import * as Actions from 'common/redux/modules/auth/actions';
import makeFormController from 'common/components/Blocks/makeFormController';
import initForm from 'common/components/Blocks/initForm';

const Form = makeFormController(
  Actions.resetPasswordAsync,
  Actions.setFailureMessage,
  initForm({
    initialFormFields: {
      password: '',
    },
    page: 'Reset Password',
    errorMessage: 'Maybe the passowrd field was empty.',
  }),
);

export default () => (
  <Form>
    {({ submit, loading }) => (
      <Btn purpose={submit} disabled={loading}>
        Submit
      </Btn>
    )}
  </Form>
);

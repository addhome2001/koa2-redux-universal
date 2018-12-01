import React from 'react';
import * as Actions from 'common/redux/modules/auth/actions';
import makeFormController from 'common/components/Blocks/makeFormController';
import initForm from 'common/components/Blocks/initForm';
import Buttons from 'common/components/Layouts/Buttons';
import Btn from 'common/components/Elements/Btn';

const Form = makeFormController(
  Actions.registerAsync,
  Actions.setFailureMessage,
  initForm({
    initialState: {
      email: '',
      username: '',
      password: '',
    },
    page: 'Register',
    errorMessage: "Maybe you're missing something.",
  }),
);

export default () => (
  <Form>
    {({ submit, loading }) => (
      <Buttons direction="column">
        <Btn purpose={submit} disabled={loading}>
          Submit
        </Btn>
        <Btn rootLink disabled={loading}>
          Back
        </Btn>
      </Buttons>
    )}
  </Form>
);

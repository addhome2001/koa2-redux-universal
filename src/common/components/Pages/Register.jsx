import React from 'react';
import RegisterForm from 'common/containers/RegisterForm';
import FormHOC from 'common/components/Blocks/FormHOC';
import Buttons from 'common/components/Layouts/Buttons';
import Btn from 'common/components/Elements/Btn';

const Form = RegisterForm(
  FormHOC({
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

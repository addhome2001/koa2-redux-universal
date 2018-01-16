import React from 'react';
import Btn from 'common/components/Elements/Btn';
import FormHOC from 'common/components/Blocks/FormHOC';
import resetForm from 'common/containers/ResetForm';

const Form = resetForm(
  FormHOC({
    initialState: {
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

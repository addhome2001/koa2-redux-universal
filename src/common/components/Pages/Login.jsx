import React from 'react';
import LoginForm from 'common/containers/LoginForm';
import Buttons from 'common/components/Layouts/Buttons';
import Btn from 'common/components/Elements/Btn';

export default () => (
  <LoginForm>
    {
      ({ submit, loading }) => (
        <Buttons direction="column">
          <Btn purpose={ submit } disabled={ loading }>Logn</Btn>
          <Btn purpose="/auth/facebook" external>Facebook</Btn>
          <Btn purpose="/auth/google" external>Google</Btn>
          <Btn rootLink disabled={ loading }>Back</Btn>
        </Buttons>
      )
    }
  </LoginForm>
);

import React from 'react';
import RegisterForm from 'common/containers/RegisterForm';
import Buttons from 'common/components/Layouts/Buttons';
import Btn from 'common/components/Elements/Btn';

export default () => (
  <RegisterForm>
    {
      ({ submit, loading }) => (
        <Buttons direction="column">
          <Btn purpose={ submit } disabled={ loading }>Submit</Btn>
          <Btn rootLink disabled={ loading }>Back</Btn>
        </Buttons>
      )
    }
  </RegisterForm>
);

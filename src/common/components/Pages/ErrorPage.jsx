import React from 'react';
import Btn from 'common/components/Elements/Btn';
import Text from 'common/components/Elements/Text';

const ErrorPage = () => (
  <div>
    <Text>Invalid Username or Password</Text>
    <Btn to="/login">Login Again</Btn>
  </div>
);

export default ErrorPage;

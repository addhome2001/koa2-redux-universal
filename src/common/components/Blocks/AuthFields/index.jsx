import React from 'react';
import Btn from 'common/components/Elements/Btn';

import './AuthFields.css';

const AuthFields = () => (
  <div styleName="authFields">
    <Btn purpose="/login">Login</Btn>
    <Btn purpose="/register">Register</Btn>
  </div>
);

export default AuthFields;

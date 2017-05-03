import React from 'react';
import Btn from 'common/components/Btn';

import '../assets/css/app.css';

const AuthFields = () =>
  <div styleName="authFields">
    <Btn purpose="/login">Login</Btn>
    <a href="/auth/google" styleName="btn">
      Google
    </a>
    <a href="/auth/facebook" styleName="btn">
      Facebook
    </a>
    <Btn purpose="/register">Register</Btn>
  </div>;

export default AuthFields;

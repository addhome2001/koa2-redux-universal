import React from 'react';
import Btn from 'common/components/Btn';

import '../assets/css/app.css';

const ErrorPage = () =>
  <div>
    <p styleName="mainText">Invalid Username or Password</p>
    <Btn to="/login">Login Again</Btn>
  </div>;

export default ErrorPage;

import React from 'react';
import Btn from '~/common/components/Btn.jsx';
import styles from '~/common/assets/css/app.css';

const ErrorPage = () =>
  <div>
    <p className={ styles.mainText }>Invalid Username or Password</p>
    <Btn to="/login">Login Again</Btn>
  </div>;

export default ErrorPage;

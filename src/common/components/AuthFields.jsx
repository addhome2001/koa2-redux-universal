import React from 'react';
import Btn from '~/common/components/Btn.jsx';
import styles from '~/common/assets/css/app.css';

const AuthFields = () =>
  <div className={ styles.authFields }>
    <Btn purpose="/login">Login</Btn>
    <a href="/auth/google" className={ styles.btn }>
      Google
    </a>
    <a href="/auth/facebook" className={ styles.btn }>
      Facebook
    </a>
    <Btn purpose="/register">Register</Btn>
  </div>;

export default AuthFields;

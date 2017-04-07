import React from 'react';
import Btn from 'common/components/Btn';
import styles from 'common/assets/css/app.css';

const NotFound = () =>
  <div>
    <p className={ styles.mainText }>Page Not Found</p>
    <Btn rootLink>Home</Btn>
  </div>;

export default NotFound;

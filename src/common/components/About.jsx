import React from 'react';
import Btn from '~/common/components/Btn.jsx';
import styles from '~/common/assets/css/app.css';

const About = () =>
  <div>
    <p className={ styles.mainText }>About</p>
    <Btn rootLink>Home</Btn>
  </div>;

export default About;

import React, { PropTypes } from 'react';
import styles from 'common/assets/css/app.css';

const Master = ({ children }) =>
  <div className={ styles.container }>
    <div className={ styles.content }>
      <p className={ styles.title }>Universal Redux</p>
      { children }
    </div>
  </div>;

Master.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Master;

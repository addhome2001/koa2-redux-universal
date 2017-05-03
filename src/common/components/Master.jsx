import React from 'react';
import PropTypes from 'prop-types';

import '../assets/css/app.css';

const Master = ({ children }) =>
  <div styleName="container">
    <div styleName="content">
      <p styleName="title">Universal Redux</p>
      { children }
    </div>
  </div>;

Master.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Master;

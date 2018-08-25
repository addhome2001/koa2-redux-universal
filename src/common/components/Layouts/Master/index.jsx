import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Master.css';

const Master = ({ children }) => (
  <section styleName="wrapper">
    <Link styleName="logo" to="/">
      Universal Redux
    </Link>
    <div styleName="content">{children}</div>
  </section>
);

Master.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Master;

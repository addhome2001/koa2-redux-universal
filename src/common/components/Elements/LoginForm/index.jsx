import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'common/utils/transform';

import './LoginForm.css';

const LoginForm = ({ scopes }) =>
  <section styleName="form">
    {
      scopes.map(type =>
        <input
          key={ `${type}-field` }
          styleName="scope"
          onChange={ this.handleInputChange }
          name={ type }
          type={ type }
          placeholder={ capitalize(type) }
          value={ this.state[type] || '' }
        />,
     )
    }
  </section>;

LoginForm.propTypes = {
  scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LoginForm;

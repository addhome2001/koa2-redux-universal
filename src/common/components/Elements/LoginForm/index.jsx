import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'common/utils/transform';

import './LoginForm.css';

const LoginForm = ({ scopes, changeHandler, typeValues }) =>
  <section styleName="form">
    {
      scopes.map(type =>
        <input
          key={ `${type}-field` }
          styleName="scope"
          onChange={ changeHandler }
          name={ type }
          type={ type }
          placeholder={ capitalize(type) }
          value={ typeValues[type] || '' }
        />,
     )
    }
  </section>;

LoginForm.propTypes = {
  scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeHandler: PropTypes.func.isRequired,
  typeValues: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default LoginForm;

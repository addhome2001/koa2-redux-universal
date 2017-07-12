import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'common/utils';

import './LoginForm.css';

const LoginForm = ({ scopes, changeHandler, typeValues, disabled }) =>
  <section styleName={ `form ${disabled ? 'disabled' : ''}` }>
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
          disabled={ disabled }
        />,
     )
    }
  </section>;

LoginForm.propTypes = {
  scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeHandler: PropTypes.func.isRequired,
  typeValues: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default LoginForm;

import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'common/utils';

import './Form.css';

const Form = ({ scopes, changeHandler, typeValues, disabled }) => (
  <section styleName={`form ${disabled ? 'disabled' : ''}`}>
    {scopes.map((type) => (
      <div styleName="form-group" key={`${type}-form`}>
        <input
          key={`${type}-field`}
          id={type}
          styleName="form-control"
          onChange={changeHandler}
          name={type}
          type={type}
          placeholder={capitalize(type)}
          value={typeValues[type] || ''}
          disabled={disabled}
        />
      </div>
    ))}
  </section>
);

Form.propTypes = {
  scopes: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeHandler: PropTypes.func.isRequired,
  typeValues: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Form;

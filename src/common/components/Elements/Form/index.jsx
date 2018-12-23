import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'common/utils/capitalize';

import './Form.css';

const Form = ({ formFieldKeys, changeHandler, formFields, disabled }) => (
  <section styleName={`form ${disabled ? 'disabled' : ''}`}>
    {formFieldKeys.map((type) => (
      <div styleName="form-group" key={`${type}-form`}>
        <input
          key={`${type}-field`}
          id={type}
          styleName="form-control"
          onChange={changeHandler}
          name={type}
          type={type}
          placeholder={capitalize(type)}
          value={formFields[type] || ''}
          disabled={disabled}
        />
      </div>
    ))}
  </section>
);

Form.propTypes = {
  formFieldKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeHandler: PropTypes.func.isRequired,
  formFields: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Form;

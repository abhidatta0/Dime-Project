import React, { Component } from 'react';
import Style from './style.module.scss';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      name,
      label,
      type,
      onChange,
      value,
      minValue,
      maxValue,
    } = this.props;
    return (
      <div className={Style.inputDiv}>
        <label htmlFor={name} className={Style.label}>
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          className={Style.input}
          onChange={onChange}
          value={value}
          min={minValue}
          max={maxValue}
        />
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
  minValue: PropTypes.string,
  maxValue: PropTypes.string,
};

export default Input;

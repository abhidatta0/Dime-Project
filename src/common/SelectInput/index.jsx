import React, { Component } from 'react';
import Style from './style.module.scss';
import PropTypes from 'prop-types';

class SelectInput extends Component {
  render() {
    const { name, label, options, onChange, value } = this.props;
    return (
      <div className={Style.selectDiv}>
        <label htmlFor={name} className={Style.label}>
          {label}
        </label>
        <select
          className={Style.select}
          onChange={onChange}
          value={value}
          name={name}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.displayName}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

SelectInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
};

export default SelectInput;

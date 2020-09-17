import React, { Component } from 'react';
import Style from './style.module.scss';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      type,
      onClick,
      text,
      imgSrc,
      customButtonStyle,
      customImgStyle,
      disabled,
    } = this.props;
    return (
      <div onClick={onClick}>
        {imgSrc ? (
          <img src={imgSrc} alt="" className={`${customImgStyle}`} />
        ) : null}
        <button
          type={type}
          className={`${Style.button} ${customButtonStyle}`}
          disabled={disabled}
        >
          {text}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  imgSrc: PropTypes.string,
  customButtonStyle: PropTypes.string,
  customImgStyle: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from './style.module.scss';
import Button from '../../common/Button/index.jsx';

class SubcriptionDetailsCard extends Component {
  getFrequency = () => {
    const { cycle } = this.props;
    let frequency;
    if (cycle === 'm') frequency = 'monthly';
    else if (cycle === 'y') frequency = 'yearly';
    return frequency;
  };

  daysLeftForMonthly(date, month) {
    let currentDate = new Date().getDate();
    if ((date === 29 || date === 30 || date === 31) && month === 1) {
      date = 1;
      return 30 - currentDate;
    }
    let difference = 0;
    if (currentDate < date) {
      difference = date - currentDate + 1;
    } else if (currentDate > date) {
      difference = date + 31 - currentDate;
    } else {
      return 30;
    }
    return difference;
  }

  daysLeftForYearly(date, month) {
    const currentYear = new Date().getFullYear();
    if ((date === 29 || date === 30 || date === 31) && month === 1) {
      date = 1;
      month = month + 1;
    }
    let date2 = new Date(currentYear + 1, month, date);
    let date1 = new Date();
    var difference = Math.round((date2 - date1) / (1000 * 3600 * 24));
    return difference;
  }

  getDaysLeft = () => {
    const { startdate, cycle } = this.props;
    const startDateObject = new Date(startdate);
    const date = startDateObject.getDate();
    const month = startDateObject.getMonth();
    let daysLeft;
    if (cycle === 'm') {
      daysLeft = this.daysLeftForMonthly(date, month);
    } else if (cycle === 'y') {
      daysLeft = this.daysLeftForYearly(date, month);
    }
    return daysLeft;
  };

  getSeverityColor = () => {
    let daysLeft = this.getDaysLeft();
    let severetityBorderColor;
    if (daysLeft <= 7) {
      severetityBorderColor = '#fc0303';
    } else if (daysLeft <= 14) {
      severetityBorderColor = '#1a0de2';
    } else {
      severetityBorderColor = '#006e18';
    }
    return severetityBorderColor;
  };

  render() {
    const { amount, serviceName, startdate, onDelete } = this.props;
    const customCircleSyle = { color: this.getSeverityColor() };
    return (
      <div className={Style.detailCard}>
        <h1 className={Style.serviceInfo}>
          {serviceName}
          <span className={Style.spanText}>({this.getFrequency()})</span>
        </h1>
        <span className={Style.circle} style={customCircleSyle}>
          {this.getDaysLeft()}
        </span>
        <p>Started: {startdate}</p>
        <p>Rs: {amount}</p>
        <Button
          text="Remove"
          customButtonStyle={Style.customButtonStyle}
          onClick={onDelete}
        />
      </div>
    );
  }
}

SubcriptionDetailsCard.propTypes = {
  amount: PropTypes.string,
  cycle: PropTypes.string,
  serviceName: PropTypes.string,
  startdate: PropTypes.string,
  onDelete: PropTypes.func,
};

export default SubcriptionDetailsCard;

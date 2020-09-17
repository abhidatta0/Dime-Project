import React, { Component } from 'react';
import Style from './style.module.scss';
import Input from '../../common/Input';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import SubscriptionsActions from '../../actions/subscriptionsActions';
import SelectInput from '../../common/SelectInput';
import Button from '../../common/Button/index';

class AddSubscriptionForm extends Component {
  constructor(props) {
    super(props);

    this.serviceOptions = [
      {
        value: 'NFLX',
        displayName: 'Netflix',
      },
      {
        value: 'DIS',
        displayName: 'Disney+',
      },
      {
        value: 'SPOT',
        displayName: 'Spotify',
      },
      {
        value: 'others',
        displayName: 'Others',
      },
    ];
    this.billingCycle = [
      {
        value: 'm',
        displayName: 'Monthly (30 days)',
      },
      {
        value: 'y',
        displayName: 'Yearly (365 days)',
      },
    ];
    this.initialValues = {
      servicename: this.serviceOptions[0].value,
      customServiceName: '',
      startdate: '',
      cycle: this.billingCycle[0].value,
      amount: '',
      showCustomServiceInput: false,
      isValidForm: false,
      errors: {},
    };
    this.state = {
      servicename: this.serviceOptions[0].value,
      customServiceName: '',
      startdate: '',
      cycle: this.billingCycle[0].value,
      amount: '',
      showCustomServiceInput: false,
      isValidForm: false,
      errors: {},
      fromDate: new Date().toISOString().substr(0, 10),
    };
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        this.validate();
      }
    );
  };

  handleServiceChange = (e) => {
    const v = e.target.value;
    this.setState({ servicename: v }, () => {
      let showCustomService = false;
      this.state.servicename === 'others'
        ? (showCustomService = true)
        : (showCustomService = false);
      this.setState({
        ...this.initialValues,
        servicename: v,
        showCustomServiceInput: showCustomService,
      });
    });
  };

  validate = () => {
    const {
      startdate,
      amount,
      customServiceName,
      showCustomServiceInput,
    } = this.state;
    if (
      startdate === '' ||
      amount <= 0 ||
      (showCustomServiceInput && customServiceName === '')
    ) {
      this.setState({ isValidForm: false });
      let err = {
        bottomText:
          'All fields are mandatory and amount shall be greater than 0',
      };
      this.setState({ errors: err });
    } else {
      this.setState({ isValidForm: true });
      this.setState({ errors: {} });
    }
  };

  handleSaveButtonClick = () => {
    const serviceObject = this.serviceOptions.find(
      (so) => so.value === this.state.servicename
    );
    const { amount, cycle, startdate, customServiceName } = this.state;
    const savedSubscriptionInfo = {
      serviceName: serviceObject.displayName,
      amount,
      startdate,
      cycle,
      id: uuidv4(),
    };
    if (this.state.servicename === 'others') {
      savedSubscriptionInfo.serviceName = customServiceName;
    }
    const { addSubscription } = this.props;
    addSubscription(savedSubscriptionInfo);
    this.props.onCancel();
  };

  render() {
    const { onCancel } = this.props;
    const {
      servicename,
      cycle,
      startdate,
      amount,
      customServiceName,
      showCustomServiceInput,
      isValidForm,
      errors,
      fromDate,
    } = this.state;
    return (
      <form className={Style.formDiv}>
        <SelectInput
          name="servicename"
          label="Service Name"
          options={this.serviceOptions}
          onChange={this.handleServiceChange}
          value={servicename}
        />
        {showCustomServiceInput && (
          <Input
            type="input"
            label="Enter service name"
            name="customServiceName"
            onChange={this.handleChange}
            value={customServiceName}
          />
        )}
        <Input
          type="date"
          label="Start Date"
          name="startdate"
          onChange={this.handleChange}
          value={startdate}
          maxValue={fromDate}
        />
        <SelectInput
          name="cycle"
          label="Cycle"
          options={this.billingCycle}
          onChange={this.handleChange}
          value={cycle}
        />
        <Input
          type="number"
          label="Amount (in Indian Rupees)"
          name="amount"
          onChange={this.handleChange}
          value={amount}
        />
        {!isValidForm && <div className={Style.error}>{errors.bottomText}</div>}
        <div className={Style.cancelSaveButtonWrapper}>
          <Button
            type="button"
            text="Cancel"
            customButtonStyle={Style.customButtonStyle}
            onClick={() => onCancel()}
          />
          <Button
            type="button"
            text="Save"
            customButtonStyle={Style.customButtonStyle}
            onClick={this.handleSaveButtonClick}
            disabled={!isValidForm}
          />
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSubscription: (subscription) =>
      dispatch(SubscriptionsActions.setSubscription(subscription)),
  };
};

AddSubscriptionForm.propTypes = {
  addSubscription: PropTypes.func,
  onCancel: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(AddSubscriptionForm);

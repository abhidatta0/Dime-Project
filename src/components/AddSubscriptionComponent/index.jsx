import React, { Component } from 'react';
import Style from './style.module.scss';
import Button from '../../common/Button/index.jsx';
import AddSubscriptionForm from './AddSubscriptionForm';

class AddSubscriptionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      showFormText: 'Add new subscription',
    };
  }

  handleAddButtonClick = () => {
    this.setState({ showForm: true, showFormText: 'Subscription Details' });
  };

  handleCancel = () => {
    this.setState({ showForm: false, showFormText: 'Add new subscription' });
  };

  render() {
    const { showForm, showFormText } = this.state;
    return (
      <div className={Style.mainDiv}>
        <Button
          type="button"
          text={showFormText}
          customButtonStyle={Style.customButtonStyle}
          onClick={this.handleAddButtonClick}
        />
        {showForm && <AddSubscriptionForm onCancel={this.handleCancel} />}
      </div>
    );
  }
}

export default AddSubscriptionComponent;

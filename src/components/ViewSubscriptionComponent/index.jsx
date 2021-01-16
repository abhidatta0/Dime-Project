import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubcriptionDetailsCard from './SubcriptionDetailsCard';
import SubscriptionsActions from '../../actions/subscriptionsActions';
import Style from './style.module.scss';

class ViewSubscriptionComponent extends Component {
  handleOnDelete = (id) => {
    const { deleteSubscriptionById } = this.props;
    deleteSubscriptionById(id);
  };
  render() {
    const { subscriptions } = this.props;
    const totalPermonth = subscriptions.reduce((acc, sub) => {
      const { cycle, amount } = sub;
      if (cycle === 'y') {
        return acc + parseInt(amount) / 12;
      }
      else {
        return acc + parseInt(amount)
      }
    }, 0);
    const cardViewHtml = 
      subscriptions ? (
        <>
          {subscriptions.map((subscription) => (
            <SubcriptionDetailsCard
              key={subscription.id}
              {...subscription}
              onDelete={() => this.handleOnDelete(subscription.id)}
            />
          ))}
        </>
      ) : (
          <div
            style={{ color: '#ff6347', fontWeight: '500', textAlign: 'center' }}
          >
            <p>No subscriptions added yet!</p>
          </div>
        );
    return <div className={Style.wrapperDiv}>
      <div className={Style.headerDiv}>Total amount per month : <span className={Style.highlight}>  ₹ {totalPermonth.toFixed(2)}</span></div>
      <div className={Style.subscriptionsContainer}>
        {cardViewHtml}
      </div>
    </div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSubscriptionById: (id) =>
      dispatch(SubscriptionsActions.deleteSubscription(id)),
  };
};

const mapStateToProps = (state) => ({
  subscriptions: state.subscriptionDataReducer.subscriptions,
});

ViewSubscriptionComponent.propTypes = {
  deleteSubscriptionById: PropTypes.func,
  subscriptions: PropTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewSubscriptionComponent);

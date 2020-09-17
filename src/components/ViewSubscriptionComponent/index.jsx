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
    const element =
      subscriptions.length > 0 ? (
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
    return <div className={Style.subscriptionsContainer}>{element}</div>;
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

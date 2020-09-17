export const SubscriptionsActionTypes = {
  SET_SUBSCRIPTION: 'set subscription',
  DELETE_SUBSCRIPTION: 'delete subscription',
};

class SubscriptionsActions {
  setSubscription(subscription) {
    return {
      type: SubscriptionsActionTypes.SET_SUBSCRIPTION,
      data: subscription,
    };
  }

  deleteSubscription(id) {
    return {
      type: SubscriptionsActionTypes.DELETE_SUBSCRIPTION,
      id,
    };
  }
}

export default new SubscriptionsActions();

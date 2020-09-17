import { SubscriptionsActionTypes } from '../actions/subscriptionsActions';

const initState = {
  subscriptions: [],
};

const SubscriptionDataReducer = (state = initState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SubscriptionsActionTypes.SET_SUBSCRIPTION: {
      const { data } = action;
      newState = {
        ...newState,
        subscriptions: [...newState.subscriptions, data],
      };
      console.log('Saved state ', newState);
      break;
    }
    case SubscriptionsActionTypes.DELETE_SUBSCRIPTION: {
      const { id } = action;
      const newSubscriptions = newState.subscriptions.filter(
        (subs) => subs.id !== id
      );
      newState = {
        ...newState,
        subscriptions: newSubscriptions,
      };
      console.log('Saved state ', newState);
      break;
    }
    default: {
      break;
    }
  }
  return newState;
};

export default SubscriptionDataReducer;

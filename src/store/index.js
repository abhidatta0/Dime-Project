import { createStore } from 'redux';
import RootReducer from '../reducers/index';
import { loadState, saveState } from '../helpers/localStorage';
import { throttle } from 'lodash';

const persistedState = loadState();
const store = createStore(RootReducer, persistedState);

store.subscribe(
  throttle(() => {
    saveState({
      subscriptionDataReducer: store.getState().subscriptionDataReducer,
    });
  },1000),
);

export default store;

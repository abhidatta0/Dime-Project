import { combineReducers } from 'redux';
import subscriptionDataReducer from './subscriptionDataReducer';

const appReducer = combineReducers({
  subscriptionDataReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;

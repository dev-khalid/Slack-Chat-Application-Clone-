import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/authReducers';
import { channelReducer } from './reducers/channelReducers';
const reducer = combineReducers({
  auth: authReducer,
  channel: channelReducer,
});

const initialState = {};
const middlewares = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

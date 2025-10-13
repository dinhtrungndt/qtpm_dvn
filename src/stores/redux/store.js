import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { setStore } from './actions/userActions';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  auth: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
setStore(store);

export default store;

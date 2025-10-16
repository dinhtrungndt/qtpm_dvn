import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import cartReducer from './reducers/cartReducer';
import dashboardReducer from './reducers/dashboardReducer';
import orderReducer from './reducers/orderReducer';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

export const configureStore = () => {
  return store;
};

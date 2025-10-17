import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import cartReducer from './reducers/cartReducer';
import dashboardReducer from './reducers/dashboardReducer';
import orderReducer from './reducers/orderReducer';
import paymentsReducer from './reducers/paymentsReducer';
import productReducer from './reducers/productReducer';
import themeReducer from './reducers/themeReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  payments: paymentsReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

export const configureStore = () => {
  return store;
};

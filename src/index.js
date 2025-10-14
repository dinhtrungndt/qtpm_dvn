import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { setStore } from './stores/redux/actions/userActions';
import store, { configureStore } from './stores/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const configuredStore = configureStore();
setStore(configuredStore);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

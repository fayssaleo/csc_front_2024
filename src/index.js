import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store, persistor } from '../src/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import 'react-toastify/dist/ReactToastify.css';



ReactDOM.render(
  <Provider store={store} >
    <PersistGate persistor={persistor} loading={<LoadingOverlay />}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


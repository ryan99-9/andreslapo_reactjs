import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import allReducer from './redux/reducers'
import ReduxThunk from 'redux-thunk'

const globalState = createStore(allReducer, applyMiddleware(ReduxThunk))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={globalState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);




import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store.js';
import Root from './components/root.jsx';
import Modal from 'react-modal';
import {fetchTracks} from './actions/track_actions';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;

  if (window.currentUser) {
    const preLoadedState = { session: { currentUser: window.currentUser, errors: [] } };
    store = configureStore(preLoadedState);
    window.store = store;
  }
  else {
    store = configureStore();
  }

  Modal.setAppElement(root);
  ReactDOM.render(<Root store={store} />, root);
});

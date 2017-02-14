import React from 'react';
import { combineReducers } from 'redux';
import sessionReducer from './sessions_reducer';

export default combineReducers({ session: sessionReducer });

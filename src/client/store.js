/* eslint-disable no-underscore-dangle */
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from 'common/redux/createStore';

const preloadedState = window.__PRELOADED_STATE__;

export const store = createStore(browserHistory, preloadedState);
export const history = syncHistoryWithStore(browserHistory, store);

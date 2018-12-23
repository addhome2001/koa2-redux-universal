/* eslint-disable no-underscore-dangle */
import { createBrowserHistory } from 'history';

import createStore from 'common/redux/createStore';

const preloadedState = window.__PRELOADED_STATE__;

export const history = createBrowserHistory();
export default createStore(history, preloadedState);

/* eslint-disable no-underscore-dangle */
import createHistory from 'history/createBrowserHistory';

import createStore from 'common/redux/createStore';

const preloadedState = window.__PRELOADED_STATE__;

export const history = createHistory();
export default createStore(history, preloadedState);

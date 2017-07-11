import { match, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from 'common/redux/createStore';
import routes from 'common/routes';
import renderMarkup from './renderMarkup';

export default function (ctx) {
  return new Promise((resolve) => {
    const initialState = {
      csrf: ctx.csrf,
      auth: { user: ctx.state.user || {} },
    };
    const memoryHistory = createMemoryHistory(ctx.url);
    const store = createStore(memoryHistory, initialState);
    const history = syncHistoryWithStore(memoryHistory, store);

    match({ history, routes, location: ctx.url },
      (error, redirectLocation, renderProps) => {
        if (error) {
          resolve({
            code: 500,
            payload: error.message,
          });
        } else if (redirectLocation) {
          resolve({
            code: 302,
            payload: redirectLocation.pathname + redirectLocation.search,
          });
        } else if (renderProps) {
          resolve({
            code: 200,
            payload: renderMarkup(store, renderProps, initialState),
          });
        }
      });
  });
}

import { match, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from 'common/redux/createStore';
import routes from 'common/routes';

import renderContent from './renderContent';

export default async (ctx) => {
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
        ctx.throw(500, error.message);
      } else if (redirectLocation) {
        ctx.status = 302;
        ctx.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        try {
          const { reactContent, preloadedState } = renderContent(store, renderProps, initialState);
          ctx.status = 200;
          ctx.state = { reactContent, preloadedState };
        } catch (e) {
          ctx.throw(500, e.message);
        }
      } else {
        ctx.throw(404, 'Not found');
      }
    });
  await ctx.render('index', ctx.state);
};

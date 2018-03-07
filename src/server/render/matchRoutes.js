import createHistory from 'history/createMemoryHistory';
import { renderRoutes, matchRoutes } from 'react-router-config';

import createStore from 'common/redux/createStore';
import routes from 'common/routes';
import renderMarkup from './renderMarkup';

export default function(ctx) {
  const { user = {} } = ctx.state;
  const initialState = {
    csrf: ctx.csrf,
    auth: {
      user,
    },
  };
  const location = ctx.url;
  const history = createHistory(location);
  const store = createStore(history, initialState);
  const state = store.getState();
  const view = renderRoutes(routes);

  const branchs = matchRoutes(routes, location);
  const promises = branchs.reduce((acc, { route }) => {
    const fetchData = route.component.fetchData;

    if (fetchData instanceof Function) {
      return acc.concat(fetchData(state));
    }

    return acc;
  }, []);

  return Promise.all(promises).then((data = []) => {
    const context = {};
    const { auth, csrf } = state;
    const html = renderMarkup(view, store, location, context);

    return {
      code: context.status,
      url: context.url,
      payload: {
        html,
        preloadedState: { auth, csrf, data },
      },
    };
  });
}

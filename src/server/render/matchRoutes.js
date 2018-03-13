import createHistory from 'history/createMemoryHistory';
import { matchRoutes } from 'react-router-config';

import createStore from 'common/redux/createStore';
import routes from 'common/routes';

export default function(ctx) {
  const initialState = {};
  const location = ctx.url;
  const history = createHistory(location);
  const store = createStore(history, initialState);
  const state = store.getState();

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
    const { routing, ...restState } = state;

    return {
      code: context.status,
      url: context.url,
      renderMaterial: {
        routes,
        store,
        location,
        context,
      },
      preloadedState: { ...data, ...restState },
    };
  });
}

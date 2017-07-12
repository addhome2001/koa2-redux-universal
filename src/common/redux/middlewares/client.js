export default function ({ api, checkStatus }) {
  return ({ dispatch, getState }) =>
    next => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { types, client, callback, ...rest } = action;

      if (!client) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ type: REQUEST, ...rest });

      return client(api)
        .then(checkStatus)
        .then((result) => {
          if (callback) callback();
          next({ type: SUCCESS, result, ...rest });
        })
        .catch((error) => {
          next({
            type: FAILURE,
            message: typeof error === 'string' ? error : 'Connection failure.',
            ...rest,
          });
        });
    };
}

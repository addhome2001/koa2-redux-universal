export default function({ api, checkStatus }) {
  return () => (next) => (action) => {
    const { types, client, successful, ...rest } = action;

    if (!client) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ type: REQUEST, ...rest });

    return client(api)
      .then(checkStatus)
      .then((result) => {
        next({ type: SUCCESS, result, ...rest });
        successful(result);
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

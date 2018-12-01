export default function(api) {
  return () => (next) => (action) => {
    const { types, client, ...rest } = action;

    if (!client) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({ type: REQUEST, ...rest });

    return client(api)
      .then((result) => {
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

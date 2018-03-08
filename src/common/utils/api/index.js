import auth from './auth';

// proxy
function checkStatus(response) {
  return Promise.all([response.ok, response.json()]).then(([ok, result]) => {
    if (ok) return result;
    return Promise.reject(result.message);
  });
}

const handler = {
  get(target, name) {
    const prop = target[name];

    if (
      typeof prop === 'function' ||
      (typeof prop === 'object' && prop !== null && !Array.isArray(prop))
    ) {
      return new Proxy(prop, handler);
    }

    return prop;
  },

  apply(target, context, args) {
    const result = target(...args);

    if (result.then) {
      return result.then(checkStatus);
    }

    return result;
  },
};

export default new Proxy({ auth }, handler);

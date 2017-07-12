import auth from './auth';

export default { auth };

export function checkStatus(response) {
  return Promise.all([
    response.ok,
    response.json(),
  ]).then(([ok, result]) => {
    if (ok) return result;
    return Promise.reject(result.message);
  });
}

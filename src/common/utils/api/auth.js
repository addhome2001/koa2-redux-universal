export function checkStatus(response) {
  return Promise.all([
    response.ok,
    response.json(),
  ]);
}

export const login = ({ type, account }, csrf) =>
  fetch('/auth/local', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrf,
    },
    body: JSON.stringify(account),
  }).then(checkStatus);

export const logout = () =>
  fetch('/logout', {
    credentials: 'same-origin',
  }).then(checkStatus);

export default {
  login({ account, csrf }) {
    return fetch('/auth/local', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrf,
      },
      body: JSON.stringify(account),
    });
  },

  logout() {
    return fetch('/logout', {
      credentials: 'same-origin',
    });
  },
};

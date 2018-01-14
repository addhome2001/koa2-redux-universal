export default {
  login({ csrf, ...rest }) {
    return fetch('/auth/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrf,
      },
      body: JSON.stringify(rest),
    });
  },

  logout() {
    return fetch('/logout', {
      credentials: 'same-origin',
    });
  },

  register({ csrf, ...rest }) {
    return fetch('/auth/register', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrf,
      },
      body: JSON.stringify(rest),
    });
  },

  forgotPassword({ csrf, ...rest }) {
    return fetch('/forgot', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrf,
      },
      body: JSON.stringify(rest),
    });
  },

  resetPassword({ csrf, ...rest }) {
    return fetch('/reset', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrf,
      },
      body: JSON.stringify(rest),
    });
  },
};

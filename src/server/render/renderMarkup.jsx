import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

export default (store, renderProps) => {
  const { auth, csrf } = store.getState();
  const html = renderToString(
    <Provider store={ store }>
      <RouterContext { ...renderProps } />
    </Provider>,
  );
  return { html, preloadedState: { auth, csrf } };
};

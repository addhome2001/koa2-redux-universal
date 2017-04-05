import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

export default (store, renderProps) => {
  const { auth, csrf } = store.getState();
  const reactContent = renderToString(
    <Provider store={ store }>
      <RouterContext { ...renderProps } />
    </Provider>,
  );
  return { reactContent, preloadedState: { auth, csrf } };
};

/* eslint-disable no-console */
import LRUCache from 'lru-cache';

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60,
});

export function getCacheKey(ctx) {
  const state = ctx.isAuthenticated() ? '-isAuth' : '';
  return `${ctx.session.secret}-${ctx.url}${state}`;
}

export function setCacheKey(key, content) {
  ssrCache.set(key, content);
  return content;
}

export default async function(ctx, render) {
  const key = getCacheKey(ctx);

  if (ssrCache.has(key)) {
    console.log(`Render from cached: ${ctx.url}`);
    return ssrCache.get(key);
  }

  console.log(`Cached: ${ctx.url}`);
  const content = await render(ctx);
  return setCacheKey(key, content);
}

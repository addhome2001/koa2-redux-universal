import LRUCache from 'lru-cache';
import { viewsLogger } from '../utils/loggers';

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

export default function(render) {
  return (ctx, material) => {
    const key = getCacheKey(ctx);

    if (ssrCache.has(key)) {
      viewsLogger.info(`Rendering from cached: ${ctx.url}`);
      return ssrCache.get(key);
    }

    viewsLogger.info(`Cached: ${ctx.url}`);
    const content = render(material);
    return setCacheKey(key, content);
  };
}

import matchRoutes from './matchRoutes';
import renderMarkup from './renderMarkup';
import cacheRender from './cache';
import config from '../../config';
import { viewsLogger } from '../utils/loggers';

const cachedRender = cacheRender(renderMarkup);

export default async function(ctx) {
  try {
    const {
      code = 200,
      url = '/',
      renderMaterial,
      preloadedState,
    } = await matchRoutes(ctx);

    const html = +config.ENABLE_SSR ? cachedRender(ctx, renderMaterial) : '';

    const payload = {
      html,
      preloadedState,
    };

    ctx.status = code;

    if (code >= 200 && code < 300) {
      await ctx.render('index', payload);
    } else if (code >= 300 && code < 400) {
      await ctx.redirect(url);
    } else if (code >= 400 && code < 500) {
      await ctx.render('index', payload);
    } else {
      await ctx.redirect('/error');
    }
  } catch (e) {
    viewsLogger.error(`Something went wrong with SSR.
      ${e}
    `);
  }
}

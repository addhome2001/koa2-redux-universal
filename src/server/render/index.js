/* eslint-disable no-console */

import matchRoutes from './matchRoutes';
import cache from './cache';

export default async function (ctx) {
  try {
    const {
      code = 200,
      url = '/',
      payload,
    } = await cache(ctx, matchRoutes);

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
    console.log(e);
  }
}

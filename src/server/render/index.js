/* eslint-disable no-console */

import matchRoutes from './matchRoutes';
import cache from './cache';

export default async function (ctx) {
  try {
    const { code = 404, payload = 'Somthing is wrong.' } = await cache(ctx, matchRoutes);

    if (code >= 200 && code < 300) {
      await ctx.render('index', payload);
    } else if (code >= 300 && code < 400) {
      ctx.status = code;
      await ctx.redirect(payload);
    } else {
      await ctx.throw(code, payload);
    }
  } catch (e) {
    console.log(e);
  }
}

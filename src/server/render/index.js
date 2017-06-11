import matchRoutes from './matchRoutes';
import cache from './cache';

export default async function (ctx) {
  const content = await cache(ctx, matchRoutes);
  await ctx.render('index', content);
}

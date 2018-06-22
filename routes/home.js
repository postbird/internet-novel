const router = require('koa-router')();
const {getSearchResult} = require('../controllers/home.js');

router.get('/',async (ctx) => {
  await ctx.render('index');
});

router.get('search', async (ctx) => {
  let list = await getSearchResult(ctx.query.keyword);
  // console.log(res);
  await ctx.render('search',{list});
});

module.exports = router; 
// book 的路由
const router = require('koa-router')();
const {getBookInfo,getBookMenu,getBookRead} = require('../controllers/book');

router.get('/:id',async (ctx) => {
  const id = ctx.params.id;
  let info = await getBookInfo(id,ctx);
  // let menu = await getBookMenu(id);
  let menu = {};
  await ctx.render('book/book',{info,menu});
});

router.get('/menu/:id',async (ctx) => {
  const id = ctx.params.id;
  let menu = await getBookMenu(id,ctx);
  ctx.body = menu;
});

router.get('/read/:id/:read', async (ctx) => {
  const id = ctx.params.id;
  const read = ctx.params.read;
  const book = await getBookRead(id,read,ctx);
  await ctx.render("./book/read",{book});
});


module.exports = router;
const router = require('koa-router')();
const home = require('./home');
const book = require('./book');

router.use('/',home.routes(),home.allowedMethods());
router.use('/book',book.routes(),book.allowedMethods());

module.exports = router;
// homeController
const axios = require('axios');
const cheerio = require('cheerio');
/**
 * @description 搜索结果
 */
 async function getSearchResult(keyword){
    let res = await axios.get(`https://www.shuyaya.cc/search?wd=${encodeURIComponent(keyword)}`);
    const $ = cheerio.load(res.data);
    const bookList = [];
    $('.listconl ul.clearfix li').each((index,item)=>{
      let book = {}; 
      book.title = $(item).find(".jhfd a.green").text();
      book.link = $(item).find(".jhfd a.green").attr("href");
      book.id = book.link.substring(0,book.link.length-1).split('/');
      book.id = book.id[book.id.length-1];
      book.author = $(item).find('.width111 a').text();
      bookList.push(book);
    })
    return bookList;
 }

 module.exports = {
   getSearchResult,
 };
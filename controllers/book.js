// bookController
const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = "https://www.shuyaya.cc";

// 通过 link 获取 read id
function getReadIdByLink(link){
  link = link.split("/");
  link = link[link.length-1];
  link = link.substring(0,link.indexOf('.'));
  return link;
}

/**
 * @description 获取小说的基本信息
 * @param {*} id 
 * @param {Object} ctx
 */
async function getBookInfo(id,ctx){
  let res = await axios.get(`${baseUrl}/book/${id}/`);
  const $ = cheerio.load(res.data);
  const htm = $(".clearfix.wrap980 .wrap706 .con_lwrap");
  const info = {};
  info.img = htm.find(".con_limg img").attr("src");
  info.title = htm.find(".r420 h1").text();
  info.author = htm.find(".r420 .author .black a").text();
  info.startRead = htm.find(".r_tools .startedbtn").attr("href");
  info.startRead = getReadIdByLink(info.startRead);
  info.id = id;
  ctx.session.bookInfo = info;
  return info;
}

/**
 * @description 获取书籍的目录
 * @param {*} id 
 * @param {Object} ctx
 */
async function getBookMenu(id,ctx){
  let res = await axios.get(`${baseUrl}/read/${id}/`);
  const $ = cheerio.load(res.data);
  const htm = $(".dirwraps");
  const menu = {};
  menu.title = htm.find("h1").text();
  menu.id = id;
  menu.list = [];
  htm.find(".clearfix.dirconone ul li").each((index,item) => {
    let linkInfo = {};
    linkInfo.name = $(item).find("a").text();
    linkInfo.read = $(item).find("a").attr("href");
    linkInfo.read = getReadIdByLink(linkInfo.read);
    menu.list.push(linkInfo);
  });
  return menu;
}

/**
 * @description 获取小说每章的内容
 * @param {*} id 
 * @param {*} read 
 * @param {*} ctx
 */
async function getBookRead(id,read,ctx){
  let res = await axios.get(`${baseUrl}/read/${id}/${read}.html`);
  let $ = cheerio.load(res.data);
  const book = {};
  book.title = $("h1").text();
  book.id = id;
  book.read = read;
  book.content = $("#content").html();
  book.info = ctx.session.bookInfo;
  book.prev = $("#content .readbutton .readup a").attr("href");
  book.prev = getReadIdByLink(book.prev);
  book.next = $("#content .readbutton .readdown a").attr("href");
  book.next = getReadIdByLink(book.next);
  book.content = book.content.substring(0,book.content.indexOf('<div class="bzend">'));
  return book; 
}

module.exports = {
  getBookInfo,
  getBookMenu,
  getBookRead
};
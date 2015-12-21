var path = require('path');
var utils = require('./utils');
var fse = require('fs-extra');
var moment = require('moment');

module.exports = function (dir) {
  dir = dir + '/source';

  // 创建基本目录
  fse.mkdirsSync(path.resolve(dir, '_layout'));
  fse.mkdirsSync(path.resolve(dir, '_posts'));
  fse.mkdirsSync(path.resolve(dir, 'assets'));
  fse.mkdirsSync(path.resolve(dir, 'posts'));

  // 复制模板文件
  var tplDir = path.resolve(__dirname, '../source/_layout');
  fse.copySync(tplDir, dir + '/_layout');

  // 复制样式文件
  var styleDir = path.resolve(__dirname, '../source/assets');
  fse.copySync(styleDir, dir + '/assets');

  // 复制站点配置文件
  var siteConfig = path.resolve(__dirname, '../source/config.json');
  fse.copySync(siteConfig, dir + '/config.json');

  // 创建第一篇文章
  newPost(dir, 'hello, world', '这是我的第一篇文章');

  console.log('生成新博客站点！');
};

// 创建一篇文章
function newPost (dir, title, content) {
  var data = [
    'title: ' + title,
    'date: ' + moment().format('YYYY-MM-DD'),
    'updated: ' + moment().format('YYYY-MM-DD'),
    'categories: ',
    ' - ',
    'tags: ',
    ' - ',
    'description: ',
    '---',
    '',
    content
  ].join('\n');
  var name = moment().format('YYYY-MM') + '/helloWorld.md';
  var file = path.resolve(dir, '_posts', name);
  fse.outputFileSync(file, data);
}

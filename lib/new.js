var path = require('path');
var utils = require('./utils');
var fse = require('fs-extra');
var moment = require('moment');

module.exports = function (file) {
  var dir = './source/_posts/' + moment().format('YYYY-MM');
  file = file || 'new post';

  // 创建文章
  newPost(dir, file, '在此输入内容');

  if (file) {
    console.log('新建 ' + file + '.md');
  } else {
    console.log('新建一篇文章');
  }
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
  var name = title + '.md';
  var file = path.resolve(dir, name);
  fse.outputFileSync(file, data);
}

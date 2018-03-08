//首字母大写
function titleCase(str) {
  // 请把你的代码写在这里
  var word = str.toLowerCase().split(' ').map(function(strarr){
      result = strarr.substring(0,1).toUpperCase()+strarr.substring(1);
     return result;
    }).join(' ');
  return word;
}

titleCase("I'm a little tea pot");

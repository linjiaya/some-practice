//如果给定的字符串是回文，返回true，反之，返回false。

//如果一个字符串忽略标点符号、大小写和空格，正着读和反着读一模一样，那么这个字符串就是palindrome(回文)。
function palindrome(str) {
  var reg = /[a-zA-Z0-9]/g;
  // var reg =eval('/[\\{'+b+'\\}]/g');//表达式里放了变量

  var before = str.match(reg).join('').toLowerCase();
  var after = str.match(reg).reverse().join('').toLowerCase();
  if(before == after){
    console.log(before,after);
    return true;
  }
  else{
    console.log(before,after);
    return false;
  }
}



palindrome("A man, a plan, a canal. Panama");

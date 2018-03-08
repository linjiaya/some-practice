
//大数组中包含了4个小数组，分别找到每个小数组中的最大值，然后把它们串联起来，形成一个新数组。
function largestOfFour(arr) {
  // 请把你的代码写在这里
  var newArr = [];
  for(var i = 0; i < arr.length; i++){
    arr[i].sort(function(a,b){
      return a - b;
    });
     newArr.push(arr[i][arr[i].length-1]);
  } 
  return newArr;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);

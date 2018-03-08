//比较两个数组，然后返回一个新数组，该数组的元素为两个给定数组中所有独有的数组元素。换言之，返回两个数组的差异。
function diff(arr1, arr2) {
  var newArr = [];
  // Same, same; but different.
  for(var i = 0;i < arr1.length;i++){
    for(var j = 0;j < arr2.length;j++){
      if(arr1[i] == arr2[j]){
        arr2.splice(j,1);arr1.splice(i,1);
        j--;i--;
        console.log('=',arr2);
        continue;
      }
    }
  }
  newArr = arr1.concat(arr2);
  return newArr;
}

// diff(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]);

// 请给Array本地对象增加一个原型方法，它用于删除数组条目中重复的条目(可能有多个)，返回值是一个包含被删除的重复条目的新数组。
Array.prototype.distinct = function () {
  var ret = [];
  for (var i = 0; i < this.length ; i++){
    for (var j = 1; j < this.length; ){
      if (this[i] === this[j]) {
        ret.push(this.splice(j,1)[0]);
      }else{
        j++;
      }
    }
  }
  return ret;
}
// ['a','b','c','d','b','a','e'].distinct()
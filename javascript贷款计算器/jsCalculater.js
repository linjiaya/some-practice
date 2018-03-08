'use strict';
function calculate() {
  var amount = document.getElementById('amount');
  var apr = document.getElementById('apr');
  var years = document.getElementById('years');
  var zipcode = document.getElementById('zipcode');
  var payment = document.getElementById('payment');
  var total = document.getElementById('total');
  var totalinterest = document.getElementById('totalinterest');

  var principal = parseFloat(amount.value);
  var interest = parseFloat(apr.value) / 100 / 12;
  var payments = parseFloat(years.value) * 12;

  //计算月赔付数据
  var x = Math.pow(1 + interest,payments);//进行幂运算
  var monthly =  (principal * x * interest) / (x -1);

  if (isFinite(monthly)) {
    payment.innerHTML = monthly.toFixed(2);
    total.innerHTML = (monthly * payments).toFixed(2);
    totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

    //保存用户数据
    save(amount.value,apr.value,years.value,zipcode.value);

    try{
      getLenders(amount.value,apr.value,years.value,zipcode.value);
    }
    catch(e){

    }

    //图表展示贷款余额、利息和资产收益
    chart(principal,interest,monthly,payments);

  }
  else{
    //计算结果如果不是数字或者无穷大，则是输入数据是不完整的的或者非法的 
    payment.innerHTML = '';
    total.innerHTML = '';
    totalinterest.innerHTML = '';
    chart();//不传参数就是清楚图表
  }
}

/*保存数据*/
function save(amount,apr,years,zipcode){
  if (window.localStorage) {
    //只有在浏览器支持的情况下才运行
    //如果你在浏览器中按照file://url的方式直接打开本地文件，无法在某些浏览器中使用存储功能（比如firefox),而通过http是可以的
    localStorage.loan_amount = amount;
    localStorage.loan_apr = apr;
    localStorage.loan_years = years;
    localStorage.loan_zipcode = zipcode;
  }
}

/*文档加载时，尝试还原输入字段*/
window.onload = function(){
  if (window.localStorage && localStorage.loan_amount) {
    document.getElementById('amount').value = localStorage.amount;
    document.getElementById('apr').value = localStorage.apr;
    document.getElementById('years').value = localStorage.years;
    document.getElementById('zipcode').value = localStorage.zipcode;
  }
}

/*将用户输入发送至服务器端脚本。*/
function getLenders(amount,apr,years,zipcode){
  if (!window.XMLHttpRequest) {return;}
  var ad = document.getElementById('lenders');
  if (!ad) {return;}

  var url = 'getLenders.php' + 
  '?amt=' + encodeURIComponent(amount) +
  '?apr=' + encodeURIComponent(apr) +
  '?yrs=' + encodeURIComponent(years) +
  '?zip=' + encodeURIComponent(zipcode);

  var req = new XMLHttpRequest();
  req.open('get',url);
  req.send(null);

  //返回数据之前，注册了一个事件处理函数，这个处理函数，将会在服务器响应返回至客户端的时候调用，这种异步编程模型在客户端javascript中非常常见。
  req.onreadystatechange = function(){
    if (req.readyState == 4 && req.status == 200) {
      var response = req.responseText;
      var lenders = JSON.parse(response);

      // 讲述组中的房贷人对象转化成html字符串形式
      var list = '';
      for(var i = 0; i <lenders.length; i++){
        list += '<li><a href="' + lenders[i].url + '>' + lenders[i].name + '</a></li>';
      }

      ad.innerHTML = '<ul>' + list + '</ul>';
    }
  }
}

/*绘制图表*/
function chart(principal,interest,monthly,payments){
  var graph = document.getElementById('graph');
  graph.width = graph.width;

  //参数为空，或者浏览器不支持画布时
  if (arguments.length == 0 || !graph.getContext) {return;}

  var g = graph.getContext('2d');
  width = graph.width;
  height = graph.height;

  g.moveTo(paymentToX(0),pay)
}

// 这里函数作用是将付款数字和美元数据转换为像素
function paymentToX(n){
  return n * width / payments;
}
function amountToY(a){
  return height - (a * height /(monthly * payments * 1.05));
}

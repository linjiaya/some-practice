$('.bgList li').show();
$('.mdList').hide();
$('.smList').hide();
// 一级菜单点击
$('.bgList li a').on('click',function(){
  if ($(this).parent().children('.mdList')) {
    $(this).parent().children('.mdList').slideToggle();
  }
  if ($(this).parent().children('.smList')) {
    $(this).parent().children('.smList').slideToggle();
  }
})
// 二级菜单点击
$('.mdList li a').on('click',function(){
   if ($(this).parent().children('.smList')) {
    $(this).parent().children('.smList').show();
  }
})
// 三级菜单点击
$('.smList li a').on('click',function(){
  $('.smList li a').removeClass('active');
  $(this).addClass('active');
})

//设置一开始默认的选中的样式
$('.active').parent().parent().show();

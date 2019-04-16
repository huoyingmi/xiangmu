;(function($){
    // 顶部导航-下拉菜单
     // 将 $('.dropdown') 存起来
     var $menuDropDown = $('.dropdown');
	 // 获取dropdown元素之后，希望有一个插件调取函数具备下拉菜单的功能
	 $menuDropDown.dropdown({
		delay:100,
		eventName:'click'
	 });
	 $menuDropDown.on('dropdown-show',function(ev){
         var $elem = $(this);  //将DOM节点转化为jQuery对象
         var loadUrl = $elem.data('load'); //将load存起来
         if(!loadUrl) return; // 判断是否需要懒加载，若不需要则停止
         var isLoaded = $elem.data('isLoaded'); //将isLoaded存起来
         if(isLoaded) return; 
         var $layer = $elem.find('.dropdown-lay'); //拿到dropdown-lay
         console.log($layer);
         $.getJSON(loadUrl,function(data){
         	console.log(data);
         	// 定义空的html
             var html = '';
             for(var i=0; i<data.length; i++){
             	html += '<li><a href="'+data[i].url+'" class="menuitem">'+data[i].name+'</a></li>';
             }
             // 虚拟网络延时
	         setTimeout(function(){
	         	 // 拿到数据将数据放到dropdown-lay中
	             $layer.html(html);
	             $elem.data('isLoaded',true);
	         },1000);
         });
     });
     // 其他按钮点击事件
    $('button').on("click",function(){
        $('.dropdown').dropdown('show');
    })
})(jQuery);
(function($){

	function getRandom(min,max) {	
		return Math.round(min + (max-min)*Math.random());
	}
	var $wish = $('.wish');
	var $wall = $('.wall');
	//获取父容器和自身的宽高
	var wishWidth = $wish.width(),
		wishHeight = $wish.height(),
		wallWidth = $wall.width(),
		wallHeight = $wall.height();


		
	//1.设置许愿卡片拖动
	$wish.pep({  constrainTo: '.wall' })
	//2.随机显示许愿卡片
	$wish.each(function(){
		let x = getRandom(0,wallWidth - wishWidth);
		let y = getRandom(0,wallHeight - wishHeight);
		$(this).css({
			transform: "matrix(1, 0, 0, 1, "+x+", "+y+")"
		})
	});

	//监听添加事件
	$('sub-btn').on('click',function(){
		$.ajax({
			url:url,
			type:'post',
			dataType:'json',
			data:{
				content:$('content').val()
			}
		})
	})

})(jQuery);
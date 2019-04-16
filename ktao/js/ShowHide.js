;(function($){
	 //将相同的代码抽取出来
	function init($elem,hidencb){
		// is(选择器) ,检测jQuery对象中是否有匹配元素
		// $('选择器:hidden')   匹配所有不可见元素
		if($elem.is(":hidden")){
	        //data([key],[value])获取key并赋值
	        // 当隐藏状态
	        $elem.data("status","hiden");
	        typeof hidencb == 'function' && hidencb();
	    }else{
	    	// 当显示状态
	        $elem.data("status","shown");
	    }
	}
	function show($elem,cb){
		if($elem.data('status') == 'shown') return;
		if($elem.data('status') == 'show') return;
		// 在调用之前先触发一个自定义事件
		$elem.data("status","show").trigger('show');
		cb();
	}
	function hide($elem,cb){
	    if($elem.data('status') == 'hiden') return;
		if($elem.data('status') == 'hider') return;
	    // 在调用之前先触发一个自定义事件
		$elem.data("status","hider").trigger('hider');
		cb();
	}

	//定义一个对象实现显示隐藏
	var slient = {
	  	// 初始化一个方法将当前的显示或者隐藏的状态提前存起来
	  	init:init,
		// show方法
		show:function($elem){
			/*
			if($elem.data('status') == 'shown') return;
			if($elem.data('status') == 'show') return;
			// 在调用之前先触发一个自定义事件
			$elem.data("status","show").trigger('show');
			*/
			show($elem,function(){
				$elem.show();
		        // 在调用之后再触发一个自定义事件
				$elem.trigger('shown').data("status","shown");
			})
		},
		// hide方法
		hide:function($elem){
			/*
			if($elem.data('status') == 'hiden') return;
			if($elem.data('status') == 'hider') return;
	        // 在调用之前先触发一个自定义事件
			$elem.data("status","hider").trigger('hider');
			*/
			hide($elem,function(){
				$elem.hide();
		        // 在调用之后再触发一个自定义事件
				$elem.trigger('hiden').data("status","hiden");
			}) 
		}
	}
	//重新定义一个对象实现淡入淡出，卷入卷出效果
	var js = {
	    fade:{
	    	init:function($elem){
	    		js._init($elem);
	    	},
			show:function($elem){
				js._show($elem,"fadeIn");
			},
			hide:function($elem){
				js._hide($elem,"fadeOut")
			}
	    },
	    slideDownUp:{
	        init:function($elem){
	    		js._init($elem);
	    	},
			show:function($elem){
				js._show($elem,"slideDown");
			},
			hide:function($elem){
				js._hide($elem,"slideUp");
			}
	    },
	    slideLeftRight:{
	    	init:function($elem){
	    		js._cutInit($elem,{
	    			width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0
	    		});
	    	},
	    	show:function($elem){
	            js._cutshow($elem);
	    	},
	    	hide:function($elem){
	            js._cuthide($elem,{
	    			width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0
	    		});
	    	}
	    },
	    fadeLeftRight:{
	    	init:function($elem){
	    		js._cutInit($elem,{
	    			width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0
	    		});
	    	},
	    	show:function($elem){
	            js._cutshow($elem);
	    	},
	    	hide:function($elem){
	            js._cuthide($elem,{
	    			width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0
	    		});
	    	}
	    },
	}

	js._init = function($elem){
	    $elem.removeClass('transition');
		init($elem);
	}
	js._show = function($elem,mode){
		show($elem,function(){
			// console.log($elem);
	        $elem.stop()
			[mode](1000,function(){
				$elem.trigger('shown').data("status","shown");
			});
		})
	}
	js._hide = function($elem,mode){
	    hide($elem,function(){
	         $elem.stop()
			[mode](1000,function(){
				// console.log($elem);
				$elem.trigger('hiden').data("status","hiden");
			});
		})
	}
	js._cutInit = function($elem,options){
		$elem.removeClass('transition');
		var styles = {};
		for(var key in options){
			styles[key] = $elem.css(key);
		}
		$elem.data("styles",styles);
	    init($elem,function(){
	    	$elem.css(options);
	    });
	}
	js._cutshow = function($elem){
	    show($elem,function(){
			// console.log($elem);
			$elem.show();//display=block
	        $elem.stop()
	        .animate($elem.data("styles"),function(){
	            $elem.trigger('shown').data("status","shown");
	        });
		})
	}
	js._cuthide = function($elem,options){
		hide($elem,function(){
	        $elem.stop()
	        .animate(options,function(){
	        	$elem.hide();//display=none
	         	$elem.trigger('hiden').data("status","hiden");
	        })
		})
	} 
  
    //定义一个显示隐藏的函数
    // 此处的options指slient方法还是js方法之中的某一个方法如fade/slideDownUp
    function getShowHide($elem,options){
        var showhideFn = slient;
        if(options.js){
        	showhideFn = js[options.mode];
        }
        showhideFn.init($elem);

        return {
        	show:showhideFn.show,
        	hide:showhideFn.hide
        }
    }

    // 默认的配置项
    var DEFAULTS = {
    	js:true,
    	mode:'fade'
    }

	// 1.注册插件
	$.fn.extend({
		showhide:function(options){
			// console.log(this);
			// 1.隐式迭代既是遍历的意思
			 return this.each(function(){
				// console.log(this); //得到DOM对象
				// 将DOM对象转化为jQuery对象
				var $elem = $(this);
                // 将存储的值拿来调用
                var showhideobj = $elem.data("showhideobj");
                // 第一次是拿不到的，第二次才能拿到，所以进行判断
                if(!showhideobj){
                	// 第一次进来没有拿到，进行存储，完成单例模式
					options = $.extend({},DEFAULTS,options);
					showhideobj = getShowHide($elem,options);
					$elem.data("showhideobj",showhideobj);
                }

                // 怎么调用
                if(typeof showhideobj[options] == 'function'){
                	showhideobj[options]($elem);
                }

                /*
				// 对options做一个合并
				options = $.extend({},DEFAULTS,options);
				// 将函数调用
				var showhideobj = getShowHide($elem,options);
				// 将showhideobj的值存储在DOM元素$elem上
				$elem.data("showhideobj",showhideobj);
				*/
                 // console.log(showhideobj);
			})
		}
	})
})(jQuery);

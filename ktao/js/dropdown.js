;(function($){
 // 构造函数    //将jQuery对象$elem当做参数传入函数中
 function Dropdown($elem,options){
	// console.log($elem);
	// 面向对象方法
  // 1.罗列属性
    this.$elem = $elem;
    this.options = options;
    this.$lay = $elem.find(".dropdown-lay");
    this.activeClass = $elem.data('active')+'-active';
    // 延迟定时器
    this.timer = 0;
     // console.log($('.dropdown-lay'));
  // 2.初始化
    this.init();
 }
  // 基本结构
 Dropdown.prototype = {
	constructor:Dropdown,
	// 承接上部初始化操作
	init:function(){
		// 1.初始化显示和隐藏
		this.$lay.showhide(this.options);
		// 2.监听显示隐藏事件
		this.$lay.on("show shown hider hiden",function(ev){
			this.$elem.trigger("dropdown-" + ev.type);
		}.bind(this));
		// 3.绑定事件
		// ..2.在绑定事件中判断是添加的什么事件
		
		if(this.options.eventName == 'click'){
            // 绑定点击事件显示
            this.$elem.on('click',function(ev){
                // 阻止事件冒泡到document上面影响显示
                ev.stopPropagation();
                this.show();
            }.bind(this));
            // 绑定点击document其他部分隐藏事件
            $(document).on('click',$.proxy(this.hide,this));
		}else{
	        this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
		}
		// this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));

	},
	show:function(){
		// console.log(this);
		if(this.options.delay){
			this.timer = setTimeout(function(){
				this.$lay.showhide('show');
		        this.$elem.addClass(this.activeClass);
			}.bind(this),this.options.delay)
		}else{
			this.$lay.showhide('show');
	        this.$elem.addClass(this.activeClass);
		}  
	},
	hide:function(){
		clearTimeout(this.timer);
        this.$lay.showhide('hide');
        this.$elem.removeClass(this.activeClass);
	}
 }

 // 静态属性
 Dropdown.DEFAULTS = {
 	js:true,
 	mode:"slideDownUp",
 	// 配备项
 	delay:100,
 	// 1.添加一项事件名
 	eventName:''
 }

 $.fn.extend({
	dropdown:function(options){
		// console.log(this);
		// 隐式迭代即遍历
		return this.each(function(){
			// 将DOM对象变为jQuery对象
			var $elem = $(this);
			// 存储数据dropdown
			var dropdown = $elem.data('dropdown');
			// 判断有没有dropdown没有的话生成dropdown
			if(!dropdown){
                // 将options进行整合
				options = $.extend({},Dropdown.DEFAULTS,options);
				// 调用构造函数  并用dropdown接收
				dropdown = new Dropdown($elem,options);
				// 接收到dropdown对象后存起来
				$elem.data('dropdown',dropdown);
			}
			if(typeof dropdown[options] == 'function'){
				dropdown[options]();
			}
			/*
			// 将options进行整合
			options = $.extend({},Dropdown.DEFAULTS,options);
			// 调用构造函数
			new Dropdown($elem,options);
			*/
		})
	}
 })
})(jQuery);
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
        this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
	},
	show:function(){
		// console.log(this);
        this.$lay.showhide('show');
        this.$elem.addClass(this.activeClass);
	},
	hide:function(){
        this.$lay.showhide('hide');
        this.$elem.removeClass(this.activeClass);
	}
 }

 // 静态属性
 Dropdown.DEFAULTS = {
 	js:true,
 	mode:"slideDownUp"
 }

 $.fn.extend({
	dropdown:function(options){
		console.log(this);
		// 隐式迭代即遍历
		return this.each(function(){
			// 将DOM对象变为jQuery对象
			var $elem = $(this);
			// 将options进行整合
			options = $.extend({},Dropdown.DEFAULTS,options);
			// 调用构造函数
			new Dropdown($elem,options);
		})
	}
 })
})(jQuery);
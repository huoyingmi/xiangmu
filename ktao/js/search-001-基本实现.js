;(function($){
 // 构造函数    //将jQuery对象$elem当做参数传入函数中
 function Search($elem,options){
 	console.log($elem);
  // 1.罗列属性
    this.$elem = $elem;
    this.options = options;
    this.$searchBtn = $elem.find('.search-btn');
    this.$searchInput = $elem.find('.search-input');
    this.$searchForm = $elem.find('.search-form');
  // 2.初始化
    this.init();
    if(this.options.autocompelete){
    	this.autocompelete();
    }
 }
  // 基本结构
 Search.prototype = {
	constructor:Search,
	// 承接上部初始化操作
	init:function(){
		//1.绑定事件
		this.$searchBtn.on('click',$.proxy(this.submit,this));
	},  
	//提交方法
	submit:function(){
		if(this.getInputVal() == ''){
			return false;
		}
		this.$searchForm.trigger('submit');
	},
    //获取input内容提交方法
    getInputVal:function(){
    	return  $.trim(this.$searchInput.val());
    },
    autocompelete:function(){
    	// 1.监听输入框input事件
    	this.$searchInput.on('input',$.proxy(this.getData,this));
    },
    getData:function(){
    	console.log('will get data...')
    }
 }

 // 静态属性
 Search.DEFAULTS = {
 	// 通过这个配置项判断插件是否执行
 	autocompelete:true
 }

 $.fn.extend({
	search:function(options){
		// console.log(this);
		// 隐式迭代即遍历
		return this.each(function(){
			// 将DOM对象变为jQuery对象
			var $elem = $(this);
			// 存储数据search
			var search = $elem.data('search');
			// 判断有没有search没有的话生成search
			if(!search){
                // 将options进行整合
				options = $.extend({},Search.DEFAULTS,options);
				// 调用构造函数  并用search接收
				search = new Search($elem,options);
				// 接收到search对象后存起来
				$elem.data('search',search);
			}
			if(typeof search[options] == 'function'){
				search[options]();
			}
		})
	}
 })
})(jQuery);
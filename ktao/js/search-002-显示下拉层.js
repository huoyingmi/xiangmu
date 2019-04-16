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
    this.$searchLayer = $elem.find('.search-layer');

    // 定义一个是否加载过.默认false
    this.isLoaded = false;
  // 2.初始化
    this.init();
    // 判断有没有插件
    if(this.options.autocompelete){
    	// 调用方法
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
    	// console.log(this.options);
    	// console.log(this.$searchLayer);
    	// 1.初始化显示隐藏插件
    	this.$searchLayer.showhide(this.options);
    	// 2.监听输入框input事件
    	this.$searchInput.on('input',$.proxy(this.getData,this));
    	// 3.点击页面其他地方隐藏下拉层
    	$(document).on('click',$.proxy(this.hideLayer,this));
    	// 4.input获取焦点时显示下拉层
    	this.$searchInput.on('focus',$.proxy(this.showLayer,this));
    	// 5.阻止冒泡-阻止input上面的click事件冒泡到document上面触发隐藏
    	this.$searchInput.on('click',function(ev){
    		ev.stopPropagation();
    	});
    },
    getData:function(){
    	console.log('will get data...');
        // 当输入空格时，不应该发送请求
        var InputVal = this.getInputVal();
        if(InputVal == ''){
        	this.appendHtml('');
        	return;
        }

    	$.ajax({
    		url:this.options.url+this.getInputVal(),
    		dataType:"jsonp",
    		jsonp:"callback"    		
    	})
    	.done(function(data){
    		console.log(data);
    		// 1.根据数据生成html
    		var html = '';
    		for(var i=0; i<data.result.length; i++){
    			html += '<li class="search-item">'+data.result[i][0]+'</li>';
    		}
    		
    		// 2.加载html到下拉层
    		// this.$searchLayer.html(html);
    		this.appendHtml(html);
    		// 3.显示下拉层
    		// this.$searchLayer.showhide('show');
    		this.showLayer();
    		
    	}.bind(this))
    	.fail(function(err){
    		console.log(err);
    	})
    },
    appendHtml:function(html){
    	// 2.加载html到下拉层
		this.$searchLayer.html(html);
		this.isLoaded = !!html;
		
    },
    showLayer:function(){
    	if(!this.isLoaded) return;
    	// 3.显示下拉层
		this.$searchLayer.showhide('show');
    },
    hideLayer:function(){
    	// 4.隐藏下拉层
		this.$searchLayer.showhide('hide');
    }
    
 }

 // 静态属性
 Search.DEFAULTS = {
 	// 通过这个配置项判断插件是否是否有这个功能
 	 autocompelete:true,
 	 url:"https://suggest.taobao.com/sug?&q=",
 	 js:true,
 	 mode:"slideDownUp"
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
require('./index.css');
var _user = require('service/user')
// var _util = require('util')

var nav = {
	// 初始化
	init:function(){
		this.bindEvent();
		return this;
	},
	bindEvent:function(){
		// 1.绑定退出事件
		$('#logout').on('click',function(){
			// console.log('logout...');
			_user.logout(function(result){
				// console.log(result);
				window.location.reload();
			}),function(err){
				// console.log(err);
				alert(err.statusText);
				// _util.showErrorMsg(msg);
			}
		})
	}
}

module.exports = nav.init();//调用方法
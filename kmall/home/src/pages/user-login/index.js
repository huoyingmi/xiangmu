// console.log('user-login...');
// console.log($);

require('./index.css')
require('pages/common/footer')
require('pages/common/logo')
var _util = require('util')

var page = {
	init:function(){
		this.bindEvent();
		// console.log('aaa');
	},
	bindEvent:function(){
		// console.log(this);
		var _this = this;
		// console.log(_this);
		// 1.绑定事件用户登录
		$('#btn-submit').on('click',function(){
			_this.submitLogin();
		})
	},
	submitLogin:function(){
		// 1.获取数据
		var formDta = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
		}
		// console.log(formDta);
		// 2.验证数据
		var validateResult = this.validate(formDta);//调用验证方法
		// 3.发送请求
		console.log(validateResult);
	},
	validate:function(formDta){
		var result = {
			status:false, //默认验证不通过
			msg:''
		}
		// 用户名不能为空
		if(!_util.validate(formDta.username),'require'){
			result.msg = '用户名不能为空'
			return result;
		}
		// 用户名格式不正确
		if(!_util.validate(formDta.username),'username'){
			result.msg = '用户名格式不正确'
			return result;
		}
		// 密码不能为空
		if(!_util.validate(formDta.password),'require'){
			result.msg = '密码不能为空'
			return result;
		}
		// 密码格式不正确
		if(!_util.validate(formDta.password),'password'){
			result.msg = '密码格式不正确'
			return result;
		}
		// 验证通过执行
		result.status = true;
		return result;
	}
}
$(function(){
	page.init();
})
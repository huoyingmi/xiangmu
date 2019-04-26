var _util = require('util');

var _user = {
	logout:function(success,error){
		// 退出的操作时向后台发送请求，后台将清除掉
		$.ajax({//向3000端口下的user/logout发送请求
			url:'/user/logout',
			success:success,
			error:error
		})
	}
}

module.exports = _user;
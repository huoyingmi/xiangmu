var _util = {
	request:function(options){//requese方法发送Ajax请求
		$.ajax({
			method:options.method || 'get',//请求方法
			url:options.url || '', //请求地址
			dataType:options.dataType || 'json',//数据类型
			data:options.data || '',//参数
			success:function(result){
				// 1.成功
				if(result.code == 0){
					options.success && options.success(result.data);
				}
				// 2.失败
				else if(result.code == 1){
					options.error && options.error(result.message);
				}
				// 3.没有权限
				else if(result.code == 10){
					// 跳转到登陆页面
					window.location.href = './user-login.html'
				}
			},
			error:function(err){
				options.error && options.error(err.statusText);
			}
		})
	}
}

module.exports = _util;
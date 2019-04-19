import axios from 'axios';

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		const params = {
			    method:options.method || 'get',
	        	url:options.url || '',
	        	data:options.data || '',
	        	withCredentials:true,
		}
		axios(params)
		.then(result=>{
			const data = result.data;
			if(data.code == 10){//code=10是没有了权限
				// 移除前端的登陆信息
				removeUserName();
				// 并且跳转到登陆页面
				window.location.href = '/login'
				reject('没有权限');
			}else{
				resolve(result.data);
			}
		})
		.catch(err=>{
			reject(err);
		})
	})
}
// ————>进入actionCreator.js文件

// 登录用户信息存储
export const setUserName = (username)=>{
	window.localStorage.setItem('username',username);
}
export const getUserName = (username)=>{
	return window.localStorage.getItem('username');
}
export const removeUserName = (username)=>{
	window.localStorage.removeItem('username');
} 
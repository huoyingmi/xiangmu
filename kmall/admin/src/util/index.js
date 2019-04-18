import axios from 'axios';

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		const params = {
			    method:options.method || 'get',
	        	url:options.url || '',
	        	data:options.data || ''
		}
		axios(params)
		.then(result=>{
			// console.log("1234");
			resolve(result.data);
		})
		.catch(err=>{
			reject(err);
			// console.log("1234");
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
/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:09:18
*/
import * as types from './actionTypes.js'

import { request } from 'util'

import { GET_USERS } from 'api'

const setCountAction = (payload)=>{
	return {
		type:types.SET_COUNT,
		payload
	}
}

export const getPageAction = (page)=>{
	return (dispatch)=>{
		request({
			url:GET_USERS,
			data:{
				page:page
			}
		})
		.then(result=>{
			// console.log("result:::",result);
		})
		.catch(err=>{
			console.log(err);
		})
	}
}
// ————>进入home/index.js文件中


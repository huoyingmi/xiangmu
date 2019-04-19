/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:51:38
*/
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	list:[{
	    _id: '1',
	    username: 'admin',
	    age: 32,
	    isAdmin: true,
	    email:'test@kuazhu.com',
	    phone:'12312341234',
	    createdAt:'2019-10-10 14:20:10'
	}],
// ————>进入store/reducer.js文件配置
})

export default (state=defaultState,action)=>{

	return state;
}
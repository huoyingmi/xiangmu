/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:53:38
*/
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

// 1.引入login组件自己的reducer,相当于引用‘../pages/login/store/index.js’
// 2.为了避免命名冲突，对引入的reducer重命名
import { reducer as loginReducer  } from 'pages/login/store'
import { reducer as homeReducer  } from 'pages/home/store'
import { reducer as userReducer  } from 'pages/user/store'
import { reducer as categoryReducer  } from 'pages/category/store'

// 在store>reducer.js文件中进行合并
export default combineReducers({
	// 3.属性login就是合并后的整个顶层数据state的一个属性，值loginReducer就是该属性的值
	// 4.所以在获取值的时候需要从顶层数据state中先获取‘login’，再获取里面的值(参考src/pages/login/indx.js中的mapStateToProps方法)
	login:loginReducer,
	home:homeReducer,
	user:userReducer,
	category:categoryReducer,
})
// ————>回到user/index.js文件

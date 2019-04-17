/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-14 11:45:10
*/

import React,{ Component,Fragment } from 'react'

import { BrowserRouter as Router, Route,} from "react-router-dom";

// 引入pages>login 等价于引入pages>login>index.js文件
import Login from 'pages/login'
// 引入pages>home  等价于引入pages>home>index.js文件
import Home from 'pages/home'

//————>下一步进入pages>login>index.js文件

import './App.css'

class App extends Component{

	render(){
		return( 
			<Router>
				<div className="App">
					<Route exact path="/" component={Home} />				
				    {//当匹配到路由‘/login’后，渲染Login组件
				    }
					<Route path="/login" component={Login} />				
				</div>
			</Router>
		)
	}
}

export default App;
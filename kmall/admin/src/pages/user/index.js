
import React,{ Component,Fragment } from 'react'
import { Table, Divider, Tag } from 'antd';
import { connect } from 'react-redux'
import moment from 'moment'

import { actionCreator } from './store'
import Layout from 'common/layout'

const columns = [
	{
	    title: '用户名',
	    dataIndex: 'username',
	    key: 'username',
	}, 
	{
	    title: '年龄',
	    dataIndex: 'age',
	    key: 'age',
	},
	{
	    title: '是否是管理员',
	    dataIndex: 'isAdmin',
	    key: 'isAdmin',
	    render:isAdmin=>isAdmin?'是':"否"
	}, 
	{
	    title: 'email',
	    dataIndex: 'email',
	    key: 'email',
	},
	{
	    title: '手机',
	    dataIndex: 'phone',
	    key: 'phone',
	},
	{
	    title: '注册时间',
	    dataIndex: 'createdAt',
	    key: 'createdAt',
	},
];

class User extends Component {
	// 生命周期函数
	componentDidMount(){
		this.props.handlePage(1)
	}
	render(){
		// console.log(this.props.list);
		const { list,current,pageSize,total,handlePage } = this.props;
		const dataSource = list.map(user=>{
			return {
				key: user.get('_id'),
			    username: user.get('username'),
			    age: user.get('age'),
			    isAdmin: user.get('isAdmin'),
			    email:user.get('email'),
			    phone:(user.get('phone')).padEnd(11,'0'),
			    createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss'),
			}
		}).toJS() //toJS是将对象list转换成数组
		// console.log('dataSource:',dataSource);
		return (
			<div className="User">
				<Layout>
					<Table 
						dataSource={dataSource} 
						columns={columns}
						pagination={{
							current:current,
							pageSize:pageSize,
							total:total
						}} 
						onChange={(page)=>{
							handlePage(page.current);
						}}
					/>
				</Layout>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	// console.log("state::",state);
	return {
		list:state.get('user').get('list'),
		current:state.get('user').get('current'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total'),
// ————>进入user/store/reducer.js文件
	}
}
const mapDispatchToProps = (dispatch)=>{
	// console.log("dispatch::",dispatch);
	return { 
		handlePage:(page)=>{
			const action = actionCreator.getPageAction(page)
			dispatch(action)
// ————>进入user/store/actionCreator.js文件中
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(User);
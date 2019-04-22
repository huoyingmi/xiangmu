
import React,{ Component,Fragment } from 'react'
import { 
	Breadcrumb,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, 
} from 'antd';
import { connect } from 'react-redux'

const { Option } = Select;

import Layout from 'common/layout'
import { actionCreator } from './store'

class CategoryAdd extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	        if (!err) {
		      	// console.log("1::",values);
		      	this.props.handleAdd(values);
	        }
	    });
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const { isAddFething } = this.props
		const formItemLayout = {
	        labelCol: {
		        xs: { span: 24 },
		        sm: { span: 8 },
	        },
	        wrapperCol: {
		        xs: { span: 24 },
		        sm: { span: 16 },
	        },
	    };
	    const tailFormItemLayout = {
	        wrapperCol: {
		        xs: {
			        span: 24,
			        offset: 0,
		        },
		        sm: {
			        span: 16,
			        offset: 8,
		        },
	        },
	    };

		return (
			<div className="CategoryAdd">
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
			            <Breadcrumb.Item>首页</Breadcrumb.Item>
			            <Breadcrumb.Item>分类管理</Breadcrumb.Item>
			            <Breadcrumb.Item>添加分类</Breadcrumb.Item>
			        </Breadcrumb>
			        <Form {...formItemLayout}>
				        <Form.Item label="分类名称">
				            {getFieldDecorator('name', {
				          	// 校验规则
					            rules: [{ required: true, message: '请输入分类名称' }],
				            })(
					            <Input placeholder="分类名称" style={{width:300}}/>
				            )}
				        </Form.Item>
				        <Form.Item label="父级分类">
				            {getFieldDecorator('pid', {
				          	// 校验规则
					            rules: [{ required: true, message: '请选择父级分类' }],
				            })(
					            <Select style={{ width: 300 }}>
							        <Option value="0">根分类</Option>
							    </Select>
				            )}
				        </Form.Item>
				        <Form.Item {...tailFormItemLayout}>
				            <Button 
					            type="primary"
					            onClick={this.handleSubmit}
					            loading={isAddFething}
				            >
				                提交
				            </Button>
				        </Form.Item>
			        </Form>
				</Layout>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	// console.log("state::",state);
	return {
		isAddFething:state.get('category').get('isAddFething'),
// ————>进入user/store/reducer.js文件
	}
}
const mapDispatchToProps = (dispatch)=>{
	// console.log("dispatch::",dispatch);
	return { 
		handleAdd:(values)=>{
			// console.log("values",values);
			const action = actionCreator.getAddAction(values);
			dispatch(action);
		}
// ————>进入user/store/actionCreator.js文件中
	}
}


const WrappedCategoryAdd = Form.create()(CategoryAdd);
export default connect(mapStateToProps,mapDispatchToProps)(WrappedCategoryAdd);
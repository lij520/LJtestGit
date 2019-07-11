//新建巡路计划表单
import React from 'react';
import { Form, Button, Input, Select, message } from 'antd';
import moment from 'moment';

import $ from 'jquery';
import MUtil from 'util/mm.jsx';
const _mm   = new MUtil();

const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

class PatrolPlanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
			list: [],
      count:'',
      roadList: [],
      roadCount: '',      
		}
  }

  componentDidMount(){
    this.loadSelectUserList();
    this.loadSelectRoadList();
  }
  //新建巡路人员Select 请求列表
	loadSelectUserList() {
    var formData = new FormData();
    formData.append("userId",_mm.getStorage('userInfo').userId);
    formData.append("token",_mm.getStorage('userInfo').token);
    formData.append("roleType",'50');
    formData.append("regionId",_mm.getStorage('userInfo').regionId);
   
    $.ajax({
      type        :  'post',
      url         :  '/patrol/queryUserList',
      data        :  formData,
      cache       :  false,//上传文件无需缓存
      processData :  false,//用于对data参数进行序列化处理 这里必须false
      contentType :  false, //必须
      success     : res => {
        if(res.result == 1){
          this.setState({
            list:res.userList,
            count:res.userList.length,
          });
          //console.log('queryUserList',this.state.list);
        }
        else if(res.result == -1){
          message.error(res.message);
          window.location.href = '/';
        }
        else{
        	message.error(res.message);
        }
      },
      error       : err => {
          message.error('error!');
      }
    });
  }
  //新建路段名称Select 请求列表
  loadSelectRoadList() {
    var formData = new FormData();
    formData.append("regionId",_mm.getStorage('userInfo').regionId);
   
    $.ajax({
      type        :  'post',
      url         :  '/patrol/queryRoad',
      data        :  formData,
      cache       :  false,//上传文件无需缓存
      processData :  false,//用于对data参数进行序列化处理 这里必须false
      contentType :  false, //必须
      success     : res => {
          this.setState({
            roadList:res.roads,
            roadCount:res.roads.length,
          });
          //console.log('queryRoadList',this.state.roadList);
      },
      error       : err => {
          message.error('error!');
      }
    });
	}

  //新增巡路计划表单提交
  handleSubmit(e) {
    let planInfo = this.props.form.getFieldsValue();
    // console.log(JSON.stringify(planInfo));

    e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      var formData = new FormData();
      formData.append("userId",_mm.getStorage('userInfo').userId);
      formData.append("token",_mm.getStorage('userInfo').token);
      formData.append("regionId",_mm.getStorage('userInfo').regionId);
      formData.append("patrolStatus",'1');
      formData.append("patrolType",'2');
      formData.append("patrolPeriod",planInfo.patrolPeriod);
      formData.append("patrolUserId",planInfo.inspector);
      formData.append("patrolNum",planInfo.patrolNum);
      formData.append("taskName",planInfo.taskName);  

      for(var i=0; i<planInfo.sectionName.length; i++){
        formData.set("roadId",planInfo.sectionName[i]);
        $.ajax({
          type        :  'post',
          url         :  '/patrol/insertPatrol',
          data        :  formData,
          cache       :  false,//上传文件无需缓存
          processData :  false,//用于对data参数进行序列化处理 这里必须false
          contentType :  false, //必须
          success     : res => {
              this.props.handleClick();
              this.props.loadPlanList(1,this.props.pageSize);
          },
          error       : err => {
              message.error('error!');
          }
        });
      }
    })

  }

  render(){
    const { getFieldDecorator } = this.props.form;
    
    return(
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <FormItem {...formItemLayout} label="任务名称：">
          {getFieldDecorator('taskName', {
            rules: [{
              required: true,
              message: '任务名称不能为空！',
            }],
          })(
            <Input placeholder="请输入任务名称！" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="巡路人员：">
          {getFieldDecorator('inspector', {
            rules: [{
              required: true,
              message: '巡路人员不能为空！',
            }],
          })(
            <Select
			        showSearch
			        placeholder="请输入巡路人员！"
			        defaultActiveFirstOption={false}
			        showArrow={true}
			        onSearch={this.handleSearch}
			        onChange={this.handleChange}
			        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
			        notFoundContent={null}
			      >
              {
                this.state.list.map(item => <Option key={item.user_id}>{item.real_name}</Option>)
              }
			      </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="路段名称：">
          {getFieldDecorator('sectionName', {
            rules: [{
              required: true,
              message: '路段名称不能为空！',
            }],
          })(
            <Select
              showSearch
              mode="multiple"
			        placeholder="请输入路段名称！"
			        defaultActiveFirstOption={false}
			        showArrow={true}
			        onSearch={this.handleSearch}
			        onChange={this.handleChange}
			        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
			        notFoundContent={null}
			      >
              {
                this.state.roadList.map(item => <Option key={item.roadId}>{item.roadName}</Option>)
              }
			      </Select>
			    )}
        </FormItem>
        <FormItem {...formItemLayout} label="巡路次数：">
          {getFieldDecorator('patrolNum', {
            initialValue: '1',
            rules: [{
              required: true,
              message: '巡路次数不能为空！',
            }],
          })(
            <Input placeholder="请输入巡路次数！" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="巡路周期：">
          {getFieldDecorator('patrolPeriod', {
            initialValue: '6',
            rules: [{
              required: true,
              message: '巡路周期不能为空！',
            }],
          })(
            <Select
			        placeholder="请输入巡路周期！"
			        defaultActiveFirstOption={false}
			        showArrow={true}
			        filterOption={false}
			        onChange={this.handleChange}
			      >
			        <Option key="1" value="1">每年</Option>
              <Option key="2" value="2">每半年</Option>
              <Option key="3" value="3">每季度</Option>
              {/* <Option key="4" value="4">每两个月</Option> */}
              <Option key="5" value="5">每月</Option>
              <Option key="6" value="6">每周</Option>
			      </Select>
			    )}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 8 }}>
          <Button type="primary" htmlType="submit">下发</Button>
        </FormItem>
      </Form>  
    );
  }
}

const AddPatrolPlanForm = Form.create()(PatrolPlanForm);

export default AddPatrolPlanForm;

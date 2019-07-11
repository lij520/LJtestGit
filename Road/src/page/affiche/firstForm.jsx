import React from 'react';
import { Form, Button, Input, Select, message } from 'antd';
import moment from 'moment';
import MUtil from 'util/mm.jsx';

const _mm   = new MUtil();

const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
};

class FirstForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
			isSubmit: 0,
		}
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let firstInfo = this.props.form.getFieldsValue();
        console.log(firstInfo);
        this.props.setFirstData(firstInfo);
        this.setState({
            isSubmit: 1,
        },() => {
          this.nextHandleClick()
        });
      }
    })
  }

  nextHandleClick() {
    if(this.state.isSubmit == 0){
       message.info("请保存通知内容！")
    }
    if(this.state.isSubmit == 1){
        this.props.next();
    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const selectBefore = (
        <Select defaultValue="www." style={{ width: 90 }}>
          <Option value="http://">http://</Option>
          <Option value="https://">https://</Option>
          <Option value="www.">www.</Option>
        </Select>
      );
      const selectAfter = (
        <Select defaultValue=".com" style={{ width: 80 }}>
          <Option value=".com">.com</Option>
          <Option value=".jp">.jp</Option>
          <Option value=".cn">.cn</Option>
          <Option value=".org">.org</Option>
        </Select>
      );
    return(
        <Form onSubmit={(e) => this.handleSubmit(e)}>
            <FormItem {...formItemLayout} label="通知标题：">
            {getFieldDecorator('title', {
                initialValue: '',
                rules: [{
                required: true,
                message: '通知标题不能为空！',
                }],
            })(
                <Input placeholder="请输入通知标题！" />
            )}
            </FormItem>
            <FormItem {...formItemLayout} label="通知正文：">
            {getFieldDecorator('body', {
                initialValue: '',
                rules: [{
                required: true,
                message: '通知内容不能为空！',
                }],
            })(
                <TextArea placeholder="请输入通知正文！" autosize={{minRows: 5}} />
            )}
            </FormItem>
            <FormItem labelCol={{span:4}} wrapperCol={{span:4}} label="通知类型：">
            {getFieldDecorator('directoryId', {
                initialValue: '5',
                rules: [{
                required: true,
                message: '通知类型不能为空！',
                }],
            })(
                <Select
                    placeholder="请输入通知类型！"
                    defaultActiveFirstOption={false}
                    showArrow={true}
                    filterOption={false}
                    onChange={this.handleChange}
                    >
                    <Option key="1" value="5">通知</Option>
                    <Option key="2" value="6">公告</Option>
                </Select>
            )}
            </FormItem>
            <FormItem labelCol={{span:4}} wrapperCol={{span:4}} label="发布时间：">
            {getFieldDecorator('patrolPeriod', {
                initialValue: moment().format('YYYY-MM-DD HH:mm:ss') ,
                rules: [{
                //required: true,
                message: '发布时间!',
                }],
            })(
                <Input placeholder="发布时间!"  />
            )}
            </FormItem>
            <FormItem labelCol={{span:4}} wrapperCol={{span:8}} label="链接：">
            {getFieldDecorator('outlink', {
                initialValue: 'www.baidu.com',
                rules: [{
                //required: true,
                message: '文章中附带的链接！',
                }],
            })(
                // <Input addonBefore={selectBefore} addonAfter={selectAfter} placeholder="文章中附带的链接！"/>
                <Input placeholder="文章中附带的链接！"/>
            )}
            </FormItem>
            
            <FormItem wrapperCol={{ span: 12, offset: 17 }}>
              <Button type="primary" htmlType="submit">下一步</Button>
            </FormItem>
        </Form> 
       
    );
  }
}

const AddFirstForm = Form.create()(FirstForm);

export default AddFirstForm;

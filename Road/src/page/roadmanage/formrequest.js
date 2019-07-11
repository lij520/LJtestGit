
import React            from 'react';
import { Button, Modal, Form, Input, Select,Upload,Icon,DatePicker,message} from 'antd';
import $ from 'jquery';

const FormItem = Form.Item;
const Option = Select.Option;

const FormRequestCreate = Form.create()(
  class extends React.Component {
  
    constructor(props){
      super(props);
      this.state = {
        fileData:[],
        percent:'',
     
      };
  }
  
  
    render() {
      const { visible, onCancel, onSubmit, form } = this.props;
      const { getFieldDecorator } = form;

      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };

    
     
      
      return (
        <Modal
          visible={visible}
          title="请求上级"
          okText="提交" cancelText='取消'
          onCancel={onCancel}
          onOk={onSubmit}
        >
          <Form layout="vertical">
            <FormItem
            {...formItemLayout}
            label="协调人员"
            hasFeedback
            >
            {getFieldDecorator('auditor', {
                rules: [
                { required: true, message: '请选择协调人员!' },
                ],
            })(
                <Select placeholder="请选择协调人员">
                {this.props.higherUserList.map(higherUser=><Option key={higherUser.userId}>{higherUser.realName}</Option>)}
                </Select>//路管员应该为上报的人员，只能单选
            )}
            </FormItem>

            <FormItem  {...formItemLayout} label="设置处理时限">
              {getFieldDecorator('timeout', {
                rules: [{ required: true, message: '请设置处理时限' }],
              })(
                <DatePicker/>
              )}
            </FormItem>


            <FormItem  {...formItemLayout}  label="填写处理内容">
                {getFieldDecorator('processContent', {
                    rules: [{ required: true, message: '请填写处理内容' }],
                })
                (<Input type="textarea" />)}
            </FormItem>

           
          </Form>
        </Modal>
      );
    }
  }
);

class FormRequest extends React.Component {
  state = {
    visible: false,
    higherUserList:[],
  };

  showModal = () => {
    console.log(this.props.userId,this.props.token,this.props.regionId)
    var formData = new FormData();
    formData.append("userId",this.props.userId);
    formData.append("token ",this.props.token);
    formData.append("regionId ",this.props.regionId);
    formData.append("roleId",9);

    $.ajax({
      type        :  'post',
      url         :  '/eventmanage/getHigherUser', 
      data        :  formData,
      // dataType    :  'json',
      cache: false,//上传文件无需缓存
      processData: false,//用于对data参数进行序列化处理 这里必须false
      contentType: false, //必须
      success     : res => {
        
          console.log(res);
          if(res.result==1){
            this.setState({
              higherUserList:res.userList,
            })
            console.log(this.state.higherUserList);
          }
          else if(res.result==-1){
            message.error(res.message);
            window.location.href = '/';
          }
          else{
            message.error(res.message);
          }
          
          
      },
      error       : err => {
        message.error('无法查找该用户的上级组织!');
         
      }
    });
    this.setState({ visible: true });
  }

  handleCancel = () => {
    const form = this.formRef.props.form;
    this.setState({ visible: false });
    form.resetFields();
  }
  
dateToString(date) {   
    var y = date.getFullYear();    
    var m = date.getMonth() + 1;    
    m = m < 10 ? '0' + m : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    return y + '-' + m + '-' + d;
};

  handleSubmit = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      values.timeout={'dueTime':this.dateToString(values.timeout._d)}
      console.log('Received values of form: ', values);
     
     
      var formData = new FormData();
      formData.append("userId",this.props.userId);
      formData.append("token ",this.props.token);
      formData.append("eventId ",this.props.eventId);
      formData.append("limitTime ", values.timeout.dueTime);
      formData.append("content ", values.processContent);
      formData.append("nextUserId ",values.auditor);
      formData.append("solve ",7);

      $.ajax({
        type        :  'post',
        url         :  '/eventmanage/solveEvent', 
        data        :  formData,
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success     : res => { 

          if(res.result==1){
            message.success('事件已请求上级！');
            console.log(res);
            this.props.history.push('/roadmanage')
          }
          else if(res.result==-1){
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
      // console.log(this.props.loadEventList);
      // this.props.history.push(`/roadmanage/check/${this.props.id}`)//没有重新发送ajax请求
    });

    this.setState({ visible: false });
    form.resetFields();
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div  style={{display:'inline-block',marginLeft:'20px'}}>
        <Button type="primary" onClick={this.showModal} >请求上级</Button>
        <FormRequestCreate
          higherUserList={this.state.higherUserList}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default  FormRequest;

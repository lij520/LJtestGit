
import React            from 'react';
import { Button, Modal, Form, Input, Radio,DatePicker,message} from 'antd';
import { Link }     from 'react-router-dom';
import $ from 'jquery';

const FormItem = Form.Item;


const ProcessCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onSubmit, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="受理"
          okText="提交" cancelText='取消'
          onCancel={onCancel}
          onOk={onSubmit}
        >
          <Form layout="vertical">
            <FormItem label="设置处理时限">
              {getFieldDecorator('timeout', {
                rules: [{ required: true, message: '请设置处理时限' }],
              })(
                <DatePicker   />
              )}
            </FormItem>


            <FormItem label="填写处理内容">
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

class FormProcess extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
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
     
      
      console.log(this.props.eventId);
      var formData = new FormData();
      formData.append("userId",this.props.userId);
      formData.append("token ",this.props.token);
      formData.append("eventId ",this.props.eventId);
      formData.append("limitTime ", values.timeout.dueTime);
      formData.append("content ", values.processContent);
      formData.append("nextUserId ",this.props.userId);
      formData.append("solve ",1);
      $.ajax({
        type        :  'post',
        url         :  '/eventmanage/solveEvent', 
        data        :  formData,
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success     : res => { 

          if(res.result==1){
            message.success('事件已受理！');
            this.props.history.push('/roadmanage')
            console.log(res);
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
      // this.props.loadEventList();
      // console.log(this.props.loadEventList);
      
    });

    this.setState({ visible: false });
    form.resetFields();
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div  style={{display:'inline-block'}}>
        <Button type="primary" onClick={this.showModal} >受理</Button>
        <ProcessCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default FormProcess;

import React            from 'react';
import { Button, Modal, Form, Input, Select,Upload,Icon,DatePicker,message } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;

const FormCoordinateCreate = Form.create()(
  class extends React.Component {
  
    constructor(props){
      super(props);
      this.state = {
        fileData:[],
        percent:'',
      };
  }
  
  
      
      // 拦截文件上传
      beforeUpload(file){    
        this.setState(
          ({fileData})=>(
            {        fileData:[...fileData,file],    }
            )
          ) 
         
          return false;
      }
      
    getFileData(){
      
        return this.state.fileData;
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
          title="已协调"
          okText="提交" cancelText='取消'
          onCancel={onCancel}
          onOk={onSubmit}
        >
          <Form layout="vertical">
            <FormItem
            {...formItemLayout}
            label="处理人员"
            hasFeedback
            >
            {getFieldDecorator('auditor', {
                rules: [
                { required: true, message: '请选择处理人员!' },
                ],
            })(
                <Select placeholder="请选择处理人员">
                <Option value="大队">{this.props.nextStepName}</Option> 
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

            <FormItem  {...formItemLayout}  label="填写已协调内容">
                {getFieldDecorator('processContent', {
                    rules: [{ required: true, message: '请填写已协调内容' }],
                })
                (<Input type="textarea" />)}
            </FormItem>

             <FormItem
                {...formItemLayout}
                label="一张协调照片"
                >
              <Upload name="logo" action="/eventmanage/newEventByPc" 
               showUploadList={false}  beforeUpload={(e)=>this.beforeUpload(e)}>
                        <Button>
                        <Icon type="upload" /> Click to upload
                        </Button>
              </Upload>
            </FormItem>

           
          </Form>
        </Modal>
      );
    }
  }
);

class FormCoordinate extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
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
    var File=this.formRef.getFileData();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      values.timeout={'dueTime':this.dateToString(values.timeout._d)}; 
      console.log('Received values of form: ', values);
     
      form.resetFields();
      this.setState({ visible: false });

      var formData = new FormData();
      formData.append("userId",this.props.userId);
      formData.append("token ",this.props.token);
      formData.append("eventId ",this.props.eventId);
      formData.append("limitTime ", values.timeout.dueTime);
      formData.append("content ", values.processContent);
      formData.append("nextUserId ",this.props.nextStepId);
      formData.append("solve ",1);
     
      File.forEach((file)=>{
        formData.append('file',file);
      })
      $.ajax({
        type        :  'post',
        url         :  '/eventmanage/solveEvent', 
        data        :  formData,
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success     : res => { 

          if(res.result==1){
            message.success('事件已协调！');
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
      this.setState({ visible: false });
     
      // console.log(this.props.loadEventList);
      // this.props.history.push(`/roadmanage/check/${this.props.id}`)//没有重新发送ajax请求
    });

    
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    console.log(this.props.nextStepName,this.props.nextStepId);
    return (
      <div  style={{display:'inline-block',marginLeft:'20px'}}>
        <Button type="primary" onClick={this.showModal} >已协调</Button>
        <FormCoordinateCreate
          nextStepName={this.props.nextStepName}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default FormCoordinate;

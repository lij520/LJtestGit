import React from 'react';
import {  Button,Modal,message, Form, Input } from 'antd';

import $ from 'jquery';
const FormItem = Form.Item;


const NoProcessCreateForm = Form.create()(
  class extends React.Component {
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
          title="不受理"
          okText="提交" cancelText='取消'
          onCancel={onCancel}
          onOk={onSubmit}
        >
          <Form layout="vertical">
            <FormItem  {...formItemLayout}  label="填写不受理原因">
                {getFieldDecorator('reason', {
                    rules: [{ required: true, message: '请填写不受理原因' }],
                })
                (<Input type="textarea" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);


class FormNoProcess extends React.Component{

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
    
      
    
      handleSubmit = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
    
          console.log('Received values of form: ', values);
         
            var formData = new FormData();
            formData.append("userId",this.props.userId);
            formData.append("token ",this.props.token);
            formData.append("maintenanceId",this.props.eventId);
            formData.append("nextUserId ",this.props.roadManagerId);
            formData.append("content",values.reason);
            formData.append("solve ",2);
            $.ajax({
                type        :  'post',
                url         :  '/maintenance/solveMaintenance', 
                data        :  formData,
                cache: false,//上传文件无需缓存
                processData: false,//用于对data参数进行序列化处理 这里必须false
                contentType: false, //必须
                success     : res => { 
                    console.log(res);

                    if(res.result==1){
                        message.success('事件已选择不受理！');
                        this.props.history.push('/roadprotect')
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
        // this.setState({ visible: true });
          // this.props.loadEventList();
          // console.log(this.props.loadEventList);
          
        });

        this.setState({ visible: false });
        form.resetFields();
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }


    // showConfirm(){

    //     return new Promise((resolve, reject) => {
    //         Modal.confirm({
    //             title: '确认不处理此事件？',
                
    //             onOk() {
    //             return resolve(true)
    //             },
    //             onCancel() {
    //             return reject(false)
    //             },
    //         })
    //         })  
    // }
      
      
    
    // NoProcess(){
        
    //     this.showConfirm().then(res => {
    //         console.log(this.props. roadManagerId);
    //         var formData = new FormData();
    //         formData.append("userId",this.props.userId);
    //         formData.append("token ",this.props.token);
    //         formData.append("maintenanceId",this.props.eventId);
    //         formData.append("nextUserId ",this.props. roadManagerId);
    //         formData.append("solve ",2);
    //         $.ajax({
    //             type        :  'post',
    //             url         :  '/maintenance/solveMaintenance', 
    //             data        :  formData,
    //             cache: false,//上传文件无需缓存
    //             processData: false,//用于对data参数进行序列化处理 这里必须false
    //             contentType: false, //必须
    //             success     : res => { 
    //              
    //               this.props.history.push('/roadprotect')
    //               console.log(res);
    //             },
    //             error       : err => {
    //                
                   
    //             }
    //         });
           
    //     })
    //     .catch(reject => console.log('cancel'))
    
    // }

    render(){
      return (
        <div  style={{display:'inline-block',marginLeft:'20px'}}>
            <Button type="primary"  onClick={this.showModal} >不受理</Button>
            <NoProcessCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onSubmit={this.handleSubmit}
            />
        
        </div>
        
      );
    }
  }
  
  
  export default FormNoProcess;
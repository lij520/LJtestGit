
import React            from 'react';
import { Button, Modal, Form, Input, Select,Upload,Icon,DatePicker,message } from 'antd';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();
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
          title="下发给大队"
          okText="下发" cancelText='取消'
          onCancel={onCancel}
          onOk={onSubmit}
        >
          <Form layout="vertical">
            <FormItem
            {...formItemLayout}
            label="下发人员"
            hasFeedback
            >
            {getFieldDecorator('nextUserId', {
                rules: [
                { required: true, message: '请选择下发人员!' },
                ],
            })(
                <Select placeholder="请选择下发人员">
                 {this.props.team.map(team=> <Option key={team.userId}>{team.realName}</Option>)}
                </Select>//路管员应该为上报的人员，只能单选
            )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class FormIssue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          userId                  : _mm.getStorage('userInfo').userId,
          token                   : _mm.getStorage('userInfo').token,
          regionId                :_mm.getStorage('userInfo').regionId,
          list                    :[],
          loading                 : false,
          visible                 : false,
          team                    :[],
          planId                  : this.props.planId,

        } 
    }
  

  showModal = () => {
    console.log(this.props.userId,this.props.token,this.props.regionId)
    var formData = new FormData();
    formData.append("userId",this.state.userId);
    formData.append("token",this.state.token);
    formData.append("regionId",this.state.regionId);
    formData.append("roleId",8);
    
    $.ajax({
      type        :  'post',
      url         :  '/maintenance/getNextRoadChiefTeam', 
      data        :  formData,
      cache: false,//上传文件无需缓存
      processData: false,//用于对data参数进行序列化处理 这里必须false
      contentType: false, //必须
      success     : res => { 
        console.log(res);

        if(res.result==1){
          this.setState({ team:res.userList});
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
      console.log(this.state.planId);
     
      
      var formData = new FormData();
      formData.append("userId",this.state.userId);
      formData.append("token",this.state.token);
      formData.append("maintenancePlanId",this.state.planId);
      formData.append("maintenancePlanStatus",3);
      formData.append("nextUserId",values.nextUserId);

      $.ajax({
        type        :  'post',
        url         :  '/maintenance/updateMaintenancePlan', 
        data        :  formData,
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success     : res => { 

         
          console.log(res);
         
          if(res.result==1){
            // message.success('养护计划！');
            this.props.loadEventList();
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
    //   console.log(this.props.loadEventList);
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
      <div  style={{display:'inline-block'}}>
        <Button  size="small" onClick={this.showModal} >下发</Button>
        <FormRequestCreate
          team={this.state.team}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default  FormIssue;


import React            from 'react';
import { Button, Modal, Form, Input, Select,Upload,Icon,DatePicker,message} from 'antd';
import $ from 'jquery';

const FormItem = Form.Item;
const Option = Select.Option;

const FormHandleCreate = Form.create()(
  class extends React.Component {
  
    constructor(props){
      super(props);
      this.state = {
        percent:'',
        test:1,
        fileData:[],
      };
  }

  getFileData(){
    // console.log(this.state.test);
    return this.state.fileData;
  }
  
  // 这个是监听文件变化的
  // fileChange=(params)=>{    
  //   const {file,fileList}=params;    
  //   if(file.status==='uploading'){        
  //     // setTimeout(()=>{            
  //     //   this.setState({                
  //     //     percent:fileList.percent                
  //     //   })        },1000)  
     
  //     }
  //     console.log(this.state.percent);
  //   // console.log(this.state.fileData);
  //   if(file.status==='done'){
  //     return this.state.fileData;
  //   }
  //   // console.log(fileList);
  // }
      
      // 拦截文件上传
      beforeUpload(file){    
        this.setState(
          ({fileData})=>(
            {        fileData:[...fileData,file],    }
            )
          ) 
         
          return false;
      }
      
      // 文件列表的删除
      // fileRemove=(file)=>{    
      //   this.setState(
      //     ({fileData})=>{        
      //       const index=fileData.indexOf(file);        
      //       let newFileList=fileData.slice();        
      //       newFileList=splice(index,1);        
      //       return {           fileData:newFileList        }    
      //     }
      //   )
      //   console.log(this.state.fileData);
      // }

      normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      }

 
  
  

    render() {
      const { visible, onCancel, onSubmit, form } = this.props;
      const { getFieldDecorator } = form;

      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      console.log( this.props.roadManager);
      
      return (
        <Modal
          visible={visible}
          title="已处理"
          okText="提交" cancelText='取消'
          onCancel={onCancel}
          onOk={onSubmit}
        >
          <Form layout="vertical" >
            <FormItem
            {...formItemLayout}
            label="审核人员"
            hasFeedback
            >
            {getFieldDecorator('auditor', {
                rules: [
                { required: true, message: '请选择审核人员!' },
                ],
            })(
                <Select placeholder="请选择审核人员">
                <Option value="路管员">{this.props.roadManager}</Option> 
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

             <FormItem
                {...formItemLayout}
                label="一张处理照片"
                >
                {/* {getFieldDecorator('eventPic', 
                {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.fileChange,
                }
                )
                (
                    <Upload name="logo"  action='/eventmanage/solveEvent' beforUpload={this.beforeUploadHandle} onChange={this.fileChange} fileList={this.state.fileData}
                    // onRemove={this.fileRemove} 
                    // action={isNull}
                    listType="picture">
                        <Button>
                        <Icon type="upload" /> Click to upload
                        </Button>
                    </Upload>
                )} */}
                {/* {getFieldDecorator('eventPic', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile ,
                })
                (
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                        <Icon type="upload" /> Click to upload
                        </Button>
                    </Upload>
                )} */}
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

class FormHandle extends React.Component {
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
    var File=this.formRef.getFileData();
    // console.log( this.formRef.getTest());
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      values.timeout={'dueTime':this.dateToString(values.timeout._d)};
     
      console.log('Received values of form: ', values);
     
      if(this.props.eventType=='5'){

            var formData = new FormData();
            formData.append("userId",this.props.userId);
            formData.append("token ",this.props.token);
            formData.append("maintenanceId",this.props.eventId);
            formData.append("limitTime ", values.timeout.dueTime);
            formData.append("content ", values.processContent);
            formData.append("nextUserId ",this.props.roadManagerId);
            formData.append("solve ",4);
      
            File.forEach((file)=>{
              formData.append('file',file);
          })
      
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
                  message.success('事件已选择处理！');
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

    }

    else{
            var formData = new FormData();
            formData.append("userId",this.props.userId);
            formData.append("token ",this.props.token);
            formData.append("maintenanceId",this.props.eventId);
            formData.append("limitTime ", values.timeout.dueTime);
            formData.append("content ", values.processContent);
            formData.append("nextUserId ",this.props.roadManagerId);
            formData.append("solve ",3);

            File.forEach((file)=>{
              formData.append('file',file);
          })

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
                  message.success('事件已选择处理！');
                  this.props.history.push('/roadprotect');
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
    }
      

      
    
    
      // this.props.loadEventList();
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
        <Button type="primary" onClick={this.showModal} >已处理</Button>
        <FormHandleCreate roadManager={this.props.roadManager} roadManagerId={this.props.roadManagerId}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default FormHandle;

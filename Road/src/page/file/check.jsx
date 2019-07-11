
import React            from 'react';
// import { HashRouter as Link } from 'react-router-dom';
import { Col, Row,Icon, Table,Button, Collapse,Input,DatePicker,Form,Modal,Upload,message,Select} from 'antd';
import './index.scss';
import './index.less';
import moment from 'moment';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

const Panel = Collapse.Panel;
const {RangePicker } = DatePicker;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;

class FileUploadCreateForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fileInfo:[],
     
    } 
}



normFile(e){
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}

fileChange(info){
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
 
  this.setState({
    fileInfo:info.file.response.fileinfo,
  });
  console.log(this.state.fileInfo);
  //   $.ajax({
  //     type        :  'post',
  //     url         :  '/filemanage/test', 
  //     data        :  JSON.stringify(this.state.fileInfo),
  //     contentType :'application/json;charset=utf-8', //设置请求头信息  
  //     success     : res => { 
  //       
  //       console.log(res);
  //     },
  //     error       : err => {
  //         
         
  //     }
  // });

  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
}

render() {
  
  
  const { visible, form} = this.props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
 
  
  
   const props = {
        name: 'file',
        action: '/filemanage/uploadFile',
        headers: {
          authorization: 'authorization-text',
        },
      

        data:{userId:this.props.userId,token:this.props.token,directoryId:this.props.directoryId,fileNum:this.props.fileNum,},
        onChange:(info)=>this.fileChange(info)
      };
     
    
   
  return(
    <Modal
          visible={visible}
          title="文件上传"
          okText="上传" cancelText='关闭'
          onCancel={()=>this.props.onCancel()}
          onOk={()=>this.props.onSubmit()}
        >
      <Form >

      <FormItem
              {...formItemLayout}
              label="档案编号"
              >
              {getFieldDecorator('fileNum',{
                   initialValue:this.props.fileNum,  
                    })
              ( 
                  <Select placeholder="选择档案编号" disabled={true}>
                  </Select> 
              )}
      </FormItem>
     
      <FormItem
              {...formItemLayout}
              label="资料归属"
              >
              {getFieldDecorator('directoryId', {
                  initialValue:this.props.directoryName,
              })(
                  <Select placeholder="选择资料归属" disabled={true}>
                  </Select> 
              )}
      </FormItem>
      <FormItem
          {...formItemLayout}
          label="选择文件"
          >
          {getFieldDecorator('upload', {
            rules: [{
              required: true, message: '请选择文件!',
              },],
            valuePropName: 'fileList',
            getValueFromEvent: (e)=>this.normFile(e),
          })(
            <Upload 
            {...props}
            >
              <Button >
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
      </FormItem>
      
      </Form>
    </Modal>
  )
}
}
const  FileUploadForm = Form.create()(FileUploadCreateForm);

class  FileCheck extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list                :[],
            directoryId         : this.props.match.params.pid,
            directoryName       :this.props.match.params.tid,
            list                :[],
            loading             : true,
            visible             : false,
            userId              : _mm.getStorage('userInfo').userId,
            token               : _mm.getStorage('userInfo').token,
            fileNum             :'',
            fileNumSearch       :'',
            fileNameSearch      :'',
            startTime           :'2018-10-03',
            endTime             :'2018-10-08',
          
        }
    }

    componentDidMount(){
        this.loadEventList();
      }
      
    loadEventList(){
      
         // this.setState({loading:true});
      var formData = new FormData();
      formData.append("userId",this.state.userId);
      formData.append("token ",this.state.token);
      formData.append("directoryId ",this.state.directoryId);
  
      $.ajax({
        type        :  'post',
        url         :  '/filemanage/findFileById',
        data        :  formData,
      //   dataType: "formData",
        cache       : false,//上传文件无需缓存
        processData : false,//用于对data参数进行序列化处理 这里必须false
        contentType : false, //必须
        success     : res => {
            console.log(res);

            if(res.result==1){
              // message.success(res.message);
                this.setState({
                  list:res.fileList ,
                });
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
            this.setState({
                list : []
            });
        }
      });
    }
      
    showConfirm(){
      
        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: '确认删除此文件？',
            okText: '确定',
            cancelText: '取消',
            
            onOk() {
              return resolve(true)
            },
            onCancel() {
              return reject(false)
            },
          })
        })  
        
       
    }
      
      
      
    handleDelete(e,record){
        
        this.showConfirm().then(res => {
          // console.log(record.eventId)
      
          var formData = new FormData();
          formData.append("userId",this.state.userId);
          formData.append("token",this.state.token);
          formData.append("fileId",record.fileId);  
      
          $.ajax({
            type        :  'post',
            url         :  '/filemanage/deleteFile', 
            data        :  formData,
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            success     : res => { 
            
              if(res.result==1){
                message.success('成功删除此事件!');
                this.loadEventList();
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
                
        })
        .catch(reject => console.log('cancel'))
      
    }


    download(e,record){
      window.location.href="/filemanage/downloadFile?userId="+this.state.userId+"&token="+this.state.token+"&fileId="+record.fileId;
    }

  //modal的相关函数
  
    showModal(e,record){
    
      this.setState({ visible: true,fileNum:record.fileNum });
     
    }
    
    handleCancel (){
      const form = this.formRef.props.form;
      
      this.setState({ visible: false });
      form.resetFields();
    }
    
    handleSubmit(){
      const form = this.formRef.props.form;
      // var File=this.formRef.getFileData();
      // console.log( this.formRef.getTest());
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
      this.setState({ visible: false });
      form.resetFields();
      this.loadEventList();
      // window.location.href=`#/file/checkname/${this.state.directoryId}/${this.state.directoryName}`;
      });
      
    }
    
    saveFormRef (formRef){
      this.formRef = formRef;
    }

  //高级查询部分

onInputChange(e){
  let inputValue  = e.target.value,
  inputName       = e.target.name;
  this.setState({
      [inputName] : inputValue
  });
} 

dateToString(date) {   
  var y = date.getFullYear();    
  var m = date.getMonth() + 1;    
  m = m < 10 ? '0' + m : m;    
  var d = date.getDate();    
  d = d < 10 ? ('0' + d) : d;    
  return y + '-' + m + '-' + d;
};

onTimeChange(values){
  console.log(values);
  this.setState({
    startTime  : this.dateToString(values[0]._d),
    endTime    :this.dateToString(values[1]._d)
  });  
}

onSearch(){
  var formData = new FormData();
  formData.append("userId",this.state.userId);
  formData.append("token",this.state.token);
  formData.append("directoryId ",this.state.directoryId);
  formData.append("fileNum",this.state.fileNumSearch);
  formData.append("fileName",this.state.fileNameSearch);
  formData.append("startTime",this.state.startTime);
  formData.append("endTime",this.state.endTime);

  $.ajax({
      type        :  'post',
      url         :  '/filemanage/findFileById',
      data:  formData,
    //   dataType: "formData",
      cache: false,//上传文件无需缓存
      processData: false,//用于对data参数进行序列化处理 这里必须false
      contentType: false, //必须
      success     : res => {
        
          console.log(res);
 
          if(res.result==1){
            this.setState({
              list:res.fileList,
              loading:false
            });
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
          this.setState({
              list : []
          });
      }
    });
  
}

resetting(){
  this.setState({
      eventType :'',
      eventCode       :'',
      startTime       :'2018-10-03',
      endTime         :'2018-10-08',
      userName        :'',
  });
  this.loadEventList();
}


    render(){

        const columns = [{  //columns每列的类型一样，dataIndex对应data中的属性
            title: '序号',
            dataIndex:'fileId',
          }, {
            title: '档案编号',
            dataIndex:'fileNum',
          }, 
          {                    
            title: '档案名',
            dataIndex:'fileName',
          },
          {                    
            title: '上传时间',
            dataIndex:'submitTime',
          },
          {                    
            title: '档案分类',
            dataIndex:'directoryName',
          },{                    
            title: '版本号',
            dataIndex:'version',
          },
          {                    
            title: '操作',
            dataIndex: 'action',
            render: (text,record) => (
              <div>
                <Button  size="small" onClick={(e)=> this.showModal(e,record)}><Icon type="upload" theme="outlined" /></Button>
                <FileUploadForm  userId={this.state.userId} token={this.state.token}
                              fileNum={this.state.fileNum} directoryId={this.state.directoryId} directoryName={this.state.directoryName}
                              wrappedComponentRef={(e)=>this.saveFormRef(e)}
                              visible={this.state.visible}
                              onCancel={()=>this.handleCancel()}
                              onSubmit={()=>this.handleSubmit()}
                />
                <Button  size="small" onClick={(e)=>this.download(e,record)}><Icon type="download" theme="outlined" /></Button>
                <Button  size="small"  onClick={(e)=>this. handleDelete(e,record)} ><Icon type="delete" theme="outlined" /></Button> 
              </div>) //record为列表中某一行的值
          }
        ];
        
        
        const data = [];
        
        this.state.list.map((file,index)=>{
            data.push({
                      key: index,
                      fileId:file.fileId,
                      fileNum:file.fileNum,
                      fileName:file.fileName,
                      submitTime:file.submitTime,
                      directoryName:this.state.directoryName,
                      version:file.version,
                    });        
        })

      
       

        return (
            <div style={{height:'100%'}}>   
                    <Row>
                    <Col span={8} >
                    <span style={{fontSize: '18px',fontWeight:'400'}}> <Icon type="file-text" theme="outlined" className='menu_icon'  style={{fontSize: '23px',marginLeft: '15px',marginRight: '8px'}}/>资料目录<Icon  type="right" theme="outlined"  style={{fontSize: '15px'}}/></span>
                    <span style={{fontSize: '19px',color:'#7c9fca'}}>{this.state.directoryName}</span>
                    </Col>
                    <div style={{float:'right'}}>
                            <Button type="primary" style={{ marginLeft:'15px' }} onClick={()=>this.props.history.push('/file')}><Icon type="backward" theme="outlined" style={{fontSize:'20px'}}/>返回</Button>
                            {/* <Button type="primary" style={{ marginLeft:'10px' }} onClick={()=> this.resetting()}><Icon type="upload" theme="outlined" style={{fontSize:'20px'}}/>上传</Button> */}
                    </div>
                    </Row>
                        
                    <Collapse  accordion bordered={false} style={{marginTop:'10px'}}>
                            <Panel header="高级查询" key="1" style={{backgroundColor:'#efefef'}} >
                            <Row style={{marginTop:'5px'}}>
                                <Col span={12}>
                                <label style={{ marginLeft:'15px' }}>档案编码</label>
                                    <Input placeholder="请输入档案编码" style={{ width:'160px', marginLeft:'5px' }} value={this.state.fileNumSearch}  name="fileNumSearch" onChange={(e)=>this.onInputChange(e)} />
                                </Col>
                                <Col span={12}>
                                <label style={{ marginLeft:'15px' }}>档案名</label>
                                  <Input placeholder="请输入档案编码" style={{ width:'160px', marginLeft:'5px' }} value={this.state.fileNameSearch}  name="fileNameSearch" onChange={(e)=>this.onInputChange(e)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={16} style={{ marginTop:'15px' }}>
                                <label style={{ marginLeft:'15px' }}>起止时间</label>
                                <RangePicker style={{ marginLeft:'5px' }} onChange={(e)=>this.onTimeChange(e)} value={[moment(this.state.startTime, dateFormat), moment(this.state.endTime, dateFormat)]} />
                                </Col>
                            </Row>
                            <div style={{float:'right',marginBottom:'20px'}}>
                                <Button type="primary" style={{ marginLeft:'15px' }} onClick={()=>this.onSearch()}>查询</Button>
                                <Button type="primary" style={{ marginLeft:'10px' }} onClick={()=> this.resetting()}>重置</Button>
                            </div>

                            </Panel>
                    </Collapse>
                    <Table  columns={columns} dataSource={data}   style={{marginBottom:'50px'}} 
                        // loading={this.state.loading} 
                    rowClassName={(record,index) => index % 2 === 0 ? "grayRow" : "whiteRow" } />
            </div>
        )
    }
}
export default  FileCheck;
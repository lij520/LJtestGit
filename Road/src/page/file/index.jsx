import React from 'react';
import { Card, Col, Row,Icon, List,Button,Form,Modal,Upload,message,Select} from 'antd';
import { HashRouter as  Link } from 'react-router-dom';
import './index.scss';
import './index.less';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

const FormItem = Form.Item;
const Option = Select.Option;
class FileUploadCreateForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fileInfo:[],
      directoryId:'',
    } 
}

directoryNameChange(value){
  this.props.changeUploadDisabled();
  this.setState({
    directoryId:value,
  })
}

handleConfirmClick (){
 if(this.props.UploadDisabled==true){
  message.error('请先选择资料归属！')
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
 
  console.log(this.state.directoryId)

   const props = {
        name: 'file',
        action: '/filemanage/uploadFile',
        headers: {
          authorization: 'authorization-text',
        },  
        
        data:{userId:this.props.userId,token:this.props.token,directoryId:this.state.directoryId},
        onChange:(info)=>this.fileChange(info)
      };
     
   console.log(this.props.content_form)    
   
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
              label="资料归属"
              >
              {getFieldDecorator('directoryName', {
                  rules: [{ required: true, message: '请输入资料归属!' },
                  ],
              })(
                  <Select placeholder="选择资料归属" onChange={(e)=>this.directoryNameChange(e)}>
                    {this.props.content_form.map(content=> <Option key={content.directoryId}>{content.name}</Option>)}
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
            <Upload disabled={this.props.UploadDisabled}
            {...props}
            >
              <Button onClick={()=>this.handleConfirmClick()}>
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

class FileManage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        list                    :[],
        eventId                 : this.props.match.params.pid,
        visible                 : false,
        UploadDisabled          : true,
        loading                 : false,
        userId                  : _mm.getStorage('userInfo').userId,
        token                   : _mm.getStorage('userInfo').token,
        roleId                  :_mm.getStorage('userInfo').roleId,
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
  formData.append("roleId",this.state.roleId);
  
  $.ajax({
    type        :  'post',
    url         :  '/filemanage/getDirectoryList',
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
              list:res.directoryList ,
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

changeUploadDisabled(){
  this.setState({
    UploadDisabled          : false,
  })
}

showModal(){

  this.setState({ visible: true,UploadDisabled:true });
}

handleCancel (){
  const form = this.formRef.props.form;
  
  this.setState({ visible: false,UploadDisabled:true });
  form.resetFields();
}

handleSubmit(){
  const form = this.formRef.props.form;
  
  form.validateFields((err, values) => {
    if (err) {
      return;
    }
  this.setState({ visible: false });
  form.resetFields();
  
  });
  
}

saveFormRef (formRef){
  this.formRef = formRef;
}




  
  render(){

    const content_form=[];
    let content=[
      {'letter':'A','count':0,'data':new Array(),'key':0},
      {'letter':'B','count':0,'data':new Array(),'key':1},
      {'letter':'C','count':0,'data':new Array(),'key':2},
      {'letter':'D','count':0,'data':new Array(),'key':3},
      {'letter':'E','count':0,'data':new Array(),'key':4},
      {'letter':'F','count':0,'data':new Array(),'key':5},
      {'letter':'G','count':0,'data':new Array(),'key':6},
      {'letter':'H','count':0,'data':new Array(),'key':7},
      {'letter':'I','count':0,'data':new Array(),'key':8},
      {'letter':'J','count':0,'data':new Array(),'key':9},
      {'letter':'K','count':0,'data':new Array(),'key':10},
      {'letter':'L','count':0,'data':new Array(),'key':11},
      {'letter':'M','count':0,'data':new Array(),'key':12},
      {'letter':'N','count':0,'data':new Array(),'key':13},
      {'letter':'O','count':0,'data':new Array(),'key':14},
      {'letter':'P','count':0,'data':new Array(),'key':15},
      {'letter':'Q','count':0,'data':new Array(),'key':16},
      {'letter':'R','count':0,'data':new Array(),'key':17},
      {'letter':'S','count':0,'data':new Array(),'key':18},
      {'letter':'T','count':0,'data':new Array(),'key':19},
      {'letter':'U','count':0,'data':new Array(),'key':20},
      {'letter':'V','count':0,'data':new Array(),'key':21},
      {'letter':'W','count':0,'data':new Array(),'key':22},
      {'letter':'X','count':0,'data':new Array(),'key':23},
      {'letter':'Y','count':0,'data':new Array(),'key':24},
      {'letter':'Z','count':0,'data':new Array(),'key':25},
    ];

    let content_list=[];

    for(var i=0 ; i<content.length ; i++){
      for(var j=0 ; j<this.state.list.length ; j++){
        if(this.state.list[j].letter == content[i].letter){
          content[i].count =  content[i].count + 1;
          content[i].data.push({name:this.state.list[j].name,directoryId:this.state.list[j].directoryId})
        }//if结束
      }//第二个for结束
      if(content[i].count!=0){
        content_list.push({key:i,data:content[i].data,letter:content[i].letter})
      }
      
  }//第一个for结束

    for(var j=0 ; j<this.state.list.length ; j++){
      content_form.push({name:this.state.list[j].name,directoryId:this.state.list[j].directoryId})
    }
  

    return (

            <div style={{height:'100%'}}>   
                <Row style={{height:'100%',paddingTop: '10px',paddingBottom:' 50px'}}>
                    <Col span={24} style={{height:'100%'}}>
                    <Card  bordered className='card_home'>
                        <div  className='card_title_background'  >
                        <div className='card_news' style={{display:'inline-block'}}>
                        <h3 className='save_title'> <Icon type="file-text" theme="outlined" className='menu_icon'  style={{fontSize: '23px',marginLeft: '15px',marginRight: '8px'}}/>资料目录</h3>
                        </div>
                        <div style={{float:'right'}}>
                            <Button type="primary" style={{ marginLeft:'10px',marginTop:'2px' }} onClick={()=> this.showModal()}><Icon type="upload" theme="outlined" style={{fontSize:'20px'}}/>上传</Button>
                            <FileUploadForm content_form={content_form} UploadDisabled={this.state.UploadDisabled} changeUploadDisabled={()=>this.changeUploadDisabled()}
                              userId={this.state.userId}  token={this.state.token}
                              wrappedComponentRef={(e)=>this.saveFormRef(e)}
                              visible={this.state.visible}
                              onCancel={()=>this.handleCancel()}
                              onSubmit={()=>this.handleSubmit()}
                            />
                        </div>
                        </div>

                        <List  style={{padding:'20px',paddingTop:'7px'}} className='file_list'
                          itemLayout="horizontal" pagination={{ pageSize: 6,}}
                          dataSource={content_list}   
                          renderItem={item => (
                            <List.Item key={item.letter} >
                                <List.Item.Meta  
                                avatar={<Icon  type="folder-open" theme="outlined" className='menu_icon'  style={{fontSize: '25px',marginLeft: '15px',marginRight: '8px'}}/>}
                                title={item.letter}
                                description={
                                  <Row > 
                                  {item.data.map((content,index)=>(
                                    <div key={index}>
                                    <Col span={8} > 
                                         <a href={`#/file/checkname/${content.directoryId}/${content.name}`} >
                                         {content.name}
                                        </a>
                                        {/* <Button>
                                          <Link to={ `/file/checkname/${content.directoryId}`}>About</Link>
                                        </Button> */}
                                         
                                    </Col>
                                    </div>
                                  )
                                    
                                  )}
                                  </Row>
                                  }
                              />
                            </List.Item>
                          )}
                        />
                    </Card>
                    </Col>
                </Row>
            </div>
    
    );
  }
}


export default FileManage;





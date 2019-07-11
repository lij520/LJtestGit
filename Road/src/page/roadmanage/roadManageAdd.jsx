import React from 'react';
import { Input,Button,Upload,Icon } from 'antd';
import $ from 'jquery';

class RoadManageAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId              : '5',
            token               :'E18C25091DA9919A06D5FB1D7F5FF612',
            eventTime           :'2018-10-03',
            limitTime           :'2018-10-08',
            roadId              :'35230000000000',
            regionId            :'350823101000',
            problemType         :'0100',
            eventPoint          :'',
            eventContent        :'1111',
            rectification       :'11',
            type                :'1',
            nextUserId          :'4',

           loading:'false',
           fileData:[],
           percent:'',
         
        }
    }

     beforeUpload(file) {
        this.setState(
            ({fileData})=>(
              {        fileData:[...fileData,file],    }
              )
            ) 
           
            return false;
       
      }

      getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
    handleChange (params){
        const {file,fileList}=params;    
        if(file.status==='uploading'){        
        setTimeout(()=>{            
            this.setState({                
            percent:fileList.percent                
            })        },1000)  
        
        }
      console.log(this.state.percent);
      } 


       // 提交表单
       onSubmit(){

        var formData = new FormData();
        formData.append("userId",this.state.userId);
        formData.append("token ",this.state. token);
        formData.append("eventTime ",this.state.eventTime)
        formData.append("limitTime",this.state. limitTime)
        formData.append(" roadId",this.state. roadId)
        formData.append(" regionId",this.state. regionId)
        formData.append(" problemType",this.state. problemType),
        formData.append(" eventPoint",this.state. eventPoint),
        formData.append("eventContent",this.state. eventContent),
        formData.append(" rectification",this.state. rectification),
        formData.append(" type  ",this.state. type),
        formData.append("nextUserId",this.state.   nextUserId),

        
        this.state.fileData.forEach((file)=>{

            formData.append('file',file);

        })

      
        
            $.ajax({
                type        :  'post',
                url         :  'http://localhost:13077/eventmanage/newEventByPc', 
                // dataType    :  'json',
                // data        :  user,
                data:  formData,
                dataType: "formData",
                cache: false,//上传文件无需缓存
                processData: false,//用于对data参数进行序列化处理 这里必须false
                contentType: false, //必须

                success     : res => {
                
                    message.success('success!');
                    // this.props.history.push('/user');
                },
                error       : err => {
                    message.error('error!');
                   
                }
            });

        }
    render(){
        console.log(this.state.fileData);
       if(this.state.fileData.length!=0){
        message.success('图片上传成功！');
       }
        
   
      return (
        <div id="page-wrapper">
             
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <Button type="primary"   style={{marginLeft:'25%'}}
                                onClick={(e) => {this.onSubmit(e)}}>提交</Button>
                            <Upload
                               
                                showUploadList={false}
                                action="http://localhost:13077/eventmanage/newEventByPc"
                                beforeUpload={(e)=>this.beforeUpload(e)}
                                onChange={(e)=>this.handleChange(e)}
                            >
                                <Button>
                                <Icon type="upload" /> Click to Upload
                                </Button>
                            </Upload>
                        </div>
                    </div>
                    <br/>
                    <br/>
                {/* </div> */}
            </div>
      
       
      );
    }
  }
  
  
  export default RoadManageAdd;
import React            from 'react';
import { List, Table,Button, Upload,Icon,message,Modal} from 'antd';
import './index.less';
import './index.scss';
import FormProcess from './formProcess';
import FormNoProcess from './formNoProcess';
import FormHandle from './formHandle.js';
import FormRequest from './formrequest.js';
import FormCoordinate from './formcoordinate';
import $ from 'jquery';

import Zmage from 'react-zmage';
import { Player } from 'video-react';
import "util/video-react.css";

import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();

class RoadProtectCheck  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list                    : [],
            list_pic                :[],
            loading                 : false,
            userId                  : _mm.getStorage('userInfo').userId,
            roleId                  : _mm.getStorage('userInfo').roleId,
            regionId                : _mm.getStorage('userInfo').regionId,
            token                   : _mm.getStorage('userInfo').token,
            eventId                 : this.props.match.params.pid,
            PageNo                  : this.props.match.params.tid,
            PageSize                : this.props.match.params.zid,
            eventType               : this.props.match.params.aid,
            eventCode               : this.props.match.params.bid,
            userName                :this.props.match.params.cid,
            startTime               :this.props.match.params.did,
            endTime                 :this.props.match.params.eid,
            type                    :this.props.match.params.fid,
            problemType             :this.props.match.params.gid,
            loading                 :false,
            event_detail            :{},
            event_detail_pic        :[],
            listData                :[ { title: '查看详情', index: 0}],
            eventstate              :'',
            visible                 : false
        }
    }
     
    
    
    componentDidMount(){
        this.loadEventList();
        
        let searchParameterProtect={
            eventType               :this.state.eventType,
            eventCode               :this.state.eventCode,
            userName                :this.state.userName,
            startTime               :this.state.startTime,
            endTime                 :this.state.endTime,
            PageNo                  :this.state.PageNo,
            PageSize                :this.state.PageSize,
            type                    :this.state.type,
            problemType             :this.state.problemType,
        };
      

        for (var attr in searchParameterProtect){
            if (searchParameterProtect[attr]=="XX"){
                searchParameterProtect[attr]="";
            }
        }

        _mm.setStorage('searchParameterProtect',searchParameterProtect);
    }
    
    loadEventList(){
        this.setState({loading:true});
        console.log(this.state.userId);
        console.log(this.state.token);
        console.log(this.state.eventId);
        var formData = new FormData();
        formData.append("userId",this.state.userId);
        formData.append("token ",this.state.token);
        formData.append("maintenanceId",this.state.eventId);
        if(this.state.eventId  ){

            $.ajax({
                type        :  'post',
                url         :  '/maintenance/queryWorkflowLog', 
                data        :  formData,
                cache: false,//上传文件无需缓存
                processData: false,//用于对data参数进行序列化处理 这里必须false
                contentType: false, //必须
                success     : res => {
                  
                    console.log(res);

                    if(res.result==1){
                        let list=res.userlist;
                    // console.log(list);

                        this.setState({
                            listData :[ { title: '查看详情', index: 0}],
                            event_detail:res.maintenanceList[0],   //查看详情部分内容
                            event_detail_pic:res.maintenanceList[0].maintenanceFileList,
                            loading: false,
                            list:res.maintenanceWorkflowLog,
                            eventstate:res.maintenanceList[0].maintenanceTypeName,
                            nowUserId:res.maintenanceWorkflowLog[res.maintenanceWorkflowLog.length-1].userId,//直接取值
                        
                        })
                        console.log( this.state.event_detail);
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
    }


    showDrawer(){
        this.setState({
          visible: true,
        });
    };
    
    onClose(){
        this.setState({
          visible: false,
        });
    };

    render(){
       
        const columns = [
            {                               
                dataIndex: 'tag',
            }, {
                dataIndex: 'value',
            }
        ];
      
      
        const data = [];
        data.push(
            {
                key: '0',
                tag: '事件内容:',
                value:this.state.event_detail.maintenanceContent,
            },
            {
                key: '1',
                tag: '事发时间:',
                value:this.state.event_detail.maintenanceTime,
            },
            {
                key: '2',
                tag: '处理时间:',
                value:this.state.event_detail.updateTime,
            },
            {
                key: '3',
                tag: '事发道路:',
                value:this.state.event_detail.roadName,
            },
            {
                key: '4',
                tag: '事件上报人:',
                value:this.state.event_detail.realName,
            },
    );        

  
    
    
   
    this.state.list.map((event,index)=>{
       
          this.state.listData.push({
              index:`${index+1}`,
              title:`事件处理记录${index+1}`,

          })
    })


    let button_event=null;
    switch(this.state.eventstate){
        case '待受理':button_event=(
            this.state.roleId==8 &&this.state.nowUserId==this.state.userId?( 
                <div style={{ textAlign: 'center',marginBottom:'60px'}}>
                < FormProcess  history={this.props.history} eventId={this.state.eventId} userId={this.state.userId}  token={this.state.token} loadEventList={()=>this.loadEventList()}/>
                < FormNoProcess history={this.props.history} eventId={this.state.eventId} userId={this.state.userId}  token={this.state.token} roadManagerId={this.state.event_detail.userId} />
                <Button type="primary" style={{marginLeft:'20px'}} onClick={()=>history.back(1)}>取消</Button>
                </div>
            ):
            (
                <div style={{ textAlign: 'center',marginBottom:'60px'}}>
                <Button type="primary" style={{marginLeft:'20px'}} onClick={()=>this.props.history.push('/roadprotect')}>关闭</Button>
                </div>
            )
        );
        break;
        case'待处理':button_event=(
            this.state.roleId==8 &&this.state.nowUserId==this.state.userId?(
                <div style={{ textAlign: 'center',marginBottom:'60px'}}>
                    <FormHandle history={this.props.history} eventId={this.state.eventId} userId={this.state.userId}  token={this.state.token} roadManager={this.state.event_detail.realName} roadManagerId={this.state.event_detail.userId} eventType={this.state.event_detail.maintenanceType}/>
                    <FormRequest history={this.props.history}  eventId={this.state.eventId} userId={this.state.userId}  token={this.state.token}  regionId={this.state.regionId}/>
                    <Button type="primary" style={{marginLeft:'20px'}} onClick={()=>this.props.history.push('/roadprotect')}>取消</Button>
                </div>
            ):
            ( 
                <div style={{ textAlign: 'center',marginBottom:'60px'}}>
                    <Button type="primary" style={{marginLeft:'20px'}} onClick={()=>this.props.history.push('/roadprotect')}>关闭</Button>
                </div>
            )
           
        );break;
        case'待协调':button_event=(
            this.state.roleId==11 &&this.state.nowUserId==this.state.userId?(
            <div  style={{ textAlign: 'center',marginBottom:'60px'}}>
                <FormCoordinate history={this.props.history} eventId={this.state.eventId} userId={this.state.userId}  token={this.state.token} nextStepName={this.state.list[0].realName} nextStepId={this.state.list[0].userId}/>
                <Button type="primary" style={{marginLeft:'20px'}} onClick={()=>this.props.history.push('/roadprotect')}>取消</Button>
            </div>
            )
            :
            (
                <div style={{ textAlign: 'center',marginBottom:'60px'}}>
                <Button type="primary" style={{marginLeft:'20px'}} onClick={()=>this.props.history.push('/roadprotect')}>关闭</Button>
                </div>
            )
        );break;
       default: button_event=(
            <div style={{ textAlign: 'center',marginBottom:'60px'}}>
            <Button type="primary" style={{marginLeft:'20px'}} onClick={()=>this.props.history.push('/roadprotect')}>关闭</Button>
            </div>
       );break;
    }

    const fileList =[];
    const props2 = {
        // action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        defaultFileList: [...fileList],
      };


    let imageUrl=[];
    let videoUrl=[];
    if(this.state.event_detail_pic.length!=0){
        for(let i=0,j=0,k=0;i<this.state.event_detail_pic.length;i++)
        {
            if(this.state.event_detail_pic[i].type=="image"){
               var a={
                        smallUrl:this.state.event_detail_pic[i].smallUrl,
                        fileUrl:this.state.event_detail_pic[i].fileUrl,
                        src:`${this.state.event_detail_pic[i].fileUrl}`
                    }
                    imageUrl.push(a);
            } 
            if(this.state.event_detail_pic[i].type=="video"){
                    videoUrl[k]=this.state.event_detail_pic[i].fileUrl;
                    k++;
            }
                
        }
    }

    
    let videoLog='';
    for(var i=0 ; i<this.state.list.length ; i++){
       for(var j=0 ; j<this.state.list[i].maintenanceFileList.length ; j++){
           if( this.state.list[i].maintenanceFileList[j].type=='image'){
               this.state.list[i].maintenanceFileList[j].src= `${this.state.list[i].maintenanceFileList[j].fileUrl}` 
           }
           if( this.state.list[i].maintenanceFileList[j].type=='video'){
               videoLog=this.state.list[i].maintenanceFileList[j].fileUrl;
           }
           
       }
   }//第一个for结束

   console.log()
     
        return (
        <div >
            <List  bordered
            itemLayout="vertical"
            dataSource={ this.state.listData}
            pagination={{pageSize: 2,}}
            renderItem={
                item => (
                 
                <List.Item className="list_detail"  
                key={item.index}
                // extra={
                //     imageUrl[item.index]!=null?
                //      <img width={250} alt="无图片" 
                //     src={`${imageUrl[item.index]}`} />
                //     :
                //     null
                // }
                >
               <List.Item.Meta style={{marginBottom:'0'}} title={item.title}/>
                {
                    item.index=='0'
                    ?  
                    (
                           <div className='list_layout'>
                            <div className='list_layout_left'>
                            <div className='list_layout_icon'>
                                {videoUrl.length!=0?
                                    <div> 
                                        <Button type="primary"shape="circle" icon="video-camera" onClick={()=>this.showDrawer()}/>
                                        <Modal  width={350} 
                                          destroyOnClose={true} mask={false}
                                          onCancel={()=>this.onClose()}
                                          visible={this.state.visible}
                                             style={{top:150,marginLeft:'200px'}}
                                            footer={null}>
                                            <div  style={{marginTop:'10px'}}>
                                             <Player  playsInline  aspectRatio={'1:0.9'} src={`${videoUrl[0]}`}/>
                                            </div>
                                        </Modal>
                                    </div>
                                    :null
                                }
                                </div>
                                <div className='cardfan' >
                                    {
                                        imageUrl.length!=0?
                                        imageUrl.map((image,index)=>{
                                            return (
                                                <div  key={index}  >
                                                    <Zmage   width={250}  height={300} src={`${image.smallUrl}` } 
                                                                set={imageUrl} 
                                                                alt="图片加载出现错误" 
                                                                defaultPage={index}/>
                                                </div>  
                                                )
                                            })
                                        :null
                                    }                                                                    
                                </div> 
                            </div>
                            <table   className="table_eventRecord">
                            <tbody> 
                                    <tr key='0'>
                                    <td className='table_tag'>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span> 事件内容:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.event_detail.maintenanceContent}</td>
                                    </tr>
                                    <tr key='1'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span> 事发时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.event_detail.maintenanceTime}</td>
                                    </tr>
                                    <tr key='2'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span> 处理时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.event_detail.updateTime}</td>
                                    </tr>
                                    <tr key='3'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span> 截至时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.event_detail.limitTime}</td>
                                    </tr>
                                    <tr key='4'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span> 事发道路:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.event_detail.roadName}</td>
                                    </tr>
                                    <tr key='5'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span> 事发桩号:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.event_detail.smileageoffset}</td>
                                    </tr>
                                    <tr key='6'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span> 事发地点:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.event_detail.address}</td>
                                    </tr>
                                    <tr key='7'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span>事件上报人:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.event_detail.realName}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                     
                    ) 
                    :
                     (
                        <div className='list_layout'>
                            <div className='list_layout_left'>
                            <div className='list_layout_icon'>
                                {
                                    videoLog!=''?
                                    <div> 
                                        <Button type="primary"shape="circle" icon="video-camera" onClick={()=>this.showDrawer()}/>
                                        <Modal  width={350} 
                                          destroyOnClose={true} mask={false}
                                          onCancel={()=>this.onClose()}
                                          visible={this.state.visible}
                                             style={{top:150,marginLeft:'200px'}}
                                            footer={null}>
                                            <div  style={{marginTop:'10px'}}>
                                             <Player  playsInline  aspectRatio={'1:0.9'} src={`${videoLog}`} />
                                            </div>
                                        </Modal>
                                    </div>
                                    :null
                                }
                                </div>
                                <div className='cardfan' >    
                                {
                                    this.state.list[item.index-1].maintenanceFileList.map((item,index,array)=>{
                                        if(item.type=='image'){
                                            return (
                                                    <div  key={index}  >
                                                    <Zmage   width={250}  height={300} src={`${item.smallUrl}` } 
                                                                 set={array.slice(0,-1)} 
                                                                 alt="图片加载出现错误" 
                                                                defaultPage={index}/>
                                                    </div>  
                                                )
                                        }
                                    })
                                }
                                </div>
                            </div>
                            <table   className="table_eventRecord">
                            <tbody> 
                                    <tr key='1'>
                                        <td className='table_tag'> 
                                            <span>
                                            <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                            <span> 接收时间:</span>
                                            </span>
                                        </td>
                                        <td>{this.state.list[item.index-1].acceptTime}</td>
                                    </tr>
                                    <tr key='2'>
                                        <td>
                                            <span>
                                            <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                            <span> 处理人：</span>
                                            </span>
                                        </td>
                                        <td>{this.state.list[item.index-1].realName}</td>
                                    </tr>
                                    <tr key='3'>
                                        <td>
                                            <span>
                                            <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                            <span>处理时间：</span>
                                            </span>
                                        </td>
                                        <td>{this.state.list[item.index-1].operaTime}</td>
                                    </tr>
                                    <tr key='4'>
                                        <td>
                                            <span>
                                            <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                            <span>下一步：</span>
                                            </span>
                                        </td>
                                        <td>{this.state.list[item.index-1].nextRealName}</td>
                                    </tr>
                                    <tr key='5' >
                                        <td>
                                            <span>
                                            <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                            <span>处理状态:</span>
                                            </span>
                                        </td>
                                        <td >{this.state.list[item.index-1].logStatusName}</td>
                                    </tr>
                                    <tr key='6' >
                                        <td> 
                                            <span>
                                            <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                            <span>处理内容:</span>
                                            </span>
                                        </td>
                                        <td >{this.state.list[item.index-1].content}</td>
                                    </tr> 
                                </tbody>  
                            </table>
                        </div>
                    ) 
                }
               </List.Item>
                )}  
            />
                {button_event }
                {/* <Upload {...props2} >
                     <Button style={{marginBottom:'50px'}}>
                    <Icon type="upload" /> Upload
                    </Button>
                </Upload> */}
            
        </div>
        )//return
    }
}
export default RoadProtectCheck ;
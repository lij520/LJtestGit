import React            from 'react';
import { List, Table,Button, Upload,Icon,message,Divider,Row,Col } from 'antd';
import Zmage from 'react-zmage';
import { Player } from 'video-react'
import "util/video-react.css";
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();
import img1 from 'page/home/img/4.jpg';
import img2 from 'page/home/img/2.jpg'; 
import img3 from 'page/home/img/3.jpg'; 


class RoadOperationCheck  extends React.Component{
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
            // PageNo                  : this.props.match.params.tid,
            // PageSize                : this.props.match.params.zid,
            // eventType               : this.props.match.params.aid,
            // eventCode               : this.props.match.params.bid,
            // userName                :this.props.match.params.cid,
            // startTime               :this.props.match.params.did,
            // endTime                 :this.props.match.params.eid,
            // type                    :this.props.match.params.fid,
            loading                 :true,
            event_detail            :{},
            event_detail_pic        :[],
            listData                :[ { title: '查看详情', index: 0}],
            eventstate              :'',
            visible                 : false
        }
    }
     
    
    
    componentDidMount(){
        this.loadEventList();
        
        // let searchParameter={
        //     eventType               :this.state.eventType,
        //     eventCode               :this.state.eventCode,
        //     userName                :this.state.userName,
        //     startTime               :this.state.startTime,
        //     endTime                 :this.state.endTime,
        //     PageNo                  :this.state.PageNo,
        //     PageSize                :this.state.PageSize,
        //     type                    :this.state.type,
        // };
      

        // for (var attr in searchParameter){
        //     if (searchParameter[attr]=="XX"){
        //         searchParameter[attr]="";
        //     }
        // }

        // _mm.setStorage('searchParameter',searchParameter);
    }
    
    loadEventList(){

        console.log(this.state.eventId);
        var formData = new FormData();
        formData.append("userId",this.state.userId);
        formData.append("token ",this.state.token);
        formData.append("maintenanceId",100006);
        if(this.state.eventId  ){

            _roadProtect.queryWorkflowLog(formData).then((res) => {
                console.log(res);
                let list=res.userlist;
                    this.setState({
                        listData :[ { title: '查看详情', index: 0}],
                        event_detail:res.maintenanceList[0],   //查看详情部分内容
                        event_detail_pic:res.maintenanceList[0].maintenanceFileList,
                        loading: false,
                        list:res.maintenanceWorkflowLog,
                        eventstate:res.maintenanceList[0].maintenanceTypeName,
                        nowUserId:res.maintenanceWorkflowLog[res.maintenanceWorkflowLog.length-1].userId,//直接取值
                    
                    })
            }, (errMsg) => {
               _mm.errorTips(errMsg);
            });


            // $.ajax({
            //     type        :  'post',
            //     url         :  '/maintenance/queryWorkflowLog', 
            //     data        :  formData,
            //     cache: false,//上传文件无需缓存
            //     processData: false,//用于对data参数进行序列化处理 这里必须false
            //     contentType: false, //必须
            //     success     : res => {
                  
            //         console.log(res);

            //         if(res.result==1){
            //             let list=res.userlist;
            //         // console.log(list);

            //             this.setState({
            //                 listData :[ { title: '查看详情', index: 0}],
            //                 event_detail:res.maintenanceList[0],   //查看详情部分内容
            //                 event_detail_pic:res.maintenanceList[0].maintenanceFileList,
            //                 loading: false,
            //                 list:res.maintenanceWorkflowLog,
            //                 eventstate:res.maintenanceList[0].maintenanceTypeName,
            //                 nowUserId:res.maintenanceWorkflowLog[res.maintenanceWorkflowLog.length-1].userId,//直接取值
                        
            //             })
            //             console.log( this.state.event_detail);
            //         }
            //         else if(res.result==-1){
            //               message.error(res.message);
            //               window.location.href = '/';
            //         }
            //         else{
            //               message.error(res.message);
            //         }
                 
                    
                  
            //     },
            //     error       : err => {
            //         message.error('error!');
                   
            //     }
            // });


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

  


    const fileList =[];
    const props2 = {
        // action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        defaultFileList: [...fileList],
      };


    let imageUrl=[];
    imageUrl=[{src:img1},{src:img2},{src:img3}];
    // let videoUrl=[];
    // if(this.state.event_detail_pic.length!=0){
    //     for(let i=0,j=0,k=0;i<this.state.event_detail_pic.length;i++)
    //     {
    //         if(this.state.event_detail_pic[i].type=="image"){
    //            var a={
    //                     smallUrl:this.state.event_detail_pic[i].smallUrl,
    //                     fileUrl:this.state.event_detail_pic[i].fileUrl,
    //                     src:`${this.state.event_detail_pic[i].fileUrl}`
    //                 }
    //                 imageUrl.push(a);
    //         } 
    //         if(this.state.event_detail_pic[i].type=="video"){
    //                 videoUrl[k]=this.state.event_detail_pic[i].fileUrl;
    //                 k++;
    //         }
                
    //     }
    // }

    
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
            <List style={{marginBottom:'80px'}}  bordered
            itemLayout="vertical"
            dataSource={ this.state.listData}
            renderItem={
                item => (
                 
                <List.Item className="list_detail"  
                key={item.index}
                >
                {   
                    <div>
                            <div className='list_layout_title'>记录详情</div>
                            <a onClick={(e)=>this.onCompanyFile(e)} style={{color:'#1890ff',fontSize:16,marginLeft:20}}>
                            <Icon type="download" />
                                导出
                            </a>
                            <a onClick={(e)=> window.history.back(-1)} style={{color:'#1890ff',fontSize:16,marginLeft:10}}>
                            <Icon type="left-circle" />
                                返回
                            </a>
                           <div style={{paddingTop:24}}>
                          
                                <Row>
                                    <Col xs={24} sm={12} md={8}>
                                    <span>
                                        <span><Icon type="bell"  theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span> 公司名称：</span>
                                        <span>{this.state.event_detail.maintenanceContent}</span>
                                    </span>
                                    </Col>
                                    <Col xs={24} sm={12} md={8}>
                                    <span>
                                        <span><Icon type="bell"  theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span> 检查时间：</span>
                                        <span>{this.state.event_detail.maintenanceTime}</span>
                                    </span>
                                    </Col>
                                    <Col xs={24} sm={12} md={8}>
                                    <span>
                                        <span><Icon type="bell"  theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span> 运管员：</span>
                                        <span>{this.state.event_detail.maintenanceContent}</span>
                                    </span>
                                    </Col>
                                </Row>
                             {/* </p> */}
                            <Divider>检查内容</Divider>
                            <p>福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技</p>
                            <Divider dashed />
                            <Row>
                            <Col xs={24} sm={12} md={8}>
                                    <span>
                                        <span><Icon type="bell"  theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span> 是否需要整改：</span>
                                        <span>是</span>
                                    </span>
                            </Col>
                            </Row>
                            <Divider dashed/>
                            <Row>
                            <Col xs={24} sm={12} md={8}>
                                    <span>
                                        <span><Icon type="bell"  theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span> 整改时间：</span>
                                        <span>{this.state.event_detail.maintenanceTime}</span>
                                    </span>
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                    <span>
                                        <span><Icon type="bell"  theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span> 整改状态：</span>
                                        <span>{this.state.event_detail.maintenanceTime}</span>
                                    </span>
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                                    <span>
                                        <span><Icon type="bell"  theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span> 结束时间：</span>
                                        <span>{this.state.event_detail.maintenanceTime}</span>
                                    </span>
                            </Col>
                            </Row>
                            <Divider>整改内容</Divider>
                            <p>福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技	福建省福州市长乐区东湖一路1号靠近恒申合纤科技</p>
                            </div>
                            <div className='list_layout_title'>相关附件</div>
                            <div style={{paddingTop:24}}>
                            {
                                        imageUrl.length!=0?
                                        imageUrl.map((image,index,array)=>{
                                            return (
                                                <div  key={index} style={{display:'inline-block',marginLeft:'15px',border:"5px solid rgb(212, 212, 212)"}} >
                                                    <Zmage   width={200}  height={150} src={`${image.src}` } 
                                                                set={array} 
                                                                alt="图片加载出现错误" 
                                                                defaultPage={index}/>
                                                </div>  
                                                )
                                            })
                                        :null
                             }              
                            </div>
                            <Row style={{marginTop:10}}> 
                            <a onClick={(e)=>this.onCompanyFile(e)} style={{color:'#1890ff',fontSize:16}}>
                                <Icon type="file-text" />
                                公司资料
                            </a>
                            </Row>
                    </div>
                }
               </List.Item>
                )}  
            /> 
        </div>
        )
    }
}
export default RoadOperationCheck ;
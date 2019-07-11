import React from 'react';
import {Link} from 'react-router-dom';
import { List, Table,Button, Upload,Icon,message} from 'antd';
import $ from 'jquery';
import './index.less';
import './index.scss';
import MUtil from '../../util/mm.jsx';
const _mm= new MUtil();

class TeamCheck  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            list_pic:[],
            loading: false,
            managerId: _mm.getStorage('userInfo').managerId,
            userId:_mm.getStorage('userInfo').userId,
            token:_mm.getStorage('userInfo').token,
            roadId: this.props.match.params.pid,//?tid
            managerId:this.props.match.params.tid,
            detail:{},
            detail_pic:'',
            miles:'',   
            modify:'',
            planDay:'',
            usedDay:'',
            delayDay:'',
            delayReason:'',
            startTime: '',
            limitTime:'',
            listData:[ { title: '查看详情', index: 0}],    
            imageUrl:[],  
         
        }
    }

    //通过路段ID请求查看数据
    componentDidMount(){
        this.loadEventList();
    }
    
    loadEventList(){
        this.setState({loading:true});
        console.log(this.state.roadId);
        console.log(this.state.managerId);
        // console.log(this.state.userId);
        // console.log(this.state.token);
        
            $.ajax({
                type        :  'post',
                url         :  '/team/getDetailReportMessage', 
                data        :  {roadId:this.state.roadId,managerId:this.state.managerId,token:this.state.token,user_id:this.state.userId},
                success     : res => {
                  
                    console.log(res);

                    if(res.result==-1){
                        message.error(res.message);
                        window.location.href = '/';
                      }
                      if(res.result==1){
                        message.success(res.message);

                        
                        this.setState({
                          list:res.mapList
                        })

                        this.setState({
                            listData :[ { title: '查看详情', index: 0}],
                            detail:res.mapList.detailMessage,
                            detail_pic:res.mapList.detailMessage.roadImage,//?
                            roadName:res.mapList.roadName,
                            startTime:res.mapList.startTime,
                            limitTime:res.mapList.limitTime,
                            
                         })
     
                         console.log( this.state.detail);  
                        //  console.log( this.state.detail_pic);
                      }
    
                    
                     
                },
                error       : err => {
                    message.error('error!');                 
                }
            });
           
    }

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
                tag: '路段名称:',
                value:this.state.roadName,
            },
            {
                key: '1',
                tag: '路段长度:',
                value:this.state.detail.miles,
            },
            {
                key: '2',
                tag: '计划开始时间:',
                value:this.state.startTime,
            },
            {
                key: '3',
                tag: '计划结束时间:',
                 value:this.state.limitTime,
            },
            {
                key: '4',
                tag: '计划修建时间:',
                value:this.state.detail.planDay,
            },
            {
                key: '5',
                tag: '已使用时间:',
                 value:this.state.detail.usedDay,
            },
            {
                key: '6',
                tag: '延后时间:',
                 value:this.state.detail.delayDay,
            },
            {
                key: '7',
                tag: '延后原因:',
                value:this.state.detail.delayReason,
            },
            {
                key: '8',
                tag: '修改意见:',
                value:this.state.detail.modify,
            },

    );        

    const fileList =[];
    const props2 = {
        //action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        defaultFileList: [...fileList],
      };



    // let imageUrl=[];
    // if(this.state.detail_pic!=null){
    //     imageUrl[0]==this.state.detail_pic;   
    // }
    // else{
    //     imageUrl[0]==null;
    // }
    
    // console.log( this.state.detail_pic)
    // console.log(imageUrl[0]);
   

         
        return (
        <div >
            <List style={{marginBottom:'20px'}}
            bordered
            itemLayout="vertical"
            dataSource={ this.state.listData}
            renderItem={
                item => (               
                 <List.Item className="list_detail"  
                key={item.index}
                // extra={
                //      <img width={272} alt="无图片" 
                //     src={`http://192.168.2.137:13077${this.state.detail_pic}`} 
                //     />
                // }
                > 
               <List.Item.Meta style={{marginBottom:'0'}} title={item.title}/>
                    <div className='list_layout'>
                        <div className='list_layout_left'>
                            { 
                                // imageUrl[item.index]!=null?
                                this.state.detail_pic!=null?
                                <img width={250} alt="图片加载出现错误" 
                                src={`${this.state.detail_pic}`} />
                                :
                                null
                            }

                        </div>
                        {/* <Table  columns={columns} dataSource={data} pagination={false} showHeader={false} className="table_list"/> */}
                        <table   className="table_eventRecord">
                                <tbody> 
                                    <tr key='0'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span> 路段名称:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.roadName}</td>
                                    </tr>
                                    <tr key='1'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span> 路段长度:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.detail.miles}</td>
                                    </tr>
                                    <tr key='2'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span> 计划开始时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.startTime}</td>
                                    </tr>
                                    <tr key='3'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span>计划结束时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.limitTime}</td>
                                    </tr>
                                    <tr key='4'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span>计划修建时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.detail.planDay}</td>
                                    </tr>
                                    <tr key='5'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span>已使用时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.detail.usedDay}</td>
                                    </tr> <tr key='6'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span>延后时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.detail.delayDay}</td>
                                    </tr> <tr key='7'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span>延后原因:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.detail.delayReason}</td>
                                    </tr> <tr key='8'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'rgb(255,77,4)',marginRight:'30px'}}/></span>
                                        <span>修改意见:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.detail.modify}</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
               </List.Item>
                )}            
            />
            <div className='teamCheckButton' style={{textAlign: 'center',marginBottom: '60px'}}>
                <Link to="/roadbuild/list"><Button  /* style={{float:'right',marginTop:'5px',marginLeft:'10px'}} */>{/* <Icon type="double-left" theme="outlined" /> */}关闭</Button></Link>
            </div>
            
        </div>
        
        )
    }
}export default TeamCheck ;
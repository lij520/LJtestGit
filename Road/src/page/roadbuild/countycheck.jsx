import React from 'react';
import {Link} from 'react-router-dom';
import { List, Table,Button, Upload,Icon, message} from 'antd';
import $ from 'jquery';
// import './index.less';
import MUtil from '../../util/mm.jsx';
const _mm= new MUtil();

class CountyCheck  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            //list_pic:[],
            loading: false,
            userId:_mm.getStorage('userInfo').userId,
            token:_mm.getStorage('userInfo').token,
            roadId: this.props.match.params.sid,
            detail_pic:[],
            miles:'',
            roadName:'',
            roadname:'',
            startTime:'',
            limitTime:'',
            planDay:'',
            usedDay:'',
            delayDay:'',
            delayReason:'',
            teamAdvice:'',
            modify:'',
            detail_pic:'',
            listData:[ { title: '查看详情', index: 0}],      
         
        }
    }

    //通过路段ID请求查看数据
    componentDidMount(){
        this.loadEventList();
    }

    loadEventList(){
        this.setState({loading:true});
        console.log(this.state.roadId);
        this.setState({
            roadName:this.state.roadname
        }
        
       )
       console.log(this.state.token,this.state.userId)

            $.ajax({
                type        :  'get',
                url       :  '/manager/getManagerReport',
                data        :  {road_id:this.state.roadId,
                    token:this.state.token,
                    user_id:this.state.userId,
                },
                success     : res => {
                  
                    console.log(res);
                    if(res.result==-1){
                        message.error(res.message);
                        window.location.href = '/';
                      }
                      if(res.result==1){
                              this.setState({
                            listData :[ { title: '查看详情', index: 0}],
                               miles:res.mapList[0].miles,
                               //roadName:res.roadName,
                               startTime:res.mapList[0].startTime,
                               limitTime:res.mapList[0].limitTime,
                               planDay:res.mapList[0].planDay,
                               usedDay:res.mapList[0].usedDay,
                               delayDay:res.mapList[0].delayDay,
                               delayReason:res.mapList[0].delayReason,
                               teamAdvice:res.mapList[0].teamAdvice,
                               modify:res.mapList[0].modify,
                               //detail_pic:res[0].roadImage,
                               detail_pic:res.mapList[0].roadImage,
                            })
                      }
                },
                error       : err => {
                    message.error('查看失败!');         
                    this.setState({
                     miles:'',
                    roadName:'',
                    roadname:'',
                    startTime:'',
                    limitTime:'',
                    planDay:'',
                    usedDay:'',
                    delayDay:'',
                    delayReason:'',
                    teamAdvice:'',
                    modify:'',
                    })
                       
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
                //value:this.state.roadName,
                
                value:""
            },
            {
                key: '1',
                tag: '路段长度:',
                value:this.state.miles,
               
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
                value:this.state.planDay,
                
            },
            {
                key: '5',
                tag: '已使用时间:',
                value:this.state.usedDay,
                
            },
            {
                key: '6',
                tag: '延后时间:',
                value:this.state.delayDay,
            
            },
            {
                key: '7',
                tag: '延后原因:',
                value:this.state.delayReason,
                
            },
            {
                key: '8',
                tag: '大队修改意见:',
                value:this.state.teamAdvice,
               
            },
            {
                key: '9',
                tag: '路管员修改意见:',
                value:this.state.modify,
               
            }

    );        

    const fileList =[];
    const props2 = {
        //action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        defaultFileList: [...fileList],
      };



    // var imageUrl=[];
    // if(this.state.detail_pic.length!=0){
    //     for(let i=0;i<this.state.detail_pic.length;i++)
    //     {
    //      imageUrl[0]=this.state.detail_pic[0].smallUrl;   
    //     }
    // }
    // else{
    //     imageUrl[0]=null;
    // }
    // console.log(this.state.list_pic[0])

    var imageUrl=[];
    if(this.state.detail_pic!=null){
       
        imageUrl[0]=this.state.detail_pic;   
       
    }
    else{
        imageUrl[0]=null;
    }
    // console.log(this.state.imageUrl)

         
        return (
        <div >
            <List style={{marginBottom:'20px'}}
            bordered
            itemLayout="vertical"
            dataSource={ this.state.listData}
            renderItem={
                item => (               
                 <List.Item className="list_detail"  
                key='0'
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
                                imageUrl[item.index]!=null?
                                <img width={250} alt="图片加载出现错误" 
                                src={`${this.state.detail_pic}`} />
                                :
                                null
                            }

                        </div>
                        {/* <Table  columns={columns} dataSource={data} pagination={false} showHeader={false} className="table_list"/> */}
                        <table   className="table_eventRecord">
                                <tbody> 
                                    {/* <tr key='0'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span> 路段名称:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.roadName}</td>
                                    </tr> */}
                                    <tr key='1'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span> 路段长度:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.miles}</td>
                                    </tr>
                                    <tr key='2'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span> 计划开始时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.startTime}</td>
                                    </tr>
                                    <tr key='3'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span>计划结束时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.limitTime}</td>
                                    </tr>
                                    <tr key='4'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span>计划修建时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.planDay}</td>
                                    </tr>
                                    <tr key='5'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span>已使用时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.usedDay}</td>
                                    </tr> <tr key='6'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span>延后时间:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.delayDay}</td>
                                    </tr> <tr key='7'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span>延后原因:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.delayReason}</td>
                                    </tr> 
                                    <tr key='8'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span>大队修改意见:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.teamAdvice}</td>
                                    </tr>
                                    <tr key='9'>
                                    <td>
                                        <span>
                                        <span><Icon type="pushpin" theme="outlined" style={{fontSize:'20px',color:'#4d77b5',marginRight:'30px'}}/></span>
                                        <span>路管员修改意见:</span>
                                        </span>
                                    </td>
                                    <td>{this.state.modify}</td>
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
}
export default CountyCheck ;
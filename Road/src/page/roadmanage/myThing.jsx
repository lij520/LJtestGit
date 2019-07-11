import React from 'react';
import TableList from './table.js';
import {  Collapse,Row, Col,Select,Input,DatePicker,Button,message,Alert} from 'antd';
import moment from 'moment';
import $ from 'jquery';
import MUtil        from 'util/mm.jsx';
const _mm   = new MUtil();
import './index.scss';

const Panel = Collapse.Panel;
const {RangePicker } = DatePicker;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
var PageNoManage=1;
var PageSizeManage=6;

var eventTypeManage='';
var eventCodeManage='';
var userNameManage='';
var startTimeManage='';
var endTimeManage='';
var timeManage='';
var problemTypeManage='';

class MyThing extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            list            : [],
            loading         : true,
            userId          : _mm.getStorage('userInfo').userId,
            token           : _mm.getStorage('userInfo').token,
            regionId        : _mm.getStorage('userInfo').regionId,
            type            :this.props.type,
            eventType       :'',
            eventCode       :'',
            time            :'',
            userName        :'',
            problemType     :_mm.getStorage('problemType').problemTypeName,
            problemTypeCode :_mm.getStorage('problemType').problemTypeCode,
            roleId          :_mm.getStorage('userInfo').roleId,
            exportTime      :[],
            eventQuantity   :0,
            problemRoadQuantity:0,
        };
    }
  
    componentDidMount(){
        if (_mm.getStorage('searchParameter')) { //是从check过来的，希望保存原来的所有数据
            PageNoManage=parseInt( _mm.getStorage('searchParameter').PageNoManage);
            PageSizeManage=parseInt( _mm.getStorage('searchParameter').PageSizeManage);


            eventTypeManage=_mm.getStorage('searchParameter').eventType;
            eventCodeManage=_mm.getStorage('searchParameter').eventCode;
            userNameManage=_mm.getStorage('searchParameter').userName;
            startTimeManage=_mm.getStorage('searchParameter').startTime;
            endTimeManage=_mm.getStorage('searchParameter').endTime;
            problemTypeManage=_mm.getStorage('searchParameter').problemType;

            if(_mm.getStorage('searchParameter').startTime!=''){
                this.setState({
                    time:[moment(_mm.getStorage('searchParameter').startTime, dateFormat), moment(_mm.getStorage('searchParameter').endTime, dateFormat)],
                })
            }

            this.setState({
                eventType               :eventTypeManage,
                eventCode               :eventCodeManage,
                userName                :userNameManage,
                problemType             :problemTypeManage,
            })

            let formData = new FormData();
            formData.append("userId",this.state.userId);
            formData.append("token ",this.state.token);
            formData.append("regionId  ",this.state.regionId);
            formData.append("eventType",eventTypeManage);
            formData.append("eventCode",eventCodeManage);
            formData.append("userName",userNameManage);
            formData.append("type",this.state.type);
            // formData.append("problemType",problemTypeManage);

            formData.append("startTime",startTimeManage);
            formData.append("endTime",endTimeManage);

            
            formData.append("pageNo",PageNoManage);
            formData.append("pageSize",PageSizeManage);
    
            $.ajax({
                type        :  'post',
                url         :  '/eventmanage/queryEvent',
                data:  formData,
              //   dataType: "formData",
                cache: false,//上传文件无需缓存
                processData: false,//用于对data参数进行序列化处理 这里必须false
                contentType: false, //必须
                success     : res => {
                
                    console.log(res);
    
                    if(res.result==1){
                        this.setState({
                            list:res.eventList,
                            countEvent:res.countEvent,
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
              _mm.removeStorage('searchParameter');
        }else{ 
            PageNoManage=1; //第一次加载次模块
            PageSizeManage=6;
            if(_mm.getStorage('problemType')){
                problemTypeManage=_mm.getStorage('problemType').problemTypeCode;
                startTimeManage=`${new Date().getFullYear()}-${new Date().getMonth()+1}-01`;
                endTimeManage=`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`;

                this.setState({
                       time  :[moment(`${new Date().getFullYear()}-${new Date().getMonth()+1}-01`, dateFormat), moment(`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`, dateFormat)],
                       problemType:_mm.getStorage('problemType').problemTypeName,
                },function(){
                    this.onSearchEvent();//默认显示这个月的，时间控件会有问题
                })
            }else{
                this.onSearchEvent();//默认显示这个月的，时间控件会有问题
            }
            
            _mm.removeStorage('problemType')
        }


        $.ajax({
            type        :  'post',
            url         :  '/eventReport/managerEventInfo',
            data        :   {
                                userId:this.state.userId,
                                token:this.state.token,
                                beginTime:'2018-11-10',
                                endTime:`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`
                            },
            success     : res => {
            
                console.log(res);

                if(res.result==1){
                    this.setState({
                        eventQuantity:res.managerEventInfo.eventQuantity,
                        problemRoadQuantity:res.managerEventInfo.problemRoadQuantity,
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
            }
          });
    }
    

    onEventTypeChange(e){
        console.log(e);
        this.setState({
            eventType  : e,
          });  
        eventTypeManage=e;
    }
    
    onInputChange(e){
        let inputValue  = e.target.value,
        inputName       = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
        if(e.target.name=='eventCode'){
            eventCodeManage=e.target.value;
        }
        if(e.target.name=='userName'){
            userNameManage=e.target.value;
        }
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
            time:[moment(this.dateToString(values[0]._d), dateFormat), moment(this.dateToString(values[1]._d), dateFormat)],
        });  

        timeManage=[moment(this.dateToString(values[0]._d), dateFormat), moment(this.dateToString(values[1]._d), dateFormat)];
        startTimeManage=this.dateToString(values[0]._d);
        endTimeManage=this.dateToString(values[1]._d);
    }

    onProblemTypeChange(e){
        this.setState({
            problemType  : e,
          });  
        problemTypeManage=e;
    }

    onSearch(){

        PageNoManage=1;
        PageSizeManage=6;
        this.onSearchEvent();
    }

    onSearchEvent(){

        var formData = new FormData();
        formData.append("userId",this.state.userId);
        formData.append("token ",this.state.token);
        formData.append("regionId  ",this.state.regionId);
        formData.append("type",this.state.type);
        formData.append("eventType",this.state.eventType);
        formData.append("eventCode",this.state.eventCode);
        // formData.append("problemType",this.state.problemTypeCode||this.state.problemType);

        if(this.state.time!=''){
            console.log('this.state.time',this.state.time)
            formData.append("startTime",this.state.time[0]._i);
            formData.append("endTime",this.state.time[1]._i);
        }else {
            formData.append("startTime",this.state.startTime);
            formData.append("endTime",this.state.endTime);
        }

        formData.append("userName",this.state.userName);
        formData.append("pageNo",PageNoManage);
        formData.append("pageSize",PageSizeManage);

        $.ajax({
            type        :  'post',
            url         :  '/eventmanage/queryEvent',
            data:  formData,
          //   dataType: "formData",
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            success     : res => {
            
                console.log(res);

                if(res.result==1){
                    this.setState({
                        list:res.eventList,
                        countEvent:res.countEvent,
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
        eventTypeManage='';
        eventCodeManage='';
        userNameManage='';
        startTimeManage='';
        endTimeManage='';
        timeManage='';
        problemTypeManage='';
        window.location.href = '#/roadmanage';
    }

    SizeChange(e, pageSize){
        PageNoManage=e;
        PageSizeManage=pageSize;
        this.onSearchEvent();
    }

    PageNumberChange(e){
        PageNoManage=e;
        this.onSearchEvent();
    }

    onExportTimeChange(values){
        if(values.length != 0){
            this.setState({
                exportTime:[moment(this.dateToString(values[0]._d), dateFormat), moment(this.dateToString(values[1]._d), dateFormat)],
            });  
        }else{
            this.setState({
                exportTime:[],
            });  
        }
       
    }

    onExport(e){
        if(this.state.exportTime.length != 0){
            window.location.href="/eventmanage/eventExcel?userId="+this.state.userId+"&token="+this.state.token+"&regionId="+this.state.regionId+"&type="+this.state.type+"&startTime="+this.state.exportTime[0]._i+"&endTime="+this.state.exportTime[1]._i;
        }else{
           message.error('请输入导出的起止时间！');
        }
     
    }

    
    
    render(){
        
      return (
        <div>
             <Collapse  accordion bordered={false} >
                <Panel header="高级查询" key="1" style={{backgroundColor:'#efefef'}} >
                <Row style={{marginTop:'5px'}}>
                    <Col span={8}>
                    <label style={{ marginLeft:'15px' }}>事件状态</label>

                        { this.state.type=='0'?
                            <Select placeholder="请选择事件状态" style={{ width: 160, marginLeft:'5px' }} value={this.state.eventType}  onChange={(e)=>this.onEventTypeChange(e)}>
                                <Option value="0">待受理</Option>
                                <Option value="1">待处理</Option>
                                <Option value="2">待重报</Option>
                                <Option value="3">待审核</Option>
                                <Option value="4">已完成</Option>
                                <Option value="5">待处理</Option>
                                <Option value="7">待协调</Option>
                            </Select> 
                        : this.state.type=='3'?
                            (this.state.roleId==9?
                                <Select placeholder="请选择事件状态" style={{ width: 160, marginLeft:'5px' }} value={this.state.eventType}  onChange={(e)=>this.onEventTypeChange(e)}>
                                    <Option value="7">待协调</Option>
                                </Select> 
                            :
                            <Select placeholder="请选择事件状态" style={{ width: 160, marginLeft:'5px' }} value={this.state.eventType}  onChange={(e)=>this.onEventTypeChange(e)}>
                                <Option value="0">待受理</Option>
                                <Option value="1">待处理</Option>
                                <Option value="5">待处理</Option>
                            </Select> 
                            )
                        :this.state.type=='2'?
                            (this.state.roleId==9?
                                <Select placeholder="请选择事件状态" style={{ width: 160, marginLeft:'5px' }} value={this.state.eventType}  onChange={(e)=>this.onEventTypeChange(e)}>
                                    <Option value="1">待处理</Option>
                                    <Option value="3">待审核</Option>
                                    <Option value="5">待处理</Option>
                                </Select> 
                            :
                            <Select placeholder="请选择事件状态" style={{ width: 160, marginLeft:'5px' }} value={this.state.eventType}  onChange={(e)=>this.onEventTypeChange(e)}>
                                <Option value="2">待重报</Option>
                                <Option value="3">待审核</Option>
                                <Option value="7">待协调</Option>
                            </Select> 
                            )
                        :
                            <Select placeholder="请选择事件状态" style={{ width: 160, marginLeft:'5px' }} value={this.state.eventType}  onChange={(e)=>this.onEventTypeChange(e)}>
                                 <Option value="4">已完成</Option>
                            </Select> 
                        }

                    </Col>
                    <Col span={8}>
                    <label style={{ marginLeft:'15px' }}>事件编码</label>
                        <Input placeholder="请输入事件编码" style={{ width:'160px', marginLeft:'5px' }} value={this.state.eventCode}  name="eventCode" onChange={(e)=>this.onInputChange(e)} />
                    </Col>
                    <Col span={8}>
                    <label style={{ marginLeft:'15px' }}>巡查人员</label>
                        <Input placeholder="请输入巡查人员" style={{ width:'160px', marginLeft:'5px' }} value={this.state.userName}  name="userName" onChange={(e)=>this.onInputChange(e)} />
                    </Col>
                </Row>
                <Row>
                    {/* <Col span={8} style={{ marginTop:'15px' }}>
                    <label style={{ marginLeft:'15px' }}>问题类型</label>
                        <Select placeholder="请选择问题类型" style={{ width: 160, marginLeft:'5px' }} value={this.state.problemType}  onChange={(e)=>this.onProblemTypeChange(e)}>
                            <Option value="1000">路政</Option>
                        </Select>
                    </Col> */}
                    <Col span={16} style={{ marginTop:'15px' }}>
                    <label style={{ marginLeft:'15px' }}>起止时间</label>
                    <RangePicker style={{ marginLeft:'5px' }} onChange={(e)=>this.onTimeChange(e)} 
                    // value={[moment(this.state.startTime, dateFormat), moment(this.state.endTime, dateFormat)]} 
                    value={this.state.time}
                    format={dateFormat}/>
                      {/* value={[this.dateToString( this.state.startTime._d), this.dateToString(this.state.endTime._d)]} />  */}
                    </Col>
                </Row>
                <div style={{float:'right',marginBottom:'20px'}}>
                    <Button type="primary" style={{ marginLeft:'15px' }} onClick={()=>this.onSearch()}>查询</Button>
                    <Button type="primary" style={{ marginLeft:'10px' }} onClick={()=> this.resetting()}>重置</Button>
                </div>

                </Panel>
            </Collapse>
            {/* 寿宁注释部分 */}
            {/* {this.state.type==0?
                <Row>
                <Col span={5}   style={{marginTop:'8px' }}>
                        <Alert  className='manage_alert_icon'
                            message={ 
                            <div>
                            <span  className='statistic_title'>问题个数：</span>
                            <span className='statistic'>{parseInt(this.state.eventQuantity).toLocaleString()}</span>
                            </div>
                            }
                            type="warning"
                            showIcon
                        />
                       
                        </Col>
                        <Col span={5} offset={1} style={{marginTop:'8px' }}>
                        <Alert className='manage_alert_icon'
                            message={
                                <div>
                                <span  className='statistic_title'>问题道路：</span>
                                <span className='statistic'>{parseInt(this.state.problemRoadQuantity).toLocaleString()}</span>
                                </div>
                            }
                            type="warning"
                            showIcon
                        />
                        </Col>
                        <Col span={11} offset={2} style={{marginTop:'20px' }}>
                        <label style={{ marginLeft:'15px'}}>起止时间</label>
                        <RangePicker style={{ marginLeft:'5px'}} onChange={(e)=>this.onExportTimeChange(e)} 
                        placeholder={['开始日期', '结束日期']}
                        format={dateFormat}/>
                        <Button type="primary" shape="circle" icon="download" style={{ marginLeft:'5px'}} onClick={(e)=>this.onExport(e)}/>
                        </Col>
                </Row>
                :
                <Row>
                     <Col span={14} offset={12} style={{marginTop:'8px' }}>
                     <label style={{ marginLeft:'15px'}}>起止时间</label>
                    <RangePicker style={{ marginLeft:'5px'}} onChange={(e)=>this.onExportTimeChange(e)} 
                    placeholder={['开始日期', '结束日期']}
                    format={dateFormat}/>
                    <Button type="primary" shape="circle" icon="download" style={{ marginLeft:'5px'}} onClick={(e)=>this.onExport(e)}/>
                    </Col>   
                </Row>
            } */}
            <Row>
                    <Col span={14} offset={12} style={{marginTop:'8px' }}>
                    <label style={{ marginLeft:'15px'}}>起止时间</label>
                    <RangePicker style={{ marginLeft:'5px'}} onChange={(e)=>this.onExportTimeChange(e)} 
                    placeholder={['开始日期', '结束日期']}
                    format={dateFormat}/>
                    <Button type="primary" shape="circle" icon="download" style={{ marginLeft:'5px'}} onClick={(e)=>this.onExport(e)}/>
                    </Col>
            </Row>
            <TableList loading={this.state.loading} list={this.state.list}  history={this.props.history}
             SizeChange={(e, pageSize)=>this.SizeChange(e, pageSize)} PageNumberChange={(e)=>this.PageNumberChange(e)} countEvent={this.state.countEvent}
             PageNoManage={PageNoManage} PageSizeManage={PageSizeManage}
             eventType={eventTypeManage} eventCode={eventCodeManage} userName={userNameManage} startTime={startTimeManage} endTime={endTimeManage} type={this.state.type} problemType={problemTypeManage}
             />
        </div>
      );


    }
  }
  
  
  export default  MyThing;
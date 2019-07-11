import React from 'react';
import { Col, Row,DatePicker,Button,Icon} from 'antd';
import { Link }     from 'react-router-dom';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import patrolNumImage from './img/巡查次数.png';
import patrolMileageImage from './img/巡查里程.png';
import showImage from './img/活跃度.png';
import thingImage from './img/事件上报.png';
import PatrolNum from './roadprotectchart/patrolNum.jsx';
// import PatrolMileage from './roadprotectchart/patrolMileage.jsx';
import PatrolMileage from './roadprotectchart/patrolMileagee.jsx';
import Show from './roadprotectchart/show.jsx';
import Thing from './roadprotectchart/thing.jsx';

import $ from 'jquery';
import { message} from 'antd';
import MUtil        from 'util/mm.jsx';
const _mm           = new MUtil();

const dateFormat = 'YYYY-MM-DD';
moment.locale('zh-cn');

class RoadProtectChart extends React.Component{

    constructor() {
        super();
        this.state={
          userId          : _mm.getStorage('userInfo').userId,
          token           : _mm.getStorage('userInfo').token,
          roleId          : _mm.getStorage('userInfo').roleId,
          regionId        : _mm.getStorage('userInfo').regionId,
          beginTime       :`${new Date().getFullYear()}-${new Date().getMonth()+1}-01`,
          endTime         :`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`,
          patrolData      :[],
          hourData        :[],
          patrolCountData :[],
          showData        :[],
          patrolDataTop1  :{realName:'',mileage:''},
          hourDataTop1    :{realName:'',hour:''},
          patrolCountTop1 :{realName:'',patrolCount:''},
        }
    }

      //按对象数组的属性值进行降序
      sortBy(arr,attr) {
        
        var obj = arr.sort(function(a, b){
            return -(a[attr] - b[attr])
        });
        return obj;
      
    }
    
    componentDidMount() {
        this.onSearch();
    }

    onSearch(){

        var queryUrl = '';
        switch(_mm.getStorage('userInfo').roleId){
            case 8: queryUrl = '/patrolStatisticApp/roadChiefPatrol';break;
            case 9: queryUrl = '/patrolStatisticApp/townPatrol';break;
            default: queryUrl = '';break;
        }
    
        $.ajax({
          type        :  'post',
          url         :  queryUrl,
          dataType    :  'json',
          data        : {
                          userId:this.state.userId,
                          token:this.state.token,
                          beginTime:this.state.beginTime,
                          endTime:this.state.endTime,
                        },
          success     : res => {
    
            console.log('patrol:',res);
    
            if(res.result==1){

                var hour=res.patrol.concat([]);//深拷贝
                hour=this.sortBy(hour,'hour').slice(0,5);
                var patrolCount=res.patrol.concat([]);
                patrolCount=this.sortBy(patrolCount,'patrolCount').slice(0,5);

                let patrolDataTop1={realName:res.patrol[0].realName,mileage:res.patrol[0].mileage};
                let hourDataTop1={realName:hour[0].realName,hour:hour[0].hour};
                let patrolCountTop1={realName:patrolCount[0].realName,patrolCount:patrolCount[0].patrolCount};
                this.setState({
                    patrolData:res.patrol.slice(0,5),
                    hourData:hour,
                    patrolCountData:patrolCount,
                    patrolDataTop1:patrolDataTop1,
                    hourDataTop1:hourDataTop1,
                    patrolCountTop1:patrolCountTop1,
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
            message.error("失败!");
          }
        })

        var relativeUrl = '';
        if(this.state.roleId == 10){  //市级用户活跃度
            relativeUrl = "/munstatistics";
        }
        else if(this.state.roleId == 8){  //镇或大队显示人名
            relativeUrl = "/townstatisticsLogin";
        }
        else{   //县级及以下用户活跃度
            relativeUrl = "/statistics";
        }

        $.ajax({
            type        :  'post',
            url         :  relativeUrl,
            dataType    :  'json',
            data        : {
                            regionId:this.state.regionId,
                            startTime:this.state.beginTime,
                            lastTime:this.state.endTime,
                          },
            success     : res => {
              if(res.result==1){
                if(this.state.roleId == 8){
                    let data=[];
                    res.topTen.map(item=>{
                        data.push({
                            count:item.count,
                            region_name:item.real_name
                        })
                    })
                    this.setState({
                        showData:data.slice(0,5)
                    })
                }else{
                    this.setState({
                        showData:res.topTen.slice(0,5)
                    })
                }
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
              message.error("失败!");
            }
        })
    }

    dateToString(date) {   
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    
        m = m < 10 ? '0' + m : m;    
        var d = date.getDate();    
        d = d < 10 ? ('0' + d) : d;    
        return y + '-' + m + '-' + d;
    };

   

    onBeginTime(e){
        this.setState({
            beginTime:this.dateToString(e._d)
        })
    }

    onEndTime(e){
        this.setState({
            endTime:this.dateToString(e._d)
        })
      
    }

    onReset(){
        this.setState({
            beginTime       :`${new Date().getFullYear()}-${new Date().getMonth()+1}-01`,
            endTime         :`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`,
        })
        this.onSearch();
    }

    render(){
        console.log('111',this.state.showData);
        return(
            <div style={{marginRight:5}}>
            <Row >
                <div >
                    <Row gutter={64} className='protectchart_title_row'>
                        <Col span={6}>
                        <div className="protectchart_title_box">
                        <Row>
                            <Col span={6} className='protectchart_title_left'><div className='protectchart_title_left_text'>巡路次数</div></Col>
                            <Col span={18} >
                                    <div className='protectchart_title_right_top'><div className='protectchart_title_right_text'><span style={{marginRight:10}}>TOP</span><span>1</span></div></div>
                                    <div className='protectchart_title_right_total'>
                                    <Row>
                                        <Col span={9} offset={1}>{this.state.patrolCountTop1.realName}</Col>
                                        <Col span={9} offset={1} style={{color:'red'}}>{this.state.patrolCountTop1.patrolCount}次</Col>
                                    </Row>
                                    </div>
                            </Col>
                        </Row>
                        </div>
                        </Col>
                        <Col span={6} >
                        <div className="protectchart_title_box">
                        <Row>
                            <Col span={6} className='protectchart_title_left'><div className='protectchart_title_left_text'>巡路里长</div></Col>
                            <Col span={18} >
                                    <div className='protectchart_title_right_top'><div className='protectchart_title_right_text'><span style={{marginRight:10}}>TOP</span><span>1</span></div></div>
                                    <div className='protectchart_title_right_total'>
                                    <Row>
                                        <Col span={9} offset={1}>{this.state.patrolDataTop1.realName}</Col>
                                        <Col span={13} offset={1} style={{color:'red'}}>{this.state.patrolDataTop1.mileage}公里</Col>
                                    </Row>
                                    </div>
                            </Col>
                        </Row>
                        </div>
                        </Col>
                        <Col span={6} >
                        <div className="protectchart_title_box">
                        <Row>
                            <Col span={6} className='protectchart_title_left'><div className='protectchart_title_left_text'>巡路时长</div></Col>
                            <Col span={18} >
                                    <div className='protectchart_title_right_top'><div className='protectchart_title_right_text'><span style={{marginRight:10}}>TOP</span><span>1</span></div></div>
                                    <div className='protectchart_title_right_total'>
                                    <Row>
                                        <Col span={9} offset={1}>{this.state.hourDataTop1.realName}</Col>
                                        <Col span={13} offset={1} style={{color:'red'}}>{this.state.hourDataTop1.hour}小时</Col>
                                    </Row>
                                    </div>
                            </Col>
                        </Row>
                        </div>
                        </Col>
                        <Col span={6} >
                        <div className="protectchart_title_box">
                        <Row>
                            <Col span={6} className='protectchart_title_left'><div className='protectchart_title_left_text'>事件上报</div></Col>
                            <Col span={18} >
                                    <div className='protectchart_title_right_top'><div className='protectchart_title_right_text'><span style={{marginRight:10}}>TOP</span><span>1</span></div></div>
                                    <div className='protectchart_title_right_total'>
                                    <Row>
                                        <Col span={9} offset={3}>步云乡</Col>
                                        <Col span={9} offset={3} style={{color:'red'}}>350件</Col>
                                    </Row>
                                    </div>
                            </Col>
                        </Row>
                        </div>
                        </Col>
                    </Row>
                </div>
            </Row>
            <Row  className='rotectchart_date_box'>
                <LocaleProvider locale={zh_CN}>
                <div style={{margin:'auto 15px'}}>
                    <span>日期选择：</span>
                    <span className='rotectchart_date'><DatePicker onChange={(e)=>this.onBeginTime(e)} value={moment(this.state.beginTime, dateFormat)}/></span>
                    <span>至：</span>
                    <span className='rotectchart_date'><DatePicker onChange={(e)=>this.onEndTime(e)} value={moment(this.state.endTime, dateFormat)}/></span>
                    <span> <Button  style={{background:'rgb(254,126,53)',color:'white',marginRight:10}} onClick={()=>this.onSearch()}>查询</Button></span>
                    {/* <span> <Button style={{background:'rgb(46,151,249)',color:'white',marginRight:10}} onClick={()=>this.onReset()}>重置</Button></span> */}
                </div>
                </LocaleProvider>
            </Row>
            <Row className='rotectchart_chart'>
            <Row style={{height:'320px',padding:'20px 15px 0px 20px'}}>
                <Col span={11} style={{height:'100%'}}>
                <div className='rotectchart_chart_text'>
                <img src={patrolNumImage} alt="" style={{height:'90%'}}/><span>巡路次数</span><span>Top</span><span>5</span><span><Link to="/affiche">更多<Icon type="double-right" theme="outlined" style={{marginLeft:5}}/></Link>  </span>
                </div>
                <Row>
                    <Col span={20} offset={2} style={{height:'100%'}}>
                    <PatrolNum patrolCountData={this.state.patrolCountData}/>
                    </Col>
                </Row>   
                </Col>
                <Col span={11} offset={2} style={{height:'100%'}}>
                <div className='rotectchart_chart_text'>
                <img src={patrolMileageImage} alt="" style={{height:'90%'}}/><span>巡路里程</span><span>Top</span><span>5</span><span><Link to="/affiche">更多<Icon type="double-right" theme="outlined" style={{marginLeft:5}}/></Link>  </span>
                </div>
                <Row>
                    <Col span={20} offset={2} style={{height:'100%'}}>
                    <PatrolMileage patrolMileage={this.state.patrolData}/>
                    </Col>
                </Row>   
                </Col>
            </Row>
            <Row style={{height:'320px',marginTop:'15px',padding:'0px 15px',marginBottom:'20px'}}>
                <Col span={11} style={{height:'100%'}}>
                <div className='rotectchart_chart_text'>
                <img src={showImage} alt="" style={{height:'80%'}}/><span>养护人员活跃度</span><span>Top</span><span>5</span><span><Link to="/affiche">更多<Icon type="double-right" theme="outlined" style={{marginLeft:5}}/></Link>  </span>
                </div>
                <Row>
                    <Col span={20} offset={2} style={{height:'100%'}}>
                    <Show showData={this.state.showData}/>
                    </Col>
                </Row>   
                </Col>
                <Col span={11} offset={2} style={{height:'100%'}}>
                <div className='rotectchart_chart_text'>
                <img src={thingImage} alt="" style={{height:'80%'}}/><span>事件上报数</span><span>Top</span><span>5</span><span><Link to="/affiche">更多<Icon type="double-right" theme="outlined" style={{marginLeft:5}}/></Link>  </span>
                </div>
                <Row>
                    <Col span={18} offset={2} style={{height:'100%'}}>
                        <Thing/>
                    </Col>
                </Row>   
                </Col>
            </Row>
            </Row>
            </div>
        )
    }
}

export default RoadProtectChart;
/* 活跃度前、后十名 */

import React, { Component } from 'react';
import { Icon, Button, DatePicker, Card, Row, Col, message, Select, Collapse} from 'antd';

import echarts from 'echarts/lib/echarts'; // 引入 ECharts 主模块
import 'echarts/lib/chart/bar';           // 引入柱状图
import 'echarts/lib/chart/line';          // 引入折线图
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import './index.scss';
import './index.less';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
import $ from 'jquery';
var relativeUrl = "";  //接口相对路径

const Option = Select.Option;
const Panel = Collapse.Panel;
const dateFormat = 'YYYY-MM-DD';
var myDate = new Date();//获取系统当前时间

class ActivityLevel extends Component {
    constructor(props){
      super(props);
      this.state = {
        starTime: moment(myDate).subtract(1,'year').format("YYYY-MM-DD"), //ajax请求初始时间
        lastTime: moment(myDate).format("YYYY-MM-DD"),
        regionId: _mm.getStorage('userInfo').regionId,
        roleId: _mm.getStorage('userInfo').roleId,
      }
    }
    componentDidMount(){
      this.setChartsData();
    }

    setChartsData() {
        //初始化
        var myChart1 = echarts.init(document.getElementById('topTen'));
        var myChart2 = echarts.init(document.getElementById('lastTen'));

        //绘制柱状图
        myChart1.setOption({
            color: ['#FF4500'],
            tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line'          // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            //右上角工具栏
            toolbox: {
                show : true,
                right: '5%',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    // magicType: {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {type: 'png',name:'app活跃度',show: true,backgroundColor: '#fff'}
                }
            },
            legend: {
                data:[{name: '活跃度'}],
                right:'30%',
            },
            grid: [{
                top: '20%',
                show: true,    //是否显示直角坐标系网格。
                width: '80%',
                left: '5%',
                right:'5%',
                containLabel: true
            }],
            yAxis: [{
                type: 'value',
                name : '使用频次',
                nameTextStyle: {fontSize: 14}, 
                splitLine: { show: true }
            }],
            xAxis: [{
                type: 'category',
                name : '城镇',
                nameTextStyle: {fontSize: 14},
                data: [],
                axisTick: { alignWithLabel: true },
                axisLabel: { interval: 'auto', rotate: 0,textStyle: {color: '#000', fontSize: 15 }},
                splitLine: { show: false }
            }],
            series: [
                {
                    name:'活跃度',
                    type: 'bar',
                    barWidth: 40,
                    stack: 'topTen',
                    z: 3,
                    label: { normal: { position: 'top', show: true } },
                    // data: Object.keys(builderJson.topTen).map(function (key) {
                    //    return builderJson.topTen[key]
                    // })
                    data: []
                }]  
        });
        myChart2.setOption({
            color: ['#1E90FF'],
            tooltip: {
                trigger: 'axis',
                axisPointer : {
                    type : 'line'
                }
            },
            toolbox: {
                show : true,
                right: '5%',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {type: 'png',name:'app活跃度',show: true,backgroundColor: '#fff'}
                }
            },
            legend: {
                data:[{name: '活跃度'}],
                right:'30%',
            },
            grid: [{
                top: '20%',
                show: true,
                width: '80%',
                left: '5%',
                right:'5%',
                containLabel: true
            }],
            yAxis: [{
                type: 'value',
                name : '使用频次',
                nameTextStyle: {fontSize: 14}, 
                splitLine: { show: true }
            }],
            xAxis: [{
                type: 'category',
                name : '城镇',
                nameTextStyle: {fontSize: 14},
                data: [],
                axisTick: { alignWithLabel: true },
                axisLabel: { interval: 'auto', rotate: 0, textStyle: {color: '#000', fontSize: 15 }},
                splitLine: { show: false }
            }],
            series: [
                {
                    name:'活跃度',
                    type: 'bar',
                    barWidth: 40,
                    stack: 'lastTen',
                    z: 3,
                    label: { normal: { position: 'top', show: true } },
                    data: []
                }]  
        });

        myChart1.showLoading(); 
        myChart2.showLoading();
        //活跃度前十名  
        var namesTop = [];     // X  
        var numsTop = [];       // Y
        //活跃度后十名  
        var namesLast = [];
        var numsLast = [];

        var formData = new FormData();
        formData.append("starTime",this.state.starTime);
        formData.append("lastTime",this.state.lastTime);
        formData.append("regionId",this.state.regionId);

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
            type : "post",    
            url  : relativeUrl,
            data : formData,
            cache       :  false,//上传文件无需缓存
            processData :  false,//用于对data参数进行序列化处理 这里必须false
            contentType :  false, //必须   
            success : res => { 
              if(res.result === 1){
                if(this.state.roleId == 8){ //镇或大队显示人名
                    $.each(res.topTen, function(index, item) {
                        if (item.real_name != null) {
                            namesTop.push(item.real_name);
                            numsTop.push(item.count);
                        }
                    });
                    $.each(res.lastTen, function(index, item) {
                        if (item.real_name != null) {
                            namesLast.push(item.real_name);
                            numsLast.push(item.count);
                        }
                    });
                }else{
                    $.each(res.topTen, function(index, item) {
                        if (item.region_name != null) {
                            namesTop.push(item.region_name);
                            numsTop.push(item.count);
                        }
                    });
                    $.each(res.lastTen, function(index, item) {
                        if (item.region_name != null) {
                            namesLast.push(item.region_name);
                            numsLast.push(item.count);
                        }
                    });
                }     
                // console.log('namesTop:',namesTop,'namesLast',namesLast);
                // console.log('numsTop:',numsTop,'numsLast',numsLast);

                //隐藏加载动画
                myChart1.hideLoading();  
                myChart2.hideLoading();

                //加载数据
                myChart1.setOption({
                    xAxis  : [{data : namesTop}],  
                    series : [{data : numsTop}]  
                }); 
                myChart2.setOption({
                    xAxis  : [{data : namesLast}],  
                    series : [{data : numsLast}]  
                });
              }
              else if(res.result === -1){
                message.error(res.message);
                window.location.href = '/';
              }
              else{
                  message.error("图表请求数据失败!");
              }
            },
            error  : err => {
                message.error("图表请求数据失败!");
            }                             
        }) 

    }
    handleSubmit() {
      this.setChartsData();
    }

    getStarTimeValue(date) {
      var unixTimestamp = new Date(date);
      console.log('starTime:',`${moment(unixTimestamp).format("YYYY-MM-DD")}`);
      this.setState({
        'starTime' : moment(unixTimestamp).format("YYYY-MM-DD")
      });
    }

    getLastTimeValue(date) {
      var unixTimestamp = new Date(date);
      //console.log(`${unixTimestamp.toLocaleString()}`); //2018/3/9 上午12:00:00
      console.log('lastTime:',`${moment(unixTimestamp).format("YYYY-MM-DD")}`); //2018-03-09
      this.setState({
        'lastTime' : moment(unixTimestamp).format("YYYY-MM-DD")
      });
    }

    getSelectValue(value) {
      console.log('regionId:',`${value}`);
      this.setState({
        'regionId' : value
      });
    }

    render() {
        return (
            <div style={{height:'100%',width:'100%'}}>
                <div className='activity-search'>
                    <span style={{fontSize:20,fontWeight:'bolder'}}>日期选择：</span>
                    <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="请选择起始时间"
                        name="starTime"
                        value={moment(this.state.starTime,dateFormat)}
                        onChange={(date) => this.getStarTimeValue(date)}
                        />
                    <span style={{marginLeft:20,marginRight:20,fontSize:20,fontWeight:'bolder'}}>至</span>
                    <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="请选择终止时间"
                        name="lastTime"
                        value={moment(this.state.lastTime,dateFormat)}
                        onChange={(date) => this.getLastTimeValue(date)}
                        />
                    <Button style={{marginLeft:'40px'}} type="primary" onClick={() => this.handleSubmit()}>查询</Button>
                </div>

                {/* <Collapse
                    defaultActiveKey={['1']}
                    onChange={(key) => this.collapseCallback(key)}
                    >
				    <Panel header="高级查询" key="1">
                        <span style={{fontSize:20,fontWeight:'bolder'}}>日期选择：</span>
                        <DatePicker
                            format="YYYY-MM-DD"
                            placeholder="请选择起始时间"
                            name="starTime"
                            value={moment(this.state.starTime,dateFormat)}
                            onChange={(date) => this.getStarTimeValue(date)}
                            />
                        <span style={{marginLeft:20,marginRight:20,fontSize:20,fontWeight:'bolder'}}>至</span>
                        <DatePicker
                            format="YYYY-MM-DD"
                            placeholder="请选择终止时间"
                            name="lastTime"
                            value={moment(this.state.lastTime,dateFormat)}
                            onChange={(date) => this.getLastTimeValue(date)}
                            />
                        <Button style={{marginLeft:'40px'}} type="primary" onClick={() => this.handleSubmit()}>查询</Button>
                        
				    </Panel>
				</Collapse> */}

                <Col span={24} style={{width:'100%'}}>
                    <Card
                        bordered={false}
                        className='card_home'
                        style={{boxShadow:' 0 0 10px rgba(0, 0, 0, 0.5)',height:'400px',marginBottom:'10px'}}
                        >
                        <div className='card_title_background'  >
                            <div className='card_title_text'> 
                                <div className='card_news'> 
                                    <Icon type="bar-chart" theme="outlined" style={{fontSize: '18px',color:'white'}}/> 
                                    <span style={{fontSize: '16px',marginLeft:'7px',color:'white'}}>活跃度前十名</span>
                                </div>
                            </div>
                            
                        </div>
                        <div id="topTen" style={{width:'100%',height:'85%'}}></div>
                    </Card>
                    <Card
                        bordered={false}
                        className='card_home'
                        style={{boxShadow:' 0 0 10px rgba(0, 0, 0, 0.5)',height:'400px'}}
                        >
                        <div className='card_title_background'  >
                            <div className='card_title_text'> 
                                <div className='card_news'>
                                    <Icon type="bar-chart" theme="outlined" style={{fontSize: '18px',color:'white'}}/> 
                                    <span style={{fontSize: '16px',marginLeft:'7px',color:'white'}}>活跃度后十名</span>
                                </div>
                            </div>
                        </div>
                        <div id="lastTen" style={{width:'100%',height:'85%'}}></div>
                    </Card>
                </Col>
                
                
            </div>
            
           
        );
    }
}

export default ActivityLevel;
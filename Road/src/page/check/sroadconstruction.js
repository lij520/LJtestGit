import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, Card, Col, message, Select } from 'antd';
import $ from 'jquery'
import echarts from 'echarts/lib/echarts'; // 引入 ECharts 主模块
import  'echarts/lib/chart/bar';           // 引入柱状图
import  'echarts/lib/chart/line';          // 引入折线图
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';
import MUtil        from 'util/mm.jsx';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const _mm   = new MUtil();
// import InquireForm from './inquire.jsx';
//import './index.scss';
const Option = Select.Option;

class XRoadconstruction extends Component {
    constructor(props){
      super(props);
      this.state = {
        beginTime: '2018-9-1', //ajax请求初始值
        start:moment('2018-9-1'), //DatePicker初始值
        endTime: '2018-10-30',
        end: moment('2018-10-30'),
        regionId: '350800000000'
      }
    }
    componentDidMount(){
      this.setChartsData();
    }
    setChartsData() {
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('topTen1'));
        // var myChart2 = echarts.init(document.getElementById('lastTen'));

        // 假数据
        // var builderJson = {
        //     "topTen": {"上杭县": 3237,"临江镇": 2164,"临江镇": 2164,"镇东社区居委会": 7561,"镇中社区居委会": 7778,"英明社区居委会": 7355,"天山社区居委会": 2405,"镇南社区居委会": 1842,"临城镇": 2090,"中都镇": 1762,"富光村委会": 1593
        //     }
        // };

   

        //绘制柱状图
        myChart1.setOption({
           
            color: ['#4e72b8','#d1923f','#45b97c'],
            backgroundColor:['#f0f0f0'],
            tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line'          // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            //右上角工具栏
            toolbox: {
                show : true,
                right: '1%',
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    // magicType: {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {type: 'png',name:'app',show: true,backgroundColor: '#fff'}
                }
            },
            legend: {
                data:[{name: '完成'}],
                right:'30%',
                top: '5%'
            },
            title: [{
                text: '道路管理',
                left:'auto',
                //textAlign: 'center',
                textStyle:{
                    color:'black',
                    fontStyle:'normal',
                    fontWeight: 'normal',
                    fontFamily: 'Sans-serif',
                    fontSize: 25,
                }
            }],
            grid: [{
                top: '20%',
                show:true,    //是否显示直角坐标系网格。
                width: '80%',
                left: '5%',
                right:'5%',
                containLabel: true
            }],
            //y轴
            yAxis: [{
                type: 'value',
                name : '事件处理情况',
                nameTextStyle: {fontSize: 14}, 
                // max: builderJson.all,
                splitLine: { show: true }
            }],
            //x轴
            xAxis: [{
                type: 'category',
                name : '县级名称',
                nameTextStyle: {fontSize: 14},
                data: ['一大队','二大队','三队队','四大队','五大队','六大队','七大队','八大队','九大队','十大队','11大队','12大队'],
                axisTick: { alignWithLabel: true },
                 axisLabel: {  textStyle: {color: '#000', fontSize: 15 },
                    interval: 0,  
                    formatter:function(regionName)  
                    {  
                        return regionName.split("").join("\n");  
                        
                    }  
                } ,
                // x轴的字体样式
                //  axisLabel: { interval: 0, rotate: 0, textStyle: {color: '#000', fontSize: 15 }},
                splitLine: { show: false }
            }],
            series: [
                //前10名使用频次
                {
                    countProcess:'建成道路',
                    type: 'bar',
                    barWidth: 40,
                    stack: 'topTen1',
                    z: 3,
                    label: { normal: {  show: true } }, //数值显示在柱状图top
                    //itemStyle: { color: },  //柱条颜色，默认从全局调色盘 option.color 获取颜色
                    data:[123,445,667,890], 
                },
                {
                    countProcessing:'在建道路',
                    type: 'bar',
                    barWidth: 40,
                    stack: 'topTen1',
                    z: 3,
                    label: { normal: {  show: true } }, //数值显示在柱状图top
                    //itemStyle: { color: },  //柱条颜色，默认从全局调色盘 option.color 获取颜色
                    data:[123,445,667,890], 
                },
                {
                    countNotProcess:'延时道路',
                    type: 'bar',
                    barWidth: 40,
                    stack: 'topTen1',
                    z: 3,
                    label: { normal: {  show: true } }, //数值显示在柱状图top
                    //itemStyle: { color: },  //柱条颜色，默认从全局调色盘 option.color 获取颜色
                    data:[123,445,667,890], 
                }
            ]  
        });
       
        myChart1.showLoading(); 
        //数据加载完之前先显示一段简单的loading动画
        //活跃度前十名  
        var regionName = [];     //类别数组（实际用来盛放X轴坐标值）  
        var countNotProcess = [];
        var countProcess = [];
        var countProcessing = [];       //数量数组（实际用来盛放Y坐标值）
        

        var formData = new FormData();
        formData.append("beginTime",this.state.beginTime);
        formData.append("endTime",this.state.endTime);
        formData.append("userId",_mm.getStorage('userInfo').userId);
        formData.append("token",_mm.getStorage('userInfo').token);

        $.ajax({  
            type : "post",    
            url:"/statistics/getManage.do",
            data : formData,
            cache       :  false,//上传文件无需缓存
            processData :  false,//用于对data参数进行序列化处理 这里必须false
            contentType :  false, //必须   
            success : res => { 
              if(res.result == 1){
                message.success('图表数据请求成功！');
                $.each(res.manageStatistics, function(index, item) {
                    if (item.regionName != null) {
                        regionName.push(item.regionName);//循环添加names
                        countProcess.push(item.countProcess);
                        countNotProcess.push(item.countNotProcess);
                        countProcessing.push(item.countProcessing);//循环添加nums
                    // data.push(item.regionId);
                    }
                });

                myChart1.hideLoading(); //隐藏加载动画  
               
                myChart1.setOption({ //加载数据图表  
                    legend: {
                        data:['已完成事件','未完成事件','正在进行事件']
                    },
                  xAxis  : [{data : regionName}],  
                  series : [
                      { name:'已完成事件',
                        data : countProcess
                    },
                    { name:'未完成事件',
                        data : countNotProcess
                    },
                    { name:'正在进行事件',
                        data : countProcessing
                    },
                    ]  
                }); 
              
              } 
              else if(res.result == -1){
                message.error(res.message);
                window.location.href = '/';
            }
              else{ message.error("图表请求数据失败!"); }
            },
            error  : err => {message.error("图表请求数据失败!")
            message.error("失败!");
        }                             
        }) 
    }
    handleSubmit() {
    //   message.info('beginTime:'+ `${this.state.beginTime}`);
      //message.info('regionId:'+ `${this.state.regionId}`);
      this.setChartsData();
    }

    getbeginTimeValue(date) {
      var unixTimestamp = new Date(date);
      console.log('beginTime:',`${moment(unixTimestamp).format("YYYY-MM-DD")}`);
      this.setState({
        'beginTime' : moment(unixTimestamp).format("YYYY-MM-DD")
      });
    }

    getendTimeValue(date) {
      var unixTimestamp = new Date(date);
      //console.log(`${unixTimestamp.toLocaleString()}`); //2018/3/9 上午12:00:00
      console.log('endTime:',`${moment(unixTimestamp).format("YYYY-MM-DD")}`); //2018-03-09
      this.setState({
        'endTime' : moment(unixTimestamp).format("YYYY-MM-DD")
      });
    }

    getSelectValue(value) {
      console.log('regionId:',`${value}`);
      this.setState({
        'regionId' : value
      });
    }
    handleDownload = (record) => {
        console.log(record);
        this.check(record);
      };
      
       check() {
         $('<form  action="/excel/export" method="' + ('GET' || 'post') + '">' +  // action请求路径及推送方法
           '<input type="text" name="beginTime" value="' + this.state.beginTime + '"/>' + 
           '<input type="text" name="endTime" value="' + this.state.endTime + '"/>' + 
          '<input type="text" name="userId" value="' + _mm.getStorage('userInfo').userId + '"/>' + 
           '<input type="text" name="token" value="' +_mm.getStorage('userInfo').token + '"/>' + 
           '<input type="text" name="t" value="' +3 + '"/>' + 
           '</form>')
           .appendTo('body').submit().remove();
       }

    render() {
        return (
            <div style={{height:'100%',width:'100%'}}>
              <div style={{backgroundColor:'#f0f0f0',padding:5}}>
                {/* <span style={{fontSize:20,fontWeight:'bolder'}}>地区：</span> */}
                {/* <Select style={{ width: 150 }} 
                        placeholder="请选择查询地区"
                        name="regionId"
                       // defaultValue={this.state.regionId}
                       // onChange={(value) => this.getSelectValue(value)}
                       // showSearch
                       >
                  <Option value="350800000000">全市</Option>
                  <Option value="350823000000">上杭</Option>
                  <Option value="350824000000">长汀</Option>
                </Select> */}
                <span style={{marginLeft:'10px',fontSize:20,fontWeight:'bolder'}}>日期选择：</span>
                <DatePicker format="YYYY-MM-DD"
                            placeholder="请选择起始时间"
                            name="beginTime"
                            //defaultValue={this.state.start}
                            onChange={(date) => this.getbeginTimeValue(date)}
                />
                <span>~</span>
                <DatePicker format="YYYY-MM-DD"
                            placeholder="请选择终止时间"
                            name="endTime"
                            //defaultValue={this.state.end}
                            onChange={(date) => this.getendTimeValue(date)}
                />
                <Button style={{marginLeft:'10px'}} type="primary" 
                onClick={() => this.handleSubmit()}
                >查询</Button>
                <Button style={{marginLeft:'10px'}} type="primary" onClick={this.handleDownload} >导出</Button>
              </div>
              
              
              <div id="topTen1" style={{width:'100%',height:'700%',marginTop:5}}></div>
              {/* <div id="lastTen" style={{width:'100%',height:'500%',marginTop:5}}></div> */}
            </div>
            
           
        );
    }
}

export default XRoadconstruction;
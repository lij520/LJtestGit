/* 巡路里长 */

import React, { Component } from 'react';
import { Icon, Button, DatePicker, Card, Col, message, Select, Collapse} from 'antd';

import echarts from 'echarts/lib/echarts'; // 引入 ECharts 主模块
import 'echarts/lib/chart/bar';           // 引入柱状图
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/dataZoom';

import './index.scss';
import './index.less';

import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class PatrolMileage extends Component {
    constructor(props){
      super(props);
      this.state = {
        data: [],
      }
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) { 
        // console.log("打印nextProps");
        // console.log(nextProps);
        this.setState({
            data: nextProps.patrolData
        },() => {
            this.setChartsData();
        });
    }

    setChartsData() {
        const {data} = this.state;
        //初始化
        var myChart = echarts.init(document.getElementById('patrolMileage'));
        var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            legend: {
                data:['巡路里程','巡路时长']
            },
            calculable : true,
            dataZoom: [{
                type: 'slider',//图表下方的伸缩条
    　　　　     show: true,
                xAxisIndex: [0],
 　　　　        start: 0,
    　　　　     end: data.length > 20 ? 80 : 100,
            },{
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: data.length > 20 ? 80 : 100,
            }],
            xAxis : [
                {
                    type : 'category',
                    data : []
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'巡路里程',
                    type:'bar',
                    barMaxWidth: 40,
                    data:[],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            fontSize: 12
                        }
                    },
                },
                {
                    name:'巡路时长',
                    type:'bar',
                    barMaxWidth: 40,
                    data:[],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            fontSize: 12
                        }
                    },
                }
            ]
        };        
        //绘制
        myChart.setOption(option);
        myChart.showLoading();

        var xData = [];
        var yData1 = [];
        var yData2 = [];

        for(var i = 0; i < data.length; i++){
            yData1.push(data[i].mileage);
            yData2.push(data[i].hour);
            xData.push(data[i].realName);
        }
        // console.log(xData);
        myChart.hideLoading();

        myChart.setOption({
            xAxis: [
                {
                    data : xData
                }
            ],  
            series : [
                {
                    name:'巡路里程',
                    data: yData1,
                },
                {
                    name:'巡路时长',
                    data: yData2,
                }
            ]  
        })

    }

    render() {
        return (
            <Card bordered={false} className='card_home' style={{boxShadow:' 0 0 10px rgba(0, 0, 0, 0.5)',height:'100%'}}>
                <div className='card_title_background'  >
                    <div className='card_title_text'> 
                        <div className='card_news'>
                            <Icon type="bar-chart" theme="outlined" style={{fontSize: '18px',color:'white'}}/> 
                            <span style={{fontSize: '16px',marginLeft:'7px',color:'white'}}>巡路里程</span>
                        </div>
                    </div>
                </div>
                <div id="patrolMileage" style={{height:'80%',width:'100%'}}></div>
            </Card>
        );
    }
}

export default PatrolMileage;
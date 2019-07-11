/* 巡路次数 */

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
import { reduce } from 'zrender/lib/core/util';
const _mm = new MUtil();

class PatrolNum extends Component {
    constructor(props){
      super(props);
      this.state = {
        data: [],
      }
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) { 
        this.setState({
            data: nextProps.patrolData
        },() => {
            this.setChartsData();
        });
    }

    setChartsData() {
        const {data} = this.state;
        //初始化
        var myChart = echarts.init(document.getElementById('patrolNum'));
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['巡路次数']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            dataZoom: [{
                type: 'slider',//图表下方的伸缩条
    　　　　     show: true,
                yAxisIndex: [0],
 　　　　        start: 0, //伸缩条开始位置（1-100）
    　　　　     end: 750/(data.length)-5, //伸缩条结束位置（1-100）
            },{
                type: 'inside',
                yAxisIndex: [0],
                start: 0,
                end: 750/(data.length)-5,
            }],
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: []
            },
            series: [
                {
                    name: '巡路次数',
                    type: 'bar',
                    barWidth: '30px',
                    data: [],
                    itemStyle: {
                        normal:{  
                            color: function (params){
                                var colorList = ["#2F9323","#D9B63A","#2E2AA4","#9F2E61","#4D670C","#BF675F","#1F814A","#357F88","#673509","#310937","#1B9637","#F7393C",'#78c38e','#e2986f','#58a5cc','#e5d16a','#ca87b8','#006699','#333399','rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)',"#2F9323","#D9B63A","#2E2AA4","#9F2E61","#4D670C","#BF675F","#1F814A","#357F88","#673509","#310937","#1B9637","#F7393C",'#78c38e','#e2986f','#58a5cc','#e5d36a','#ca87b8','#116699','#333399','rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)',"#2F9323","#D9B63A","#2E2AA4","#9F2E61","#4D670C","#BF675F","#1F814A","#357F88","#673509","#310937","#1B9637","#F7393C",'#78c38e','#e2986f','#58a5cc','#e5d16a','#ca87b8','#006699','#333399','rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)',"#2F9323","#D9B63A","#2E2AA4","#9F2f61","#4D670C","#BF675F","#1F814A","#357F88","#673509","#310937","#1B9637","#F7393C",'#78c38e','#e2986f','#58a5cc','#e5d16a','#ca87b8','#006699','#333399','rgb(164,205,238)','rgb(42,170,227)','rgb(25,46,94)','rgb(195,229,235)'];
                                return colorList[params.dataIndex];
                            },
                            // 随机显示
                            // color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);},
                            label: {
                                show: true,
                                position: 'inside',
                                textStyle: { //数值样式
                                    color: 'white',
                                    fontSize: 16
                                }
                            },　　　　　　
                        },
                    },
                }
            ]
        }
        //绘制
        myChart.setOption(option);
        myChart.showLoading();

        var xData = [];
        var yData = [];

        for(var i = 0; i < data.length; i++){
            xData.push(data[i].patrolCount);
            yData.push(data[i].realName);
        }
        // console.log(xData,yData);
        myChart.hideLoading();

        myChart.setOption({
            yAxis: [{data : yData}],  
            series: [{data : xData}]  
        })

    }

    render() {
        return (
            <Card bordered={false} className='card_home' style={{boxShadow:' 0 0 10px rgba(0, 0, 0, 0.5)',height:'100%'}}>
                <div className='card_title_background'  >
                    <div className='card_title_text'> 
                        <div className='card_news'>
                            <Icon type="bar-chart" theme="outlined" style={{fontSize: '18px',color:'white'}}/> 
                            <span style={{fontSize: '16px',marginLeft:'7px',color:'white'}}>巡路次数</span>
                        </div>
                    </div>
                </div>
                <div id="patrolNum" style={{height:'80%',width:'100%',overflowX:'auto'}}></div>
            </Card>
        );
    }
}

export default PatrolNum;
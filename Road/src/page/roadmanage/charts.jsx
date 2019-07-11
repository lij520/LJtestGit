import React from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';

import { Select } from 'antd';

const Option = Select.Option;


class ChartsRole extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           county:'',
        };
      }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chartRole'));
        var data = getData();
        myChart.setOption({
            title : {
                text: '各县路长处理问题数量',
                x: 'center',
                align: 'right'
              },
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: [{
                left:20,
                top: 40,
                width: '90%',
                bottom: 20,
                // height:'50%',
                right: 20,
                containLabel: true,

            }, ],
              xAxis : [
                {
                    type : 'category',
                    data : data.legendData,
                }
            ],
            yAxis : [
                {
                    name: '数量(件)',
                    type : 'value'
                }
            ],
            series : [
              {
                  name:'事件数量',
                  type:'bar',
                  barWidth: '20%',
                  data:data.seriesData,
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
                  }
              }
            ]
        })

          // 基于准备好的dom，初始化echarts实例
          var myChart_road= echarts.init(document.getElementById('chartRole_road'));
          myChart_road.setOption({
              title : {
                  text: '各县路障高发路段',
                  x: 'center',
                  align: 'right'
                },
                tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: [{
                  left:20,
                  top: 40,
                  width: '90%',
                  bottom: 20,
                  // height:'50%',
                  right: 20,
                  containLabel: true,
  
              }, ],
                xAxis : [
                  {
                      type : 'category',
                      data : data.legendData,
                  }
              ],
              yAxis : [
                  {
                      name: '频次(次)',
                      type : 'value'
                  }
              ],
              series : [
                {
                    name:'路段',
                    type:'bar',
                    barWidth: '20%',
                    itemStyle: {
                        normal: {
                            color: '#2f4554'
                        }
                    },
                    data:data.seriesData,
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
                    }
                }
              ]
          })
        
      
        // myChart.showLoading(); //数据加载完之前先显示一段简单的loading动画
        function getData() {
            var legendData = [];
            var seriesData = [];
         
            var receiveData=['临江镇','中都镇','古田镇','南阳镇','旧县镇'];
         

            receiveData.map((event,index)=>{   
                legendData.push(event);
                seriesData.push({
                    value: Math.round(Math.random() * 100)
                 });
             
   
            })

            console.log(legendData);
            console.log(seriesData);

            return {
                legendData: legendData,
                seriesData: seriesData,
              
            };
        }


    }

    handleChange(value){
        this.setState({
            county:value,
        })
      
    }
    render(){
        console.log(this.state.county);
      return (
                <div style={{height:'100%',width:'100%'}}>
                    <div id="chartRole" style={{height:'60%',width:'100%'}}></div>
                    <hr/>
                    <div style={{marginTop:'20px'}}>
                    <span style={{marginRight:'10px'}}>选择县</span>
                    <Select defaultValue="" style={{ width: 120 }} onChange={(e)=>this.handleChange(e)}>
                        <Option value="临江镇">临江镇</Option>
                        <Option value="中都镇">中都镇</Option>
                        <Option value="古田镇">古田镇</Option>
                    </Select>
                    </div>
                    <div id="chartRole_road" style={{height:'60%',width:'100%',marginBottom:'40px'}}></div>
                </div>

      );
    }
  }
  
  
  export default ChartsRole;